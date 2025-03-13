import { render, screen } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import { BrowserRouter } from "react-router-dom";
import SignupPage from "../pages/SignupPage";

describe("SignupPage Component", () => {
    test("renders Signup text", () => {
        render(
            <BrowserRouter>
                <SignupPage />
            </BrowserRouter>
        );
        expect(screen.getByRole("button", { name: /Signup/i })).toBeInTheDocument();
    });
});