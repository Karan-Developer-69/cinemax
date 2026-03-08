import { Play, Plus, Share2, Star, X } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchMovieDetails, fetchTvShowDetails } from '../utils/movieApi';
import MovieDetailsSkeleton from '../components/ui/MovieDetailsSkeleton';
import ActorModal from '../components/ui/ActorModal';
import MovieCard from '../components/ui/MovieCard';

const MovieDetails = ({ type = "movie" }) => {
  const { id } = useParams();
  const [details, setDetails] = useState(null);
  const [cast, setCast] = useState([]);
  const [similar, setSimilar] = useState([]);
  const [providers, setProviders] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);
  const [showWebsitePlayer, setShowWebsitePlayer] = useState(false);
  const [selectedActor, setSelectedActor] = useState(null);
  const [imdbId, setImdbId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        let data;
        setTrailerKey(null);
        if (type === 'tv') {
          data = await fetchTvShowDetails(id);
        } else {
          data = await fetchMovieDetails(id);
        }

        setDetails(data);

        const trailer = data.videos?.results?.find(v => v.type === 'Trailer' && v.site === 'YouTube');
        setTrailerKey(trailer?.key || data.videos?.results?.[0]?.key || null);

        setCast(data.credits?.cast?.slice(0, 10) || []);

        const similarItems = data.similar?.results?.map(item => ({
          id: item.id,
          title: item.title || item.name,
          rating: item.vote_average?.toFixed(1),
          year: (item.release_date || item.first_air_date)?.split('-')[0] || null,
          imageSrc: `https://image.tmdb.org/t/p/w200${item.poster_path}`,
          type: type
        })) || [];
        setSimilar(similarItems.slice(0, 12));

        setProviders(data['watch/providers']?.results || null);
        setImdbId(data.external_ids?.imdb_id || null);
      } catch (err) {
        setError(err.message || 'Failed to fetch details');
      } finally {
        setLoading(false);
      }
    };
    if (id) getDetails();
  }, [id, type]);

  if (loading) {
    return <MovieDetailsSkeleton />;
  }

  if (error || !details) {
    return (
      <div className="w-full bg-primary-bg min-h-screen flex items-center justify-center text-text-primary">
        <p>{error || "Details not found"}</p>
      </div>
    );
  }

  const title = details.title || details.name;

  const providerMap = {
    'Plex': (imdb) => `https://watch.plex.tv/movie/${imdb}`,
    'Pluto TV': (imdb) => `https://pluto.tv/search/details/movies/${imdb}`,
    'Tubi TV': (titleStr) => `https://tubitv.com/search/${encodeURIComponent(titleStr)}`,
    'YouTube': (titleStr) => `https://youtube.com/results?search_query=${encodeURIComponent(titleStr)}+full+movie`
  };

  const getDisplayProviders = () => {
    if (!providers || Object.keys(providers).length === 0) return null;
    const countryData = providers.IN || providers.US || Object.values(providers)[0];
    if (!countryData) return null;

    // Group all free
    const freeRaw = [...(countryData.free || []), ...(countryData.ads || [])].map(p => ({ ...p, isFree: true }));
    const paidRaw = [...(countryData.flatrate || []), ...(countryData.rent || []), ...(countryData.buy || [])].map(p => ({ ...p, isFree: false }));

    const uniqueProviders = [];
    const seen = new Set();

    // Prioritize free in the unique list
    [...freeRaw, ...paidRaw].forEach(p => {
      if (!seen.has(p.provider_id)) {
        seen.add(p.provider_id);

        // Match specific providers
        if (providerMap[p.provider_name]) {
          p.customLink = providerMap[p.provider_name](imdbId || title);
          // Prefer passing IMDb for Plex and Pluto, Title for Tubi and Youtube
          if (p.provider_name === 'Plex' || p.provider_name === 'Pluto TV') {
            p.customLink = imdbId ? providerMap[p.provider_name](imdbId) : null;
          } else {
            p.customLink = providerMap[p.provider_name](title);
          }
        }

        uniqueProviders.push(p);
      }
    });

    return {
      list: uniqueProviders.slice(0, 8), // Max 8 providers
      link: countryData.link
    };
  };

  const displayProviders = getDisplayProviders();
  const rating = details.vote_average?.toFixed(1) || 'N/A';
  const runtime = details.runtime || details.episode_run_time?.[0];
  const year = (details.release_date || details.first_air_date)?.split('-')[0] || 'Unknown';
  const posterUrl = details.poster_path
    ? (details.poster_path.startsWith('http') ? details.poster_path : `https://image.tmdb.org/t/p/w500${details.poster_path}`)
    : `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 450'%3E%3Cdefs%3E%3ClinearGradient id='gf' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23f43f5e;stop-opacity:1' /%3E%3Cstop offset='50%25' style='stop-color:%2318181b;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23000000;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='300' height='450' fill='url(%23gf)'/%3E%3Ctext x='150' y='225' font-size='28' fill='white' text-anchor='middle' dominant-baseline='middle' font-weight='bold'%3E${id || 'Movie'}%3C/text%3E%3C/svg%3E`;
  const backdropUrl = details.backdrop_path
    ? (details.backdrop_path.startsWith('http') ? details.backdrop_path : `https://image.tmdb.org/t/p/original${details.backdrop_path}`)
    : `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800"><defs><linearGradient id="mdg" x1="0%25" y1="0%25" x2="100%25" y2="100%25"><stop offset="0%25" style="stop-color:%23e11d48;stop-opacity:1" /><stop offset="100%25" style="stop-color:%2309090b;stop-opacity:1" /></linearGradient></defs><rect width="1200" height="800" fill="url(%23mdg)" /></svg>`;

  return (
    <div className="w-full relative bg-primary-bg min-h-screen">
      {/* Cinematic Banner */}
      <div className="relative h-[70vh] w-full overflow-hidden border-b border-white/5">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('${backdropUrl}')`,
            filter: 'brightness(0.4) blur(4px)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-bg via-primary-bg/50 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-primary-bg to-transparent" />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-8 relative -mt-[40vh] z-10 pb-24">
        <div className="flex flex-col md:flex-row gap-10 md:gap-16">

          {/* Poster */}
          <div className="shrink-0 w-full max-w-[320px] mx-auto md:mx-0">
            <div className="rounded-2xl overflow-hidden aspect-[2/3] shadow-[0_30px_60px_rgba(0,0,0,0.9)] border border-white/10 group relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-accent-gold/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none" />
              <img
                src={posterUrl}
                alt={`${title} Poster`}
                loading="lazy"
                onError={(e) => { e.target.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 450'%3E%3Crect width='300' height='450' fill='%2318181b'/%3E%3Ctext x='150' y='225' font-size='24' fill='white' text-anchor='middle' dominant-baseline='middle' font-weight='normal'%3ENo Image%3C/text%3E%3C/svg%3E`; }}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>

          {/* Details Content */}
          <div className="flex-1 pt-4 md:pt-[10%]">
            <h1 className="text-5xl md:text-7xl font-extrabold mb-4 leading-tight tracking-tight drop-shadow-lg text-text-primary">
              {title.toUpperCase()}
            </h1>

            <div className="flex flex-wrap items-center gap-6 mb-8 text-sm md:text-base">
              <div className="flex items-center gap-1 text-accent-gold font-bold bg-accent-gold/10 px-3 py-1 rounded-full border border-accent-gold/20">
                <Star size={18} fill="currentColor" /> {rating}
              </div>
              {runtime && <span className="text-text-primary font-medium">{runtime} min</span>}
              <span className="px-3 py-1 border border-border-color rounded text-text-primary bg-secondary-bg/50">
                {details.adult ? '18+' : 'PG-13'}
              </span>
              <span className="text-text-secondary">Released: {year}</span>
            </div>

            {details.genres && details.genres.length > 0 && (
              <div className="flex gap-3 mb-10 flex-wrap">
                {details.genres.map(genre => (
                  <span key={genre.id} className="px-5 py-2 glass-light rounded-full text-sm font-semibold hover:bg-border-color transition-colors cursor-pointer text-text-primary">
                    {genre.name}
                  </span>
                ))}
              </div>
            )}

            <p className="text-text-secondary text-lg md:text-xl mb-12 leading-relaxed max-w-3xl font-light">
              {details.overview || "No overview available."}
            </p>

            {/* Streaming Providers */}
            {displayProviders && displayProviders.list.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4 text-text-primary">Streaming on</h3>
                <div className="flex flex-wrap gap-4">
                  {displayProviders.list.map(p => (
                    <div
                      key={p.provider_id}
                      onClick={() => {
                        if (p.customLink) {
                          window.open(p.customLink, '_blank', 'noopener,noreferrer');
                        } else if (p.isFree) {
                          setShowWebsitePlayer(true);
                        } else {
                          window.open(displayProviders.link, '_blank', 'noopener,noreferrer');
                        }
                      }}
                      className="flex flex-col items-center gap-2 cursor-pointer group"
                    >
                      <div className="relative">
                        <img src={`https://image.tmdb.org/t/p/w200${p.logo_path}`} title={`${p.provider_name} ${p.isFree ? '(Free)' : ''}`} alt={p.provider_name} className="w-12 h-12 rounded-xl object-contain group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(244,63,94,0.4)] transition-all shadow-lg" loading="lazy" />
                        {p.isFree && <span className="absolute -top-2 -right-2 bg-green-500 text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded-full z-10">FREE</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-wrap gap-4 mb-16">
              {trailerKey && (
                <button
                  onClick={() => setShowTrailer(true)}
                  className="flex items-center gap-3 px-8 py-4 bg-text-primary text-primary-bg font-bold rounded-full hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:scale-105 transition-all"
                >
                  <Play size={20} fill="currentColor" /> Watch Trailer
                </button>
              )}
              <button
                onClick={() => setShowWebsitePlayer(true)}
                className="flex items-center gap-3 px-8 py-4 glass-primary border border-accent-gold/30 text-accent-gold font-bold rounded-full hover:bg-accent-gold/10 hover:shadow-[0_0_20px_rgba(244,63,94,0.2)] hover:scale-105 transition-all"
              >
                <Play size={20} /> Watch Free
              </button>
              {displayProviders?.link && (
                <button
                  onClick={() => window.open(displayProviders.link, '_blank', 'noopener,noreferrer')}
                  className="flex items-center gap-3 px-8 py-4 glass-light border border-border-color text-text-primary font-bold rounded-full hover:bg-border-color hover:scale-105 transition-all"
                >
                  <Play size={20} /> Watch on Provider
                </button>
              )}
              <button className="flex items-center justify-center w-14 h-14 glass-light border border-border-color text-text-primary font-bold rounded-full hover:bg-border-color hover:scale-105 transition-all">
                <Plus size={24} />
              </button>
              <button className="flex items-center justify-center w-14 h-14 glass-light border border-border-color text-text-primary font-bold rounded-full hover:bg-border-color hover:scale-105 transition-all">
                <Share2 size={22} />
              </button>
            </div>

            {/* Production Companies Component */}
            {details.production_companies && details.production_companies.length > 0 && (
              <div>
                <h3 className="text-2xl font-bold mb-8 text-text-primary">Production</h3>
                <div className="flex flex-wrap gap-6 items-center">
                  {details.production_companies.filter(c => c.logo_path).map((company) => (
                    <div key={company.id} className="flex flex-col gap-3 group cursor-pointer items-center justify-center bg-secondary-bg/30 p-4 rounded-xl border border-border-color hover:border-accent-gold transition-colors">
                      <img
                        src={`https://image.tmdb.org/t/p/w200${company.logo_path}`}
                        alt={company.name}
                        loading="lazy"
                        className="h-12 object-contain group-hover:scale-110 transition-transform"
                        style={{ filter: "drop-shadow(0px 0px 5px rgba(255,255,255,0.2))" }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Cast Component */}
            {cast && cast.length > 0 && (
              <div className="mt-12">
                <h3 className="text-2xl font-bold mb-6 text-text-primary">Top Cast</h3>
                <div className="flex overflow-x-auto gap-4 pb-4 custom-scrollbar">
                  {cast.filter(c => c.profile_path).map((actor) => (
                    <div
                      key={actor.id}
                      onClick={() => setSelectedActor(actor.id)}
                      className="flex flex-col w-32 shrink-0 group cursor-pointer"
                    >
                      <div className="w-full aspect-[2/3] rounded-xl overflow-hidden mb-3 border border-border-color group-hover:border-accent-gold transition-colors shadow-lg">
                        <img
                          src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                          alt={actor.name}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <h4 className="font-bold text-text-primary text-sm line-clamp-1">{actor.name}</h4>
                      <p className="text-xs text-text-secondary line-clamp-1">{actor.character}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

      {/* Similar Media */}
      {similar && similar.length > 0 && (
        <div className="max-w-[1400px] mx-auto px-6 md:px-8 mt-12 border-t border-border-color pt-12 pb-24 relative z-10">
          <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-text-primary">
            You Might Also Like
          </h2>
          <div className="flex overflow-x-auto gap-6 pb-8 custom-scrollbar [&::-webkit-scrollbar]:hidden">
            {similar.map(item => (
              <div key={item.id} className="w-48 md:w-56 shrink-0">
                <MovieCard {...item} type={type} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Trailer Modal */}
      {showTrailer && trailerKey && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#000]/90 p-4 animate-fade-in-up">
          <div className="relative w-full max-w-5xl aspect-video bg-[#000] rounded-2xl overflow-hidden shadow-2xl border border-border-color">
            <button
              onClick={() => setShowTrailer(false)}
              className="absolute top-4 right-4 z-10 p-2 bg-[#000]/50 text-neutral-50 rounded-full hover:bg-neutral-50/20 transition-colors pointer-events-auto"
            >
              <X size={24} />
            </button>
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&rel=0`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}

      {/* Actor Modal */}
      {selectedActor && (
        <ActorModal actorId={selectedActor} onClose={() => setSelectedActor(null)} />
      )}

      {/* Website Player Modal */}
      {showWebsitePlayer && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#000]/95 p-4 animate-fade-in-up transition-all">
          <div className="relative w-full max-w-6xl aspect-video bg-[#000] rounded-2xl overflow-hidden shadow-2xl border border-border-color">
            <button
              onClick={() => setShowWebsitePlayer(false)}
              className="absolute -top-12 right-0 md:top-4 md:-right-16 z-10 p-2 bg-neutral-800 text-neutral-50 rounded-full hover:bg-red-500 transition-colors pointer-events-auto"
            >
              <X size={24} />
            </button>
            <iframe
              className="w-full h-full bg-[#000]"
              src={`https://vidsrc.to/embed/${type}/${id}`}
              title="Website Player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetails;
