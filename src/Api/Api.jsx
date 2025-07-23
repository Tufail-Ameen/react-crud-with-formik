import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000/users',
});

export const getRegisterData = () => {
    return api.get('/');
}

export const registerUser = (userData) => {
    return api.post('/', userData);
}

export const deleteUser = (id) => {
    return api.delete(`/${id}`);
}

export default api;
