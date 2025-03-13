import { createBrowserRouter, RouterProvider } from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import SignupPage from "./pages/SignupPage"
import HomePage from "./pages/HomePage"
import BookPage from "./pages/BookPage"
import ForgotPassword from "./pages/ForgotPassword"
import WishlistPage from "./pages/WishlistPage"
import PleaseLoginPage from "./pages/PleaseLoginPage"
import MyCartPage from "./pages/MyCartPage"
import OrderConfirmPage from "./pages/OrderConfirmPage"

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
        },
        {
            path: '/bookpage/:bookId',
            element: <BookPage />
        },
        {
            path: '/forgotpassword',
            element: <ForgotPassword />
        },
        {
            path: '/wishlist',
            element: <WishlistPage />
        },
        {
            path: '/pleaselogin',
            element: <PleaseLoginPage />
        },
        {
            path: '/mycart',
            element: <MyCartPage />
        },
        {
            path: 'orderconfirm',
            element: <OrderConfirmPage />
        }
    ]);

    return (
        <RouterProvider router={route} />
    )
}

export default RoutingModule;