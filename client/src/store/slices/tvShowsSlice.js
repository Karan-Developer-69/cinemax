import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAllTvShows, fetchTrendingTvShows, fetchPopularTvShows, fetchTopRatedTvShows, fetchSearchedTvShows } from "../../utils/movieApi";

export const getAllTvShows = createAsyncThunk(
    "tvShows/getAllTvShows",
    async (page = 1) => {
        const data = await fetchAllTvShows(page);
        return { data, page };
    }
);

export const getTrendingTvShows = createAsyncThunk(
    "tvShows/getTrendingTvShows",
    async () => {
        const data = await fetchTrendingTvShows();
        return data;
    }
);

export const getPopularTvShows = createAsyncThunk(
    "tvShows/getPopularTvShows",
    async () => {
        const data = await fetchPopularTvShows();
        return data;
    }
);

export const getTopRatedTvShows = createAsyncThunk(
    "tvShows/getTopRatedTvShows",
    async () => {
        const data = await fetchTopRatedTvShows();
        return data;
    }
);

export const getSearchedTvShows = createAsyncThunk(
    "tvShows/getSearchedTvShows",
    async ({ query }) => {
        const data = await fetchSearchedTvShows(query);
        return data;
    }
);

const initialState = {
    allTvShows: [],
    trendingTvShows: [],
    popularTvShows: [],
    topRatedTvShows: [],
    searchedTvShows: [],
    page: 1,
    loading: {
        allTvShows: false,
        trendingTvShows: false,
        popularTvShows: false,
        topRatedTvShows: false,
        searchedTvShows: false,
    }
};

const tvShowsSlice = createSlice({
    name: 'tvShows',
    initialState,
    reducers: {
        resetTvShowsState: (state) => {
            state.allTvShows = [];
            state.trendingTvShows = [];
            state.popularTvShows = [];
            state.topRatedTvShows = [];
            state.searchedTvShows = [];
            state.page = 1;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllTvShows.pending, (state) => {
                state.loading.allTvShows = true;
            })
            .addCase(getAllTvShows.fulfilled, (state, action) => {
                state.loading.allTvShows = false;
                if (action.payload.page === 1) {
                    state.allTvShows = action.payload.data;
                } else {
                    state.allTvShows = [...state.allTvShows, ...action.payload.data];
                }
                state.page = action.payload.page;
            })
            .addCase(getAllTvShows.rejected, (state) => {
                state.loading.allTvShows = false;
            })
            .addCase(getTrendingTvShows.pending, (state) => {
                state.loading.trendingTvShows = true;
            })
            .addCase(getTrendingTvShows.fulfilled, (state, action) => {
                state.loading.trendingTvShows = false;
                state.trendingTvShows = action.payload;
            })
            .addCase(getTrendingTvShows.rejected, (state) => {
                state.loading.trendingTvShows = false;
            })
            .addCase(getPopularTvShows.pending, (state) => {
                state.loading.popularTvShows = true;
            })
            .addCase(getPopularTvShows.fulfilled, (state, action) => {
                state.loading.popularTvShows = false;
                state.popularTvShows = action.payload;
            })
            .addCase(getPopularTvShows.rejected, (state) => {
                state.loading.popularTvShows = false;
            })
            .addCase(getTopRatedTvShows.pending, (state) => {
                state.loading.topRatedTvShows = true;
            })
            .addCase(getTopRatedTvShows.fulfilled, (state, action) => {
                state.loading.topRatedTvShows = false;
                state.topRatedTvShows = action.payload;
            })
            .addCase(getTopRatedTvShows.rejected, (state) => {
                state.loading.topRatedTvShows = false;
            })
            .addCase(getSearchedTvShows.pending, (state) => {
                state.loading.searchedTvShows = true;
            })
            .addCase(getSearchedTvShows.fulfilled, (state, action) => {
                state.loading.searchedTvShows = false;
                state.searchedTvShows = action.payload;
            })
            .addCase(getSearchedTvShows.rejected, (state) => {
                state.loading.searchedTvShows = false;
            });
    }
});
export const { resetTvShowsState } = tvShowsSlice.actions;
export default tvShowsSlice.reducer;