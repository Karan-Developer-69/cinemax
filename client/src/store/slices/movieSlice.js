import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAllMovies, fetchTrendingMovies, fetchPopularMovies, fetchTopRatedMovies, fetchSearchedMovies, fetchPublicCustomMedia } from "../../utils/movieApi";

export const getAllMovies = createAsyncThunk(
    "movie/getAllMovies",
    async () => {
        const data = await fetchAllMovies();
        return data;
    }
);
export const getTrendingMovies = createAsyncThunk(
    "movie/getTrendingMovies",
    async () => {
        const data = await fetchTrendingMovies();
        return data;
    }
);

export const getPopularMovies = createAsyncThunk(
    "movie/getPopularMovies",
    async () => {
        const data = await fetchPopularMovies();
        return data;
    }
);

export const getTopRatedMovies = createAsyncThunk(
    "movie/getTopRatedMovies",
    async () => {
        const data = await fetchTopRatedMovies();
        return data;
    }
);
export const getSearchedMovies = createAsyncThunk(
    "movie/getSearchedMovies",
    async (query) => {
        const data = await fetchSearchedMovies(query);
        return data;
    }
);

export const getPublicCustomMedia = createAsyncThunk(
    "movie/getPublicCustomMedia",
    async () => {
        const data = await fetchPublicCustomMedia();
        return data;
    }
);

const initialState = {
    allMovies: [],
    trendingMovies: [],
    popularMovies: [],
    topRatedMovies: [],
    searchedMovies: [],
    customMedia: [],
    loading: {
        allMovies: false,
        trendingMovies: false,
        popularMovies: false,
        topRatedMovies: false,
        searchedMovies: false,
        customMedia: false,
    }
};

const movieSlice = createSlice({
    name: "movie",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllMovies.pending, (state) => {
                state.loading.allMovies = true;
            })
            .addCase(getAllMovies.fulfilled, (state, action) => {
                state.loading.allMovies = false;
                state.allMovies = action.payload;
            })
            .addCase(getAllMovies.rejected, (state) => {
                state.loading.allMovies = false;
            })
            .addCase(getTrendingMovies.pending, (state) => {
                state.loading.trendingMovies = true;
            })
            .addCase(getTrendingMovies.fulfilled, (state, action) => {
                state.loading.trendingMovies = false;
                state.trendingMovies = action.payload;
            })
            .addCase(getTrendingMovies.rejected, (state) => {
                state.loading.trendingMovies = false;
            })
            .addCase(getPopularMovies.pending, (state) => {
                state.loading.popularMovies = true;
            })
            .addCase(getPopularMovies.fulfilled, (state, action) => {
                state.loading.popularMovies = false;
                state.popularMovies = action.payload;
            })
            .addCase(getPopularMovies.rejected, (state) => {
                state.loading.popularMovies = false;
            })
            .addCase(getTopRatedMovies.pending, (state) => {
                state.loading.topRatedMovies = true;
            })
            .addCase(getTopRatedMovies.fulfilled, (state, action) => {
                state.loading.topRatedMovies = false;
                state.topRatedMovies = action.payload;
            })
            .addCase(getTopRatedMovies.rejected, (state) => {
                state.loading.topRatedMovies = false;
            })
            .addCase(getSearchedMovies.pending, (state) => {
                state.loading.searchedMovies = true;
            })
            .addCase(getSearchedMovies.fulfilled, (state, action) => {
                state.loading.searchedMovies = false;
                state.searchedMovies = action.payload;
            })
            .addCase(getSearchedMovies.rejected, (state) => {
                state.loading.searchedMovies = false;
            })
            .addCase(getPublicCustomMedia.pending, (state) => {
                state.loading.customMedia = true;
            })
            .addCase(getPublicCustomMedia.fulfilled, (state, action) => {
                state.loading.customMedia = false;
                state.customMedia = action.payload;
            })
            .addCase(getPublicCustomMedia.rejected, (state) => {
                state.loading.customMedia = false;
            });
    }
});

export default movieSlice.reducer;