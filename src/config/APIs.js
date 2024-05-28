import axios from "axios";

const BASE_URL = 'https://localhost:44303/';

export const endpoints = {
    'login': '/api/Auth/login',
    'register': '/api/Auth/register',
    'current_user': '/api/Auth/current_user',

    'category_create': '/api/Categories/create',
    'category': (id) => `/api/Categories/${id}`,
    'category_all': '/api/Categories/all',

    'shoes': '/api/Shoe', 
    'shoe_detail': (id) => `/api/Shoe/${id}`,
    'shoe_edit': '/api/Shoe/edit',
    'shoe_create': '/api/Shoe/create',

    'size': '/api/Size/create',
    'size_all': '/api/Size/all',
}

export const authApi = (accessToken) => axios.create({
    baseURL: "https://localhost:44303/",
    headers: {
        "Authorization": `Bearer ${accessToken}`
    }
})

export default axios.create({
    baseURL: BASE_URL
});