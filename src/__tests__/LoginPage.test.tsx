import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import "@testing-library/jest-dom";
import { expect, test, vi } from "vitest";

vi.mock('../utils/API', () => ({
    loginUser: vi.fn()
}))

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

