import axiosInstance from "./AxiosInterceptors";

interface LoginResponse {
    success: boolean;
    message: string;
    result: {
        accessToken: string;
    };
}

export const loginUser = async (email: string, password: string): Promise<LoginResponse> => {
    try {
        const response = await axiosInstance.post<LoginResponse>("/login", { email, password });
        return response.data;
    }
    catch (error) {
        console.error("Login Failed", error);
        throw error;
    }
}

export const registerUser = async (email: string, password: string, phone: string, fullName: string) => {
    try {
        const response = await axiosInstance.post("/registration", { email, password, phone, fullName });
        return response.data;
    }
    catch (error) {
        console.error("Registration Failed", error);
        throw error;
    }
}

export const getAllBooks = async () => {
    try {
        const response = await axiosInstance.get("/get/book");
        return response.data;
    }
    catch (error) {
        console.error("Registration Failed", error);
        throw error;
    }
}
