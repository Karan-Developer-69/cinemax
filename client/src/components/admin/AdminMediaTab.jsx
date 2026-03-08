import { useState, useEffect, useCallback } from 'react';
import { createCustomMovie, fetchCustomMovies, deleteCustomMovie, createCustomTvShow, fetchCustomTvShows, deleteCustomTvShow } from '../../utils/adminApi';
import toast from 'react-hot-toast';
import { Trash2, Plus, X } from 'lucide-react';
import AdminMediaSkeleton from '../ui/AdminMediaSkeleton';

const AdminMediaTab = ({ type }) => {
    const isMovie = type === 'movies';
    const [mediaItems, setMediaItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        title: '',
        overview: '',
        posterUrl: '',
        backdropUrl: '',
        rating: 0,
        year: '',
        runtime: '',
        seasons: 1,
        trailerKey: '',
        genres: '' // comma separated
    });

    const loadMedia = useCallback(async () => {
        try {
            setLoading(true);
            const data = isMovie ? await fetchCustomMovies() : await fetchCustomTvShows();
            setMediaItems(data);
        } catch (error) {
            toast.error(error.response?.data?.message || `Failed to load ${isMovie ? 'movies' : 'TV shows'}`);
        } finally {
            setLoading(false);
        }
    }, [isMovie]);

    useEffect(() => {
        loadMedia();
    }, [loadMedia]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                ...formData,
                genres: formData.genres.split(',').map(g => g.trim()).filter(g => g),
                rating: Number(formData.rating),
            };

            if (isMovie) {
                payload.runtime = Number(formData.runtime);
                await createCustomMovie(payload);
            } else {
                payload.seasons = Number(formData.seasons);
                await createCustomTvShow(payload);
            }

            toast.success("Successfully created!");
            setShowForm(false);
            setFormData({ title: '', overview: '', posterUrl: '', backdropUrl: '', rating: 0, year: '', runtime: '', seasons: 1, trailerKey: '', genres: '' });
            loadMedia();
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to create");
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this?")) return;
        try {
            if (isMovie) {
                await deleteCustomMovie(id);
            } else {
                await deleteCustomTvShow(id);
            }
            toast.success("Deleted successfully");
            // Update local state instead of re-fetching
            setMediaItems(prev => prev.filter(item => item._id !== id));
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to delete");
        }
    };

    if (loading) return <AdminMediaSkeleton />;

    return (
        <div className="bg-secondary-bg/50 rounded-xl border border-border-color p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-text-primary">Custom {isMovie ? 'Movies' : 'TV Shows'}</h2>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="flex items-center gap-2 px-4 py-2 bg-accent-gold text-primary-bg font-bold rounded-lg hover:bg-accent-gold/80 transition-colors"
                >
                    {showForm ? <><X size={18} /> Cancel</> : <><Plus size={18} /> Add New</>}
                </button>
            </div>

            {showForm && (
                <form onSubmit={handleSubmit} className="mb-8 p-6 bg-primary-bg rounded-xl border border-border-color">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="text-text-secondary text-sm mb-1 block">Title *</label>
                            <input required name="title" value={formData.title} onChange={handleChange} className="w-full bg-secondary-bg border border-border-color rounded-lg px-4 py-2 text-text-primary focus:outline-none focus:border-accent-gold" />
                        </div>
                        <div>
                            <label className="text-text-secondary text-sm mb-1 block">Poster URL *</label>
                            <input required name="posterUrl" value={formData.posterUrl} onChange={handleChange} className="w-full bg-secondary-bg border border-border-color rounded-lg px-4 py-2 text-text-primary focus:outline-none focus:border-accent-gold" />
                        </div>
                        <div>
                            <label className="text-text-secondary text-sm mb-1 block">Backdrop URL</label>
                            <input name="backdropUrl" value={formData.backdropUrl} onChange={handleChange} className="w-full bg-secondary-bg border border-border-color rounded-lg px-4 py-2 text-text-primary focus:outline-none focus:border-accent-gold" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-text-secondary text-sm mb-1 block">Rating (0-10)</label>
                                <input type="number" step="0.1" name="rating" value={formData.rating} onChange={handleChange} className="w-full bg-secondary-bg border border-border-color rounded-lg px-4 py-2 text-text-primary focus:outline-none focus:border-accent-gold" />
                            </div>
                            <div>
                                <label className="text-text-secondary text-sm mb-1 block">Year</label>
                                <input name="year" value={formData.year} onChange={handleChange} className="w-full bg-secondary-bg border border-border-color rounded-lg px-4 py-2 text-text-primary focus:outline-none focus:border-accent-gold" />
                            </div>
                        </div>
                        {isMovie ? (
                            <div>
                                <label className="text-text-secondary text-sm mb-1 block">Runtime (mins)</label>
                                <input type="number" name="runtime" value={formData.runtime} onChange={handleChange} className="w-full bg-secondary-bg border border-border-color rounded-lg px-4 py-2 text-text-primary focus:outline-none focus:border-accent-gold" />
                            </div>
                        ) : (
                            <div>
                                <label className="text-text-secondary text-sm mb-1 block">Seasons</label>
                                <input type="number" name="seasons" value={formData.seasons} onChange={handleChange} className="w-full bg-secondary-bg border border-border-color rounded-lg px-4 py-2 text-text-primary focus:outline-none focus:border-accent-gold" />
                            </div>
                        )}
                        <div>
                            <label className="text-text-secondary text-sm mb-1 block">Trailer Video ID (e.g. YouTube key)</label>
                            <input name="trailerKey" value={formData.trailerKey} onChange={handleChange} className="w-full bg-secondary-bg border border-border-color rounded-lg px-4 py-2 text-text-primary focus:outline-none focus:border-accent-gold" />
                        </div>
                        <div className="md:col-span-2">
                            <label className="text-text-secondary text-sm mb-1 block">Genres (comma separated)</label>
                            <input name="genres" value={formData.genres} onChange={handleChange} placeholder="Action, Thriller, Sci-Fi..." className="w-full bg-secondary-bg border border-border-color rounded-lg px-4 py-2 text-text-primary focus:outline-none focus:border-accent-gold" />
                        </div>
                        <div className="md:col-span-2">
                            <label className="text-text-secondary text-sm mb-1 block">Overview *</label>
                            <textarea required rows="3" name="overview" value={formData.overview} onChange={handleChange} className="w-full bg-secondary-bg border border-border-color rounded-lg px-4 py-2 text-text-primary focus:outline-none focus:border-accent-gold" />
                        </div>
                    </div>
                    <button type="submit" className="mt-4 px-6 py-3 bg-accent-gold text-primary-bg font-bold rounded-lg hover:bg-text-primary transition-colors w-full">
                        Save {isMovie ? 'Movie' : 'TV Show'}
                    </button>
                </form>
            )}

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {mediaItems.map(item => (
                    <div key={item._id} className="relative group bg-secondary-bg border border-border-color rounded-xl overflow-hidden aspect-[2/3]">
                        <img src={item.posterUrl} alt={item.title} loading="lazy" className="w-full h-full object-cover opacity-80 group-hover:opacity-40 transition-opacity" />
                        <div className="absolute inset-0 p-4 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-t from-[#000] via-[#000]/80 to-transparent">
                            <h3 className="text-neutral-50 font-bold text-sm truncate">{item.title}</h3>
                            <button
                                onClick={() => handleDelete(item._id)}
                                className="mt-2 w-full py-2 bg-red-500/20 text-red-500 border border-red-500/50 rounded flex justify-center items-center hover:bg-red-500 hover:text-white transition-colors gap-2"
                            >
                                <Trash2 size={14} /> Delete
                            </button>
                        </div>
                    </div>
                ))}
                {mediaItems.length === 0 && (
                    <div className="col-span-full py-10 text-center text-text-secondary/50">No items found. Create one above!</div>
                )}
            </div>
        </div>
    );
};

export default AdminMediaTab;
