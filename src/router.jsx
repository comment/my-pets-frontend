import {createBrowserRouter} from "react-router-dom";
import Login from "./views/login";
import Register from "./views/register";
import DefaultLayout from "./Components/DefaultLayout.jsx";
import GuestLayout from "./Components/GuestLayout.jsx";
import Users from "./views/users.jsx";
import UserForm from "./views/UserForm";

const router = createBrowserRouter([
    {
        path: "/",
        element: <DefaultLayout />,
        children: [
            {
                path: "users",
                element: <Users />,
            },
            {
                path: "users/new",
                element: <UserForm key="UserCreate" />,
            },
            {
                path: "users/:id",
                element: <UserForm key="UserUpdate" />,
            }
        ]
    },
    {
        path: "/",
        element: <GuestLayout />,
        children: [
            {
                path: "login",
                element: <Login />,
            },
            {
                path: "register",
                element: <Register />,
            }
        ]
    }

])

export default router;