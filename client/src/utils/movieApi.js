import axios from "axios";

const SERVER_API = import.meta.env.VITE_API_BASE_URL;

export const fetchAllMovies = async (page = 1) => {
    const res = await axios.get(`${SERVER_API}/api/movie/all-movies?page=${page}`);
    return res.data;
}
export const fetchTrendingMovies = async (page = 1) => {
    const res = await axios.get(`${SERVER_API}/api/movie/trending?page=${page}`);
    return res.data;
}

export const fetchPopularMovies = async (page = 1) => {
    const res = await axios.get(`${SERVER_API}/api/movie/popular?page=${page}`);
    return res.data;
}

export const fetchTopRatedMovies = async (page = 1) => {
    const res = await axios.get(`${SERVER_API}/api/movie/top_rated?page=${page}`);
    return res.data;
}

export const fetchSearchedMovies = async (query, page = 1) => {
    const res = await axios.get(`${SERVER_API}/api/movie/search/${query}?page=${page}`);
    return res.data;
}

export const fetchAllTvShows = async (page = 1) => {
    const res = await axios.get(`${SERVER_API}/api/movie/all-tvShows?page=${page}`);
    return res.data;
}

export const fetchSearchedTvShows = async (query, page = 1) => {
    const res = await axios.get(`${SERVER_API}/api/movie/search-tv/${query}?page=${page}`);
    return res.data;
}

export const fetchTrendingTvShows = async (page = 1) => {
    const res = await axios.get(`${SERVER_API}/api/movie/trending-tv?page=${page}`);
    return res.data;
}

export const fetchPopularTvShows = async (page = 1) => {
    const res = await axios.get(`${SERVER_API}/api/movie/popular-tv?page=${page}`);
    return res.data;
}

export const fetchTopRatedTvShows = async (page = 1) => {
    const res = await axios.get(`${SERVER_API}/api/movie/top_rated-tv?page=${page}`);
    return res.data;
}

export const fetchMovieDetails = async (id) => {
    const res = await axios.get(`${SERVER_API}/api/movie/details/${id}`);
    return res.data;
}

export const fetchTvShowDetails = async (id) => {
    const res = await axios.get(`${SERVER_API}/api/movie/details-tv/${id}`);
    return res.data;
}

export const fetchMovieTrailer = async (id) => {
    const res = await axios.get(`${SERVER_API}/api/movie/trailer/${id}`);
    return res.data;
}

export const fetchPublicCustomMedia = async () => {
    const res = await axios.get(`${SERVER_API}/api/movie/custom-media`);
    return res.data;
}