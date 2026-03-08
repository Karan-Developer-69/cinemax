import { useEffect, useState } from 'react';
import { Filter, ChevronDown, Search } from 'lucide-react';
import MovieCard from '../components/ui/MovieCard';
import MovieCardSkeleton from '../components/ui/MovieCardSkeleton';
import { useDispatch, useSelector } from 'react-redux';
import { getAllMovies, getTrendingMovies, getPopularMovies, getTopRatedMovies, getSearchedMovies } from '../store/slices/movieSlice';



const Movies = () => {
    const dispatch = useDispatch();
    const { allMovies, trendingMovies, popularMovies, topRatedMovies, searchedMovies, loading } = useSelector((state) => state.movies);
    const [filter, setFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        dispatch(getAllMovies());
    }, [dispatch]);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (searchQuery.trim().length > 0) {
                dispatch(getSearchedMovies(searchQuery));
            }
        }, 500);
        return () => clearTimeout(timer);
    }, [searchQuery, dispatch]);


    useEffect(() => {
        switch (filter) {
            case 'all':
                dispatch(getAllMovies());
                break;
            case 'trending':
                dispatch(getTrendingMovies());
                break;
            case 'popular':
                dispatch(getPopularMovies());
                break;
            case 'top_rated':
                dispatch(getTopRatedMovies());
                break;
            default:
                break;
        }
    }, [filter, dispatch]);

    const getActiveData = () => {
        if (searchQuery.trim().length > 0) {
            return { data: searchedMovies, isLoading: loading.searchedMovies };
        }
        switch (filter) {
            case 'trending': return { data: trendingMovies, isLoading: loading.trendingMovies };
            case 'popular': return { data: popularMovies, isLoading: loading.popularMovies };
            case 'top_rated': return { data: topRatedMovies, isLoading: loading.topRatedMovies };
            case 'all':
            default: return { data: allMovies, isLoading: loading.allMovies };
        }
    };

    const { data: currentMovies, isLoading } = getActiveData();

    return (
        <div className="pt-32 max-w-[1400px] mx-auto px-6 md:px-8 pb-20 w-full min-h-screen">

            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                <div>
                    <h1 className="text-5xl md:text-6xl font-extrabold mb-4 tracking-tight">Explore Movies</h1>
                    <p className="text-text-secondary text-lg max-w-2xl">Discover critically acclaimed films, blockbuster hits, and hidden gems across all genres.</p>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
                    <div className="relative w-full sm:w-64 md:w-80">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-secondary">
                            <Search size={18} />
                        </div>
                        <input
                            type="text"
                            className="w-full pl-10 pr-4 py-2.5 bg-black/40 border border-border-color rounded-xl focus:outline-none focus:border-accent-gold text-white placeholder:text-text-secondary/50 font-medium transition-colors"
                            placeholder="Search movies..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-2 w-full sm:w-auto">

                        <div className="relative flex-1 sm:flex-none">
                            <select value={filter} onChange={e => setFilter(e.target.value)} name='filter' id='filter' className="filter appearance-none w-full pl-5 pr-12 py-2.5 glass-light border border-border-color rounded-xl text-sm font-semibold text-white focus:outline-none focus:border-accent-gold transition-colors cursor-pointer">
                                <option value="all" className="bg-zinc-900">All Movies</option>
                                <option value="trending" className="bg-zinc-900">Trending</option>
                                <option value="popular" className="bg-zinc-900">Popular</option>
                                <option value="top_rated" className="bg-zinc-900">Top Rated</option>
                            </select>
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-text-secondary">
                                <Filter size={16} />
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-6">
                {isLoading ? (
                    Array.from({ length: 14 }).map((_, i) => (
                        <MovieCardSkeleton key={i} />
                    ))
                ) : currentMovies && currentMovies.length > 0 ? (
                    currentMovies.map((movie) => (
                        <MovieCard key={movie.id} {...movie} />
                    ))
                ) : (
                    <div className="col-span-full py-20 text-center text-text-secondary">
                        <h2 className="text-2xl font-bold mb-2">No movies found</h2>
                        <p>Try refining your search or filter.</p>
                    </div>
                )}
            </div>

            {/* Load More */}
            {!searchQuery && currentMovies && currentMovies.length > 0 && (
                <div className="mt-16 flex justify-center">
                    <button className="px-10 py-4 glass-light border border-white/10 text-white font-bold rounded-full hover:bg-white/10 transition-all hover:scale-105">
                        Load More Movies
                    </button>
                </div>
            )}
        </div>
    );
};

export default Movies;
