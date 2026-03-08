import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './slices/themeSlice';
import movieReducer from './slices/movieSlice';
import tvShowsReducer from './slices/tvShowsSlice';
import userReducer from './slices/userSlice';

export const store = configureStore({
    reducer: {
        theme: themeReducer,
        movies: movieReducer,
        tvShows: tvShowsReducer,
        user: userReducer,
    },
});
