import { Heart } from 'lucide-react';
import MovieCard from '../components/ui/MovieCard';
import MovieCardSkeleton from '../components/ui/MovieCardSkeleton';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { fetchMovieDetails, fetchTvShowDetails } from '../utils/movieApi';

const Favorites = () => {
    const { favoriteMovies, favoriteTvShows, user, loading: userLoading } = useSelector((state) => state.user);
    const [favoritesData, setFavoritesData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchAllFavorites = async () => {
            if (!user) return;

            setLoading(true);
            try {
                // Map movie APIs
                const moviePromises = (favoriteMovies || []).map(async (id) => {
                    const data = await fetchMovieDetails(id);
                    return {
                        id: data.id,
                        title: data.title,
                        rating: data.vote_average?.toFixed(1) || '0.0',
                        year: data.release_date ? data.release_date.split('-')[0] : 'N/A',
                        imageSrc: data.poster_path ? `https://image.tmdb.org/t/p/w500${data.poster_path}` : 'https://via.placeholder.com/500x750?text=No+Image',
                        type: 'movie'
                    };
                });

                // Map TV APIs
                const tvPromises = (favoriteTvShows || []).map(async (id) => {
                    const data = await fetchTvShowDetails(id);
                    return {
                        id: data.id,
                        title: data.name,
                        rating: data.vote_average?.toFixed(1) || '0.0',
                        year: data.first_air_date ? data.first_air_date.split('-')[0] : 'N/A',
                        imageSrc: data.poster_path ? `https://image.tmdb.org/t/p/w500${data.poster_path}` : 'https://via.placeholder.com/500x750?text=No+Image',
                        type: 'tv'
                    };
                });

                const allFavorites = await Promise.all([...moviePromises, ...tvPromises]);

                // Sort to mix them or leave as is (movies then tv)
                setFavoritesData(allFavorites);
            } catch (err) {
                console.error("Error fetching favorite details:", err);
            } finally {
                setLoading(false);
            }
        };

        if (!userLoading) {
            fetchAllFavorites();
        }
    }, [favoriteMovies, favoriteTvShows, user, userLoading]);

    const hasFavorites = favoritesData.length > 0;

    return (
        <div className="pt-32 max-w-[1400px] mx-auto px-6 md:px-8 pb-20 w-full min-h-[70vh]">
            <div className="mb-12">
                <h1 className="text-5xl md:text-6xl font-extrabold mb-4 tracking-tight">My Favorites</h1>
                <p className="text-text-secondary text-lg">Your personal collection of top picks and saved titles.</p>
            </div>

            {loading || userLoading ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
                    {Array.from({ length: 12 }).map((_, i) => (
                        <MovieCardSkeleton key={`loading-fav-${i}`} />
                    ))}
                </div>
            ) : !user ? (
                <div className="text-center py-32 flex flex-col items-center justify-center animate-fade-in-up">
                    <div className="w-32 h-32 glass-light rounded-full flex items-center justify-center mb-8 text-text-primary border border-border-color shadow-[0_0_30px_rgba(244,63,94,0.3)]">
                        <Heart size={44} fill="currentColor" className="text-accent-gold" />
                    </div>
                    <h2 className="text-3xl font-extrabold mb-3 tracking-tight text-text-primary">Sign in to view favorites</h2>
                    <p className="text-text-secondary text-lg max-w-sm mb-10 font-medium">
                        You need an account to save and collect movies and TV shows.
                    </p>
                </div>
            ) : !hasFavorites ? (
                <div className="text-center py-32 flex flex-col items-center justify-center animate-fade-in-up">
                    <div className="w-32 h-32 glass-light rounded-full flex items-center justify-center mb-8 text-text-primary border border-border-color shadow-[0_0_30px_rgba(244,63,94,0.3)]">
                        <Heart size={44} fill="currentColor" className="text-accent-gold" />
                    </div>
                    <h2 className="text-3xl font-extrabold mb-3 tracking-tight text-text-primary">No favorites yet</h2>
                    <p className="text-text-secondary text-lg max-w-sm mb-10 font-medium">
                        Start adding movies and shows to your favorites to easily find them later.
                    </p>
                    <button className="px-10 py-4 bg-text-primary text-primary-bg font-extrabold rounded-full hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:scale-105 transition-all">
                        Explore Movies
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
                    {favoritesData.map((item) => (
                        <MovieCard key={`${item.type}-${item.id}`} {...item} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Favorites;
