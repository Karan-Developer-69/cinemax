import { Play, Plus, Share2, Star, X } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchMovieDetails, fetchTvShowDetails, fetchMovieTrailer } from '../utils/movieApi';

const MovieDetails = ({ type = "movie" }) => {
  const { id } = useParams();
  const [details, setDetails] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);
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
          try {
            const key = await fetchMovieTrailer(id);
            setTrailerKey(key);
          } catch (e) {
            console.log("No trailer available");
          }
        }
        setDetails(data);
      } catch (err) {
        setError(err.message || 'Failed to fetch details');
      } finally {
        setLoading(false);
      }
    };
    if (id) getDetails();
  }, [id, type]);

  if (loading) {
    return (
      <div className="w-full bg-primary-bg min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent-gold"></div>
      </div>
    );
  }

  if (error || !details) {
    return (
      <div className="w-full bg-primary-bg min-h-screen flex items-center justify-center text-white">
        <p>{error || "Details not found"}</p>
      </div>
    );
  }

  const title = details.title || details.name;
  const rating = details.vote_average?.toFixed(1) || 'N/A';
  const runtime = details.runtime || details.episode_run_time?.[0];
  const year = (details.release_date || details.first_air_date)?.split('-')[0] || 'Unknown';
  const posterUrl = details.poster_path
    ? (details.poster_path.startsWith('http') ? details.poster_path : `https://image.tmdb.org/t/p/w500${details.poster_path}`)
    : `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 450'%3E%3Cdefs%3E%3ClinearGradient id='gf' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23f43f5e;stop-opacity:1' /%3E%3Cstop offset='50%25' style='stop-color:%2318181b;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23000000;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='300' height='450' fill='url(%23gf)'/%3E%3Ctext x='150' y='225' font-size='28' fill='white' text-anchor='middle' dominant-baseline='middle' font-weight='bold'%3E${id || 'Movie'}%3C/text%3E%3C/svg%3E`;
  const backdropUrl = details.backdrop_path
    ? (details.backdrop_path.startsWith('http') ? details.backdrop_path : `https://image.tmdb.org/t/p/original${details.backdrop_path}`)
    : `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800"><defs><linearGradient id="mdg" x1="0%25" y1="0%25" x2="100%25" y2="100%25"><stop offset="0%25" style="stop-color:%23e11d48;stop-opacity:1" /><stop offset="100%25" style="stop-color:%2309090b;stop-opacity:1" /></linearGradient></defs><rect width="1200" height="800" fill="url(%23mdg)"/></svg>`;

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
                onError={(e) => { e.target.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 450'%3E%3Crect width='300' height='450' fill='%2318181b'/%3E%3Ctext x='150' y='225' font-size='24' fill='white' text-anchor='middle' dominant-baseline='middle' font-weight='normal'%3ENo Image%3C/text%3E%3C/svg%3E`; }}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>

          {/* Details Content */}
          <div className="flex-1 pt-4 md:pt-[10%]">
            <h1 className="text-5xl md:text-7xl font-extrabold mb-4 leading-tight tracking-tight drop-shadow-lg text-white">
              {title.toUpperCase()}
            </h1>

            <div className="flex flex-wrap items-center gap-6 mb-8 text-sm md:text-base">
              <div className="flex items-center gap-1 text-accent-gold font-bold bg-accent-gold/10 px-3 py-1 rounded-full border border-accent-gold/20">
                <Star size={18} fill="currentColor" /> {rating}
              </div>
              {runtime && <span className="text-white font-medium">{runtime} min</span>}
              <span className="px-3 py-1 border border-border-color rounded text-text-primary bg-white/5">
                {details.adult ? '18+' : 'PG-13'}
              </span>
              <span className="text-text-secondary">Released: {year}</span>
            </div>

            {details.genres && details.genres.length > 0 && (
              <div className="flex gap-3 mb-10 flex-wrap">
                {details.genres.map(genre => (
                  <span key={genre.id} className="px-5 py-2 glass-light rounded-full text-sm font-semibold hover:bg-white/10 transition-colors cursor-pointer text-white">
                    {genre.name}
                  </span>
                ))}
              </div>
            )}

            <p className="text-zinc-300 text-lg md:text-xl mb-12 leading-relaxed max-w-3xl font-light">
              {details.overview || "No overview available."}
            </p>

            <div className="flex flex-wrap gap-4 mb-16">
              {trailerKey && (
                <button
                  onClick={() => setShowTrailer(true)}
                  className="flex items-center gap-3 px-8 py-4 bg-white text-black font-bold rounded-full hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:scale-105 transition-all"
                >
                  <Play size={20} fill="currentColor" /> Watch Trailer
                </button>
              )}
              <button className="flex items-center justify-center w-14 h-14 glass-light border border-white/10 text-white font-bold rounded-full hover:bg-white/10 hover:scale-105 transition-all">
                <Plus size={24} />
              </button>
              <button className="flex items-center justify-center w-14 h-14 glass-light border border-white/10 text-white font-bold rounded-full hover:bg-white/10 hover:scale-105 transition-all">
                <Share2 size={22} />
              </button>
            </div>

            {/* Production Companies Component */}
            {details.production_companies && details.production_companies.length > 0 && (
              <div>
                <h3 className="text-2xl font-bold mb-8 text-white">Production</h3>
                <div className="flex flex-wrap gap-6 items-center">
                  {details.production_companies.filter(c => c.logo_path).map((company) => (
                    <div key={company.id} className="flex flex-col gap-3 group cursor-pointer items-center justify-center bg-white/5 p-4 rounded-xl border border-white/10 hover:border-accent-gold transition-colors">
                      <img
                        src={`https://image.tmdb.org/t/p/w200${company.logo_path}`}
                        alt={company.name}
                        className="h-12 object-contain group-hover:scale-110 transition-transform"
                        style={{ filter: "drop-shadow(0px 0px 5px rgba(255,255,255,0.2))" }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

      {/* Trailer Modal */}
      {showTrailer && trailerKey && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 animate-fade-in-up">
          <div className="relative w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10">
            <button
              onClick={() => setShowTrailer(false)}
              className="absolute top-4 right-4 z-10 p-2 bg-black/50 text-white rounded-full hover:bg-white/20 transition-colors pointer-events-auto"
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
    </div>
  );
};

export default MovieDetails;
