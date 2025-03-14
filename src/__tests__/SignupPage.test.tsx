import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import SignupPage from "../pages/SignupPage";
import "@testing-library/jest-dom";
import { expect, test, vi, beforeEach } from "vitest";

vi.mock("../utils/API", () => ({
    registerUser: vi.fn().mockResolvedValue({ message: "Signup successful" })
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
            <SignupPage />
        </MemoryRouter>
    );
};

beforeEach(() => {
    vi.clearAllMocks();
});

test("renders signup page with required elements", () => {
    setup();

    expect(screen.getByPlaceholderText("Enter Full Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter Password")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter Mobile Number")).toBeInTheDocument();

    expect(screen.getByRole("button", { name: /Signup/i })).toBeInTheDocument();
    expect(screen.getByText("LOGIN")).toBeInTheDocument();
});

test("shows error for invalid email format", async () => {
    setup();

    fireEvent.change(screen.getByPlaceholderText("Enter Email"), { target: { value: "invalid-email" } });
    fireEvent.change(screen.getByPlaceholderText("Enter Full Name"), { target: { value: "Valid Name" } });
    fireEvent.click(screen.getByRole("button", { name: /Signup/i }));

    expect(await screen.findByText("Enter a valid email address.")).toBeInTheDocument();
});

test("shows error for password less than 6 characters", async () => {
    setup();

    fireEvent.change(screen.getByPlaceholderText("Enter Email"), { target: { value: "valid@gmail.com" } });
    fireEvent.change(screen.getByPlaceholderText("Enter Full Name"), { target: { value: "Valid Name" } });
    fireEvent.change(screen.getByPlaceholderText("Enter Password"), { target: { value: "123" } });
    fireEvent.click(screen.getByRole("button", { name: /Signup/i }));

    expect(await screen.findByText("Password must be at least 6 characters.")).toBeInTheDocument();
});