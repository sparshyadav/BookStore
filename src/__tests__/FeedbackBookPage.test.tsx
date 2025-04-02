import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import FeedbackBookPage from "../components/FeedbackBookPage";
import { getBookReviews, addBookReviews } from "../utils/API";
import { MemoryRouter, Route, Routes } from "react-router-dom";

jest.mock("../utils/API", () => ({
    getBookReviews: jest.fn() as jest.Mock,
    addBookReviews: jest.fn() as jest.Mock,
}));

const mockReviews = [
    {
        approveComment: true,
        _id: "1",
        user_id: { _id: "u1", fullName: "John Doe" },
        product_id: "b1",
        comment: "Great book!",
        rating: 4,
        createdAt: "2025-04-01T12:00:00Z",
        updatedAt: "2025-04-01T12:00:00Z",
        __v: 0,
    },
];

describe("FeedbackBookPage", () => {
    beforeEach(() => {
        (getBookReviews as jest.Mock).mockResolvedValue({
            success: "true",
            message: "Success",
            result: mockReviews,
        });
    });

    test("renders feedback form and user reviews", async () => {
        render(
            <MemoryRouter initialEntries={["/feedback/b1"]}>
                <Routes>
                    <Route path="/feedback/:bookId" element={<FeedbackBookPage />} />
                </Routes>
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByText("Customer Feedback")).toBeInTheDocument();
            expect(screen.getByText("User Reviews")).toBeInTheDocument();
            expect(screen.getByText("Great book!")).toBeInTheDocument();
            expect(screen.getByText("John Doe")).toBeInTheDocument();
        });
    });

    test("allows users to submit a review", async () => {
        (addBookReviews as jest.Mock).mockResolvedValue({
            result: { ...mockReviews[0], comment: "Amazing read!", rating: 5 },
        });

        render(
            <MemoryRouter initialEntries={["/feedback/b1"]}>
                <Routes>
                    <Route path="/feedback/:bookId" element={<FeedbackBookPage />} />
                </Routes>
            </MemoryRouter>
        );

        fireEvent.change(screen.getByPlaceholderText("Write Your Review..."), {
            target: { value: "Amazing read!" },
        });

        fireEvent.click(screen.getByText("Submit"));

        await waitFor(() => {
            expect(screen.getByText("Amazing read!")).toBeInTheDocument();
        });
    });

    test("handles API error gracefully", async () => {
        const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => { });

        (getBookReviews as jest.Mock).mockRejectedValue(new Error("Failed to fetch"));

        render(
            <MemoryRouter initialEntries={["/feedback/b1"]}>
                <Routes>
                    <Route path="/feedback/:bookId" element={<FeedbackBookPage />} />
                </Routes>
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(consoleErrorSpy).toHaveBeenCalled();
        });

        consoleErrorSpy.mockRestore();
    });
});
