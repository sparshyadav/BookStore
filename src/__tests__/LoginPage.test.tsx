import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import "@testing-library/jest-dom";
import { expect, test, vi } from "vitest";
import { loginUser } from "../utils/API";
import { toast } from "react-toastify";

vi.mock("../utils/API", () => ({
    loginUser: vi.fn().mockResolvedValue({ result: { accessToken: "fakeToken123" } })
}));


vi.mock("react-toastify", () => ({
    toast: {
        success: vi.fn(),
        error: vi.fn()
    }
}));

const setup = () => {
    return render(
        <MemoryRouter>
            <LoginPage />
        </MemoryRouter>
    );
};

test("renders login page with required elements", () => {
    setup();

    expect(screen.getByPlaceholderText("Enter email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter password")).toBeInTheDocument();

    expect(screen.getByRole("button", { name: /Login/i })).toBeInTheDocument();
    expect(screen.getByText("SIGNUP")).toBeInTheDocument();
    expect(screen.getByText("Forgot Password")).toBeInTheDocument();

    expect(screen.getByText("Facebook")).toBeInTheDocument();
    expect(screen.getByText("Google")).toBeInTheDocument();
});

test("shows error for invalid email format", async () => {
    setup();

    const emailInput = screen.getByPlaceholderText("Enter email") as HTMLInputElement;
    const loginButton = screen.getByRole("button", { name: /Login/i });

    fireEvent.change(emailInput, { target: { value: "invalid-email" } });
    fireEvent.click(loginButton);

    expect(await screen.findByText("Enter a valid email address.")).toBeInTheDocument();
});

test("shows error for password less than 6 characters", async () => {
    setup();

    const emailInput = screen.getByPlaceholderText("Enter email") as HTMLInputElement;
    const passwordInput = screen.getByPlaceholderText("Enter password") as HTMLInputElement;
    const loginButton = screen.getByRole("button", { name: /Login/i });

    fireEvent.change(emailInput, { target: { value: "test@gmail.com" } });
    fireEvent.change(passwordInput, { target: { value: "123" } });
    fireEvent.click(loginButton);

    expect(await screen.findByText("Password must be at least 6 characters.")).toBeInTheDocument();
});

test("successful login stores token and shows success toast", async () => {
    setup();
    const emailInput = screen.getByPlaceholderText("Enter email") as HTMLInputElement;
    const passwordInput = screen.getByPlaceholderText("Enter password") as HTMLInputElement;
    const loginButton = screen.getByRole("button", { name: /Login/i });

    vi.mocked(loginUser).mockResolvedValue({
        success: true,
        message: "Login successful",
        result: {
            accessToken: "fakeToken123"
        }
    });

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(loginButton);

    await waitFor(() => {
        expect(loginUser).toHaveBeenCalledWith("test@example.com", "password123");
        expect(localStorage.getItem("token")).toBe("fakeToken123");
        expect(toast.success).toHaveBeenCalledWith("Login Successfull 🎉");
    });
});


