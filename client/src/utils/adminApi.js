import axios from 'axios';

const adminApi = axios.create({
    baseURL: 'https://cinemax-zeta.vercel.app/api/admin',
    withCredentials: true,
});

// ------------- USERS -------------

export const fetchAllUsers = async () => {
    const res = await adminApi.get('/users');
    return res.data;
};

export const toggleUserBan = async (id) => {
    const res = await adminApi.patch(`/users/${id}/ban`);
    return res.data;
};

export const toggleUserRole = async (id) => {
    const res = await adminApi.patch(`/users/${id}/role`);
    return res.data;
};

export const deleteUser = async (id) => {
    const res = await adminApi.delete(`/users/${id}`);
    return res.data;
};

// ------------- CUSTOM MOVIES -------------

export const createCustomMovie = async (movieData) => {
    const res = await adminApi.post('/movies', movieData);
    return res.data;
};

export const fetchCustomMovies = async () => {
    const res = await adminApi.get('/movies');
    return res.data;
};

export const updateCustomMovie = async (id, movieData) => {
    const res = await adminApi.put(`/movies/${id}`, movieData);
    return res.data;
};

export const deleteCustomMovie = async (id) => {
    const res = await adminApi.delete(`/movies/${id}`);
    return res.data;
};

// ------------- CUSTOM TV SHOWS -------------

export const createCustomTvShow = async (tvData) => {
    const res = await adminApi.post('/tv', tvData);
    return res.data;
};

export const fetchCustomTvShows = async () => {
    const res = await adminApi.get('/tv');
    return res.data;
};

export const updateCustomTvShow = async (id, tvData) => {
    const res = await adminApi.put(`/tv/${id}`, tvData);
    return res.data;
};

export const deleteCustomTvShow = async (id) => {
    const res = await adminApi.delete(`/tv/${id}`);
    return res.data;
};
