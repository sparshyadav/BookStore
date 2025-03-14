import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from "axios";

const axiosInstance: AxiosInstance = axios.create({
    baseURL: "https://bookstore.incubation.bridgelabz.com/bookstore_user",
});

const noAuthRoutes = ["/login", "/registration", "/get/books"];

axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        if (!noAuthRoutes.includes(config.url || "")) {
            const tokenData = JSON.parse(localStorage.getItem("token") || "{}");
            const token = tokenData.token;
            if (token) {
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
