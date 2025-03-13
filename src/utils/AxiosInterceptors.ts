import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from "axios";

const axiosInstance: AxiosInstance = axios.create({
    baseURL: "https://bookstore.incubation.bridgelabz.com/bookstore_user",
});

axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        if (config.url !== "/login") {
            const token = localStorage.getItem("token");
            if (token) {
                config.headers = config.headers ?? {}; 
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => Promise.reject(error) 
);

axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
        if (response.config.url === "/login" && response.data?.result?.accessToken) {
            localStorage.setItem("token", response.data.result.accessToken);
        }
        return response;
    },
    (error) => {
        if (error.response?.status === 401) {
            console.error("Unauthorized! Redirecting to login.");
            localStorage.removeItem("token");
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
