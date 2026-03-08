import axios from "axios";

const SERVER_API = "https://cinemax-zeta.vercel.app"

export const fetchAllMovies = async () => {
    const res = await axios.get(`${SERVER_API}/api/movie/all-movies`);
    return res.data;
}
export const fetchTrendingMovies = async () => {
    const res = await axios.get(`${SERVER_API}/api/movie/trending`);
    return res.data;
}

export const fetchPopularMovies = async () => {
    const res = await axios.get(`${SERVER_API}/api/movie/popular`);
    return res.data;
}

export const fetchTopRatedMovies = async () => {
    const res = await axios.get(`${SERVER_API}/api/movie/top_rated`);
    return res.data;
}

export const fetchSearchedMovies = async (query) => {
    const res = await axios.get(`${SERVER_API}/api/movie/search/${query}`);
    return res.data;
}

export const fetchAllTvShows = async () => {
    const res = await axios.get(`${SERVER_API}/api/movie/all-tvShows`);
    return res.data;
}

export const fetchSearchedTvShows = async (query) => {
    const res = await axios.get(`${SERVER_API}/api/movie/search-tv/${query}`);
    return res.data;
}

export const fetchTrendingTvShows = async () => {
    const res = await axios.get(`${SERVER_API}/api/movie/trending-tv`);
    return res.data;
}

export const fetchPopularTvShows = async () => {
    const res = await axios.get(`${SERVER_API}/api/movie/popular-tv`);
    return res.data;
}

export const fetchTopRatedTvShows = async () => {
    const res = await axios.get(`${SERVER_API}/api/movie/top_rated-tv`);
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