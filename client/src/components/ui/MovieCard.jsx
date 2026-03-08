import { Heart, Play } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '../../store/slices/userSlice';
import clsx from 'clsx';

const MovieCard = ({ id, title, rating, year, imageSrc, type = "movie" }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, favoriteMovies, favoriteTvShows } = useSelector((state) => state.user);

    const isFavorite = type === 'tv'
        ? favoriteTvShows?.includes(id?.toString())
        : favoriteMovies?.includes(id?.toString());

    const handleFavoriteClick = (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (!user) {
            navigate('/login');
            return;
        }

        dispatch(toggleFavorite({ userId: user._id, mediaId: id.toString(), isFavorite, type }));
    };

    const fallbackImage = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 450'%3E%3Cdefs%3E%3ClinearGradient id='gf' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%233f3f46;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%2309090b;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='300' height='450' fill='url(%23gf)'/%3E%3Ctext x='150' y='225' font-size='20' fill='white' text-anchor='middle' dominant-baseline='middle' font-family='sans-serif'%3ENo Image%3C/text%3E%3C/svg%3E`;

    return (
        <Link to={`/${type}/${id}`} className="block group">
            <div className="relative rounded-2xl overflow-hidden aspect-[2/3] bg-tertiary-bg border border-border-color shadow-lg transition-transform duration-500 ease-out group-hover:-translate-y-2 group-hover:shadow-[0_20px_40px_rgba(244,63,94,0.15)]">

                <img
                    src={imageSrc || fallbackImage}
                    alt={title || 'Media'}
                    onError={(e) => { e.target.src = fallbackImage; }}
                    className="w-full h-full object-cover transition-transform  duration-700 ease-out group-hover:scale-105"
                />

                {/* Top left badge */}
                <div className="absolute top-3 left-3 px-2.5 py-1 glass-dark rounded-md text-xs font-bold text-neutral-50 tracking-wide border border-neutral-50/10">
                    ★ {rating !== undefined && rating !== null ? rating : 'N/A'}
                </div>

                {/* Favorite Button (stops propagation to Link) */}
                <button
                    onClick={handleFavoriteClick}
                    className={clsx(
                        "absolute top-3 right-3 w-8 h-8 rounded-full glass-dark border flex items-center justify-center transition-colors z-20",
                        isFavorite
                            ? "border-red-500 bg-red-500/20 text-red-500 hover:bg-red-500/30"
                            : "border-neutral-50/10 text-neutral-300 hover:text-accent-gold hover:bg-neutral-50/10"
                    )}
                >
                    <Heart size={14} fill={isFavorite ? "currentColor" : "none"} />
                </button>

                {/* Hover Action Overlay */}
                <div className="absolute inset-0 bg-[#000]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10 backdrop-blur-[2px]">
                    <div className="w-14 h-14 rounded-full bg-accent-gold/90 text-neutral-50 flex items-center justify-center shadow-lg transform scale-50 group-hover:scale-100 transition-transform duration-300 delay-75">
                        <Play size={24} fill="currentColor" className="ml-1" />
                    </div>
                </div>

                {/* Bottom Details Bar */}
                <div className="absolute bottom-0 left-0 right-0 p-4 pt-12 bg-gradient-to-t from-[#000] via-[#000]/80 to-transparent flex flex-col justify-end z-10">
                    <h3 className="font-bold text-base text-neutral-50 truncate drop-shadow-md">{title || "Unknown Title"}</h3>
                    <p className="text-neutral-300 text-sm drop-shadow-md">{year || "N/A"}</p>
                </div>
            </div>
        </Link>
    );
};

export default MovieCard;
