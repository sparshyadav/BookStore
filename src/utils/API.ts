import axios from 'axios';
const BASE_URL = "https://bookstore.incubation.bridgelabz.com/bookstore_user";

export const loginUser = async (email: string, password: string) => {
    try {
        const response = await axios.post(`${BASE_URL}/login`, { email, password });
        return response.data;
    }
    catch (error) {
        console.error("Login Failed", error);
        throw error;
    }
}

export const registerUser = async (email: string, password: string, phone: string, fullName: string) => {
    try {
        const response = await axios.post(`${BASE_URL}/registration`, { email, password, phone, fullName });
        return response.data;
    }
    catch (error) {
        console.error("Registration Failed", error);
        throw error;
    }
}

export const getAllBooks = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/get/book`);
        return response.data;
    }
    catch (error) {
        console.error("Fetching Books Failed", error);
        throw error;
    }
}

export const getBookReviews = async (bookId: string | undefined) => {
    try {
        const tokenData = JSON.parse(localStorage.getItem("token") || "null");
        const token = tokenData?.token;

        const response = await axios.get(`${BASE_URL}/get/feedback/${bookId}`, {
            headers: {
                "x-access-token": token
            }
        });

        return response.data;
    }
    catch (error) {
        console.error("Fetching Reviews Failed", error);
        throw error;
    }
};

export const addBookReviews = async (comment: string, rating: number, bookId: string | undefined) => {
    try {
        const tokenData = JSON.parse(localStorage.getItem("token") || "null");
        const token = tokenData?.token;

        const response = await axios.post(`${BASE_URL}/add/feedback/${bookId}`,
            { comment, rating },
            {
                headers: {
                    "x-access-token": token,
                    "Content-Type": "application/json"
                }
            }
        );

        return response.data;
    } catch (error) {
        console.error("Adding Reviews Failed", error);
        throw error;
    }
};


