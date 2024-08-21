import axios from "axios";

const axiosClient = axios.create({
    baseURL: "http://127.0.0.1:80/api/v1/sanctum",
});

axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('ACCESS_TOKEN');
    config.headers.Authorization = `Bearer ${token}`;
    return config;
})

axiosClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        const {response} = error;
        if(error.status === 401) {
            localStorage.removeItem('ACCESS_TOKEN');
        }
        throw error;
    }
);

export default axiosClient;