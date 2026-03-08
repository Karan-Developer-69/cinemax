import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { registerUser, loginUser, fetchMe, logoutUser } from '../../utils/authApi';
import { addFavorite, removeFavorite, fetchFavorites, addFavoriteTv, removeFavoriteTv, fetchFavoriteTvs } from '../../utils/favoriteApi';
import toast from 'react-hot-toast';

const initialState = {
    user: null,
    favoriteMovies: [],
    favoriteTvShows: [],
    loading: true, // Start true while verifying token
    error: null,
};

export const verifyUser = createAsyncThunk('user/verifyUser', async (_, { rejectWithValue }) => {
    try {
        const data = await fetchMe();
        return data.user;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Token verification failed');
    }
});

export const register = createAsyncThunk('user/register', async (userData, { rejectWithValue }) => {
    try {
        const data = await registerUser(userData);
        return data.user;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Registration failed');
    }
});

export const login = createAsyncThunk('user/login', async (credentials, { rejectWithValue }) => {
    try {
        const data = await loginUser(credentials);
        return data.user;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
});

export const logout = createAsyncThunk('user/logout', async (_, { rejectWithValue }) => {
    try {
        await logoutUser();
        return null;
    } catch (error) {
        return rejectWithValue('Logout failed');
    }
});

export const loadFavorites = createAsyncThunk('user/loadFavorites', async (userId, { rejectWithValue }) => {
    try {
        const [moviesRes, tvRes] = await Promise.all([
            fetchFavorites(userId),
            fetchFavoriteTvs(userId)
        ]);
        return {
            movies: moviesRes.map(f => f.movie),
            tvShows: tvRes.map(f => f.tvShow)
        };
    } catch (error) {
        return rejectWithValue('Failed to fetch favorites');
    }
});

export const toggleFavorite = createAsyncThunk('user/toggleFavorite', async ({ userId, mediaId, isFavorite, type }, { rejectWithValue }) => {
    try {
        if (type === 'tv') {
            if (isFavorite) {
                await removeFavoriteTv(userId, mediaId);
                return { mediaId, type, action: 'remove' };
            } else {
                await addFavoriteTv(userId, mediaId);
                return { mediaId, type, action: 'add' };
            }
        } else {
            if (isFavorite) {
                await removeFavorite(userId, mediaId);
                return { mediaId, type, action: 'remove' };
            } else {
                await addFavorite(userId, mediaId);
                return { mediaId, type, action: 'add' };
            }
        }
    } catch (error) {
        toast.error('Something went wrong! Could not update favorites.');
        return rejectWithValue('Failed to update favorite status');
    }
});

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Verify User
            .addCase(verifyUser.pending, (state) => { state.loading = true; })
            .addCase(verifyUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(verifyUser.rejected, (state, action) => {
                state.loading = false;
                state.user = null;
                // Don't show an explicit error on load reject, just means not logged in
            })
            // Login
            .addCase(login.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Logout
            .addCase('user/logout', (state) => {
                state.user = null;
                state.favoriteMovies = [];
                state.favoriteTvShows = [];
                state.error = null;
                logoutUser().catch(console.error); // Best effort clear cookie
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
                state.favoriteMovies = [];
                state.favoriteTvShows = [];
                state.error = null;
            })
            // Load Favorites
            .addCase(loadFavorites.fulfilled, (state, action) => {
                state.favoriteMovies = action.payload.movies;
                state.favoriteTvShows = action.payload.tvShows;
            })
            // Toggle Favorite
            .addCase(toggleFavorite.pending, (state, action) => {
                const { mediaId, type, isFavorite } = action.meta.arg;
                const targetArray = type === 'tv' ? 'favoriteTvShows' : 'favoriteMovies';

                if (isFavorite) {
                    // Optimistic remove
                    state[targetArray] = state[targetArray].filter(id => id !== mediaId);
                } else {
                    // Optimistic add
                    if (!state[targetArray].includes(mediaId)) {
                        state[targetArray].push(mediaId);
                    }
                }
            })
            // fulfilled case does nothing because state is optimistically updated
            .addCase(toggleFavorite.rejected, (state, action) => {
                // Revert state if the API call fails
                const { mediaId, type, isFavorite } = action.meta.arg;
                const targetArray = type === 'tv' ? 'favoriteTvShows' : 'favoriteMovies';

                if (isFavorite) {
                    // It was an optimistic remove, so add it back
                    if (!state[targetArray].includes(mediaId)) {
                        state[targetArray].push(mediaId);
                    }
                } else {
                    // It was an optimistic add, so remove it
                    state[targetArray] = state[targetArray].filter(id => id !== mediaId);
                }
            });
    },
});

export const { clearError } = userSlice.actions;
export default userSlice.reducer;
