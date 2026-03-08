import { Link, useNavigate } from 'react-router-dom';
import { Play, Plus, Search } from 'lucide-react';
import MovieCard from '../components/ui/MovieCard';
import MovieCardSkeleton from '../components/ui/MovieCardSkeleton';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTrendingMovies, getTopRatedMovies, getPopularMovies, getPublicCustomMedia } from '../store/slices/movieSlice';

const Home = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { trendingMovies, topRatedMovies, popularMovies, customMedia, loading } = useSelector((state) => state.movies);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentHeroIndex, setCurrentHeroIndex] = useState(0);

    const heroMovies = trendingMovies.slice(0, 5);

    useEffect(() => {
        dispatch(getTrendingMovies());
        dispatch(getTopRatedMovies());
        dispatch(getPopularMovies());
        dispatch(getPublicCustomMedia());
    }, [dispatch]);

    useEffect(() => {
        if (heroMovies.length === 0) return;
        const interval = setInterval(() => {
            setCurrentHeroIndex((prev) => (prev + 1) % heroMovies.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [heroMovies.length]);

    // Handle search submission on enter
    const handleSearch = (e) => {
        if (e.key === 'Enter' && searchQuery.trim()) {
            navigate('/movies', { state: { searchQuery } });
        }
    };

    const currentHero = heroMovies[currentHeroIndex];
    const spotlightMovie = popularMovies && popularMovies.length > 0 ? popularMovies[0] : null;

    return (
        <div className="w-full">
            {/* HERO SECTION */}
            <section className="relative h-screen w-full flex items-center pt-20 overflow-hidden">
                {currentHero ? (
                    <>
                        <div
                            key={currentHero.id} // Forces re-render of animation on change
                            className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 animate-fade-in"
                            style={{
                                backgroundImage: `url('${currentHero.imageSrc ? currentHero.imageSrc.replace('w200', 'original') : ''}')`,
                            }}
                        >
                            <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>
                        </div>

                        <div className="absolute inset-0 bg-gradient-to-t from-primary-bg via-primary-bg/70 to-transparent"></div>
                        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-primary-bg to-transparent z-10"></div>

                        <div className="relative max-w-[1400px] w-full mx-auto px-6 md:px-8 z-20 flex flex-col justify-end pb-32 h-full">
                            <div key={`info-${currentHero.id}`} className="max-w-3xl animate-fade-in-up">
                                <span className="inline-block px-3 py-1 mb-6 glass-light border border-accent-gold/40 rounded-full text-accent-gold font-bold tracking-widest text-sm uppercase shadow-[0_0_15px_rgba(244,63,94,0.3)]">
                                    Trending #{currentHeroIndex + 1}
                                </span>

                                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight tracking-tighter drop-shadow-2xl text-white">
                                    {currentHero.title}
                                </h1>

                                <div className="flex flex-wrap items-center gap-4 mb-8 text-sm md:text-base">
                                    <div className="flex items-center gap-1 text-accent-gold font-bold bg-accent-gold/10 px-3 py-1 rounded-full border border-accent-gold/20">
                                        <span>★</span> {currentHero.rating}
                                    </div>
                                    <span className="text-white/90 font-medium">{currentHero.year}</span>
                                    <span className="px-2 py-0.5 border border-white/20 rounded text-text-secondary text-xs font-bold">HD</span>
                                </div>

                                <p className="text-lg md:text-xl text-zinc-300 mb-10 max-w-2xl leading-relaxed drop-shadow-md font-light">
                                    Experience the thrills of this top trending masterpiece. Discover a world of brilliant storytelling and cinematic excellence directly from the API.
                                </p>

                                <div className="flex flex-wrap gap-4">
                                    <Link to={`/movie/${currentHero.id}`} className="flex items-center justify-center gap-3 px-8 py-4 bg-white text-black font-extrabold rounded-full hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] hover:scale-105 transition-all text-lg">
                                        <Play size={20} fill="currentColor" /> Watch Now
                                    </Link>
                                    <button className="flex items-center justify-center gap-2 px-8 py-4 glass-light border border-white/10 text-white font-bold rounded-full hover:bg-white/10 hover:border-accent-gold hover:scale-105 transition-all text-lg backdrop-blur-md">
                                        <Plus size={20} /> My List
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Carousel Indicators */}
                        <div className="absolute bottom-10 inset-x-0 flex justify-center gap-3 z-30">
                            {heroMovies.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setCurrentHeroIndex(idx)}
                                    className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentHeroIndex ? 'w-8 bg-accent-gold' : 'w-2 bg-white/30 hover:bg-white/50'}`}
                                />
                            ))}
                        </div>
                    </>
                ) : (
                    <div className="absolute inset-0 bg-primary-bg animate-pulse"></div>
                )}
            </section>

            {/* TRENDING SECTION */}
            <section className="py-16 max-w-[1400px] mx-auto px-6 md:px-8 relative z-20 -mt-20">
                <div className="flex justify-between items-end mb-8">
                    <h2 className="text-3xl font-extrabold tracking-tight">
                        Trending Now
                    </h2>
                    <div className="flex items-center gap-4 w-full md:w-auto">
                        <div className="relative w-full sm:w-64">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-secondary">
                                <Search size={18} />
                            </div>
                            <input
                                type="text"
                                className="w-full pl-10 pr-4 py-2 bg-black/40 border border-border-color rounded-full focus:outline-none focus:border-accent-gold text-white placeholder:text-text-secondary/50 font-medium transition-colors text-sm"
                                placeholder="Search trending..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyDown={handleSearch}
                            />
                        </div>
                        <Link to="/movies" className="hidden sm:inline-block text-accent-gold hover:text-white transition-colors font-semibold text-sm tracking-wide uppercase whitespace-nowrap">
                            Explore All
                        </Link>
                    </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 relative">
                    <div className="absolute -inset-4 bg-accent-gold/5 blur-[100px] -z-10 rounded-full"></div>
                    {loading.trendingMovies ? (
                        Array.from({ length: 6 }).map((_, i) => (
                            <MovieCardSkeleton key={i} />
                        ))
                    ) : (
                        trendingMovies.slice(0, 6).map(movie => (
                            <MovieCard key={movie.id} {...movie} />
                        ))
                    )}
                </div>
            </section>


            {/* CINEMATIC SPOTLIGHT */}
            <section className="py-20 max-w-[1400px] mx-auto px-6 md:px-8">
                {spotlightMovie ? (
                    <div className="relative rounded-3xl overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.5)] border border-white/5 h-[80vh] md:h-[60vh]">
                        <div
                            className="absolute inset-0 bg-cover bg-center"
                            style={{ backgroundImage: `url('${spotlightMovie.imageSrc ? spotlightMovie.imageSrc.replace('w200', 'original') : ''}')` }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent"></div>

                        <div className="absolute inset-0 p-8 md:p-16 flex flex-col justify-center max-w-2xl">
                            <span className="text-accent-gold font-bold tracking-widest text-sm uppercase mb-4 block">Director's Cut</span>
                            <h2 className="text-4xl md:text-6xl font-black mb-6 leading-tight drop-shadow-xl text-white uppercase">
                                {spotlightMovie.title}
                            </h2>

                            <div className="flex items-center gap-1 text-accent-gold font-bold mb-4 bg-black/40 w-fit px-3 py-1 rounded-full border border-accent-gold/20">
                                <span>★</span> {spotlightMovie.rating}
                            </div>

                            <div className="flex flex-wrap gap-4 mt-6">
                                <Link to={`/movie/${spotlightMovie.id}`} className="flex items-center justify-center gap-3 px-8 py-4 bg-gradient-primary text-white font-bold rounded-full shadow-[0_0_30px_rgba(244,63,94,0.5)] hover:scale-105 transition-all w-full sm:w-auto text-center">
                                    <Play size={20} fill="currentColor" /> Watch Spotlight
                                </Link>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="w-full h-[60vh] bg-primary-bg animate-pulse rounded-3xl"></div>
                )}
            </section>

            {/* TOP RATED SECTION */}
            <section className="py-12 max-w-[1400px] mx-auto px-6 md:px-8 mb-20">
                <div className="flex justify-between items-end mb-8">
                    <h2 className="text-3xl font-extrabold tracking-tight">
                        Top Rated
                    </h2>
                    <Link to="/movies" className="text-accent-gold hover:text-white transition-colors font-semibold text-sm tracking-wide uppercase">
                        See Top 100
                    </Link>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                    {loading.topRatedMovies ? (
                        Array.from({ length: 6 }).map((_, i) => (
                            <MovieCardSkeleton key={i} />
                        ))
                    ) : (
                        topRatedMovies.slice(0, 6).map(movie => (
                            <MovieCard key={movie.id} {...movie} />
                        ))
                    )}
                </div>
            </section>
        </div>
    );
};

export default Home;
