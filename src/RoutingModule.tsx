import { createBrowserRouter, RouterProvider } from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import SignupPage from "./pages/SignupPage"

const RoutingModule = () => {
    const route = createBrowserRouter([
        {
            path: '',
            element: <LoginPage />
        },
        {
            path: '/signup',
            element: <SignupPage />
        }
    ]);

    return (
        <RouterProvider router={route} />
    )
}

export default RoutingModule;