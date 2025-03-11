import { createBrowserRouter, RouterProvider } from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import SignupPage from "./pages/SignupPage"
import HomePage from "./pages/HomePage"
import BookPage from "./pages/BookPage"
import ForgotPassword from "./pages/ForgotPassword"

const RoutingModule = () => {
    const route = createBrowserRouter([
        {
            path: '',
            element: <LoginPage />
        },
        {
            path: '/signup',
            element: <SignupPage />
        },
        {
            path: '/home',
            element: <HomePage />
        }, {
            path: '/bookpage/:bookId',
            element: <BookPage />
        },
        {
            path: '/forgotpassword',
            element: <ForgotPassword />
        }
    ]);

    return (
        <RouterProvider router={route} />
    )
}

export default RoutingModule;