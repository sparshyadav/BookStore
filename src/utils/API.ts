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