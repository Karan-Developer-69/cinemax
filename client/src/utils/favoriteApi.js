import axios from "axios";

// Movie Favorites API
const api = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api/favorites`,
    withCredentials: true,
});

export const addFavorite = async (userId, movieId) => {
    const res = await api.post(`/add`, { userId, movieId });
    return res.data;
};

export const removeFavorite = async (userId, movieId) => {
    const res = await api.post(`/remove`, { userId, movieId });
    return res.data;
};

export const fetchFavorites = async (userId) => {
    const res = await api.get(`/${userId}`);
    return res.data;
};

// TV Show Favorites API
const tvApi = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api/favorites-tv`,
    withCredentials: true,
});

export const addFavoriteTv = async (userId, tvShowId) => {
    const res = await tvApi.post(`/add`, { userId, tvShowId });
    return res.data;
};

export const removeFavoriteTv = async (userId, tvShowId) => {
    const res = await tvApi.post(`/remove`, { userId, tvShowId });
    return res.data;
};

export const fetchFavoriteTvs = async (userId) => {
    const res = await tvApi.get(`/${userId}`);
    return res.data;
};
