import { createBrowserRouter, RouterProvider } from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import SignupPage from "./pages/SignupPage"
import HomePage from "./pages/HomePage"

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
        }
    ]);

    return (
        <RouterProvider router={route} />
    )
}

export default RoutingModule;