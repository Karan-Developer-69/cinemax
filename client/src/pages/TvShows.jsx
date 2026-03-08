import { useEffect, useState, useCallback, useRef } from 'react';
import { Filter, Search } from 'lucide-react';
import MovieCard from '../components/ui/MovieCard';
import MovieCardSkeleton from '../components/ui/MovieCardSkeleton';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTvShows, getTrendingTvShows, getPopularTvShows, getTopRatedTvShows, getSearchedTvShows, resetTvShowsState } from '../store/slices/tvShowsSlice';

const TvShows = () => {
    const dispatch = useDispatch();
    const { allTvShows, trendingTvShows, popularTvShows, topRatedTvShows, searchedTvShows, loading, page } = useSelector((state) => state.tvShows);
    const [filter, setFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const triggered = useRef(false);

    useEffect(() => {
        return () => {
            dispatch(resetTvShowsState?.() || { type: 'NOOP' });
        };
    }, [dispatch]);

    const getActiveData = useCallback(() => {
        if (searchQuery.trim().length > 0) {
            return { data: searchedTvShows, isLoading: loading.searchedTvShows };
        }
        switch (filter) {
            case 'trending': return { data: trendingTvShows, isLoading: loading.trendingTvShows };
            case 'popular': return { data: popularTvShows, isLoading: loading.popularTvShows };
            case 'top_rated': return { data: topRatedTvShows, isLoading: loading.topRatedTvShows };
            case 'all':
            default: return { data: allTvShows, isLoading: loading.allTvShows };
        }
    }, [searchQuery, filter, searchedTvShows, trendingTvShows, popularTvShows, topRatedTvShows, allTvShows, loading]);

    const { data: currentShows, isLoading } = getActiveData();

    useEffect(() => {
        if (!isLoading) {
            triggered.current = false;
        }
    }, [isLoading]);

    const handleLoadMore = useCallback(() => {
        if (isLoading) return;
        const nextPage = page + 1;
        if (searchQuery.trim().length > 0) {
            dispatch(getSearchedTvShows({ query: searchQuery, page: nextPage }));
        } else {
            switch (filter) {
                case 'trending': dispatch(getTrendingTvShows(nextPage)); break;
                case 'popular': dispatch(getPopularTvShows(nextPage)); break;
                case 'top_rated': dispatch(getTopRatedTvShows(nextPage)); break;
                case 'all':
                default: dispatch(getAllTvShows(nextPage)); break;
            }
        }
    }, [dispatch, isLoading, page, searchQuery, filter]);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const scrollHeight = document.documentElement.scrollHeight;
            const clientHeight = window.innerHeight;

            const percent = Math.floor((scrollTop / (scrollHeight - clientHeight)) * 100);

            if (percent === 99 && !triggered.current && !isLoading) {
                triggered.current = true;
                handleLoadMore();
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleLoadMore, isLoading]);

    useEffect(() => {
        dispatch(getAllTvShows());
    }, [dispatch]);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (searchQuery.trim().length > 0) {
                dispatch(resetTvShowsState?.() || { type: 'NOOP' });
                dispatch(getSearchedTvShows({ query: searchQuery, page: 1 }));
            }
        }, 500);
        return () => clearTimeout(timer);
    }, [searchQuery, dispatch]);

    useEffect(() => {
        dispatch(resetTvShowsState?.() || { type: 'NOOP' });
        triggered.current = false;
        switch (filter) {
            case 'all':
                dispatch(getAllTvShows());
                break;
            case 'trending':
                dispatch(getTrendingTvShows());
                break;
            case 'popular':
                dispatch(getPopularTvShows());
                break;
            case 'top_rated':
                dispatch(getTopRatedTvShows());
                break;
            default:
                break;
        }
    }, [filter, dispatch]);


    return (
        <div className="pt-32 max-w-[1400px] mx-auto px-6 md:px-8 pb-20 w-full min-h-screen">

            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                <div>
                    <span className="text-accent-gold font-bold tracking-widest text-sm uppercase mb-2 block">Binge-Worthy</span>
                    <h1 className="text-5xl md:text-6xl font-extrabold mb-4 tracking-tight">TV Shows</h1>
                    <p className="text-text-secondary text-lg max-w-2xl">Dive into ongoing narratives, limited series, and the most talked-about television of the year.</p>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
                    <div className="relative w-full sm:w-64 md:w-80">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-secondary">
                            <Search size={18} />
                        </div>
                        <input
                            type="text"
                            className="w-full pl-10 pr-4 py-2.5 bg-secondary-bg border border-border-color rounded-xl focus:outline-none focus:border-accent-gold text-text-primary placeholder:text-text-secondary/50 font-medium transition-colors"
                            placeholder="Search TV shows..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-2 w-full sm:w-auto">
                        <div className="relative flex-1 sm:flex-none">
                            <select value={filter} onChange={e => setFilter(e.target.value)} name='filter' id='filter' className="filter appearance-none w-full pl-5 pr-12 py-2.5 glass-light border border-border-color rounded-xl text-sm font-semibold text-text-primary focus:outline-none focus:border-accent-gold transition-colors cursor-pointer">
                                <option value="all" className="bg-primary-bg">All Shows</option>
                                <option value="trending" className="bg-primary-bg">Trending</option>
                                <option value="popular" className="bg-primary-bg">Popular</option>
                                <option value="top_rated" className="bg-primary-bg">Top Rated</option>
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
                {isLoading && (!currentShows || currentShows.length === 0) ? (
                    Array.from({ length: 14 }).map((_, i) => (
                        <MovieCardSkeleton key={`initial-${i}`} />
                    ))
                ) : currentShows && currentShows.length > 0 ? (
                    <>
                        {currentShows.map((show) => (
                            <MovieCard key={show.id} type="tv" {...show} />
                        ))}
                        {isLoading && Array.from({ length: 7 }).map((_, i) => (
                            <MovieCardSkeleton key={`loading-${i}`} />
                        ))}
                    </>
                ) : (
                    <div className="col-span-full py-20 text-center text-text-secondary">
                        <h2 className="text-2xl font-bold mb-2">No TV shows found</h2>
                        <p>Try refining your search or filter.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TvShows;
