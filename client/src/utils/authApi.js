import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000/api/auth",
    withCredentials: true,
});

export const registerUser = async (userData) => {
    const res = await api.post(`/register`, userData);
    return res.data;
};

export const loginUser = async (credentials) => {
    const res = await api.post(`/login`, credentials);
    return res.data;
};

export const fetchMe = async () => {
    const res = await api.get('/me');
    return res.data;
};

export const logoutUser = async () => {
    const res = await api.post('/logout');
    return res.data;
};
