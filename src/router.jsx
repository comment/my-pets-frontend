import {createBrowserRouter} from "react-router-dom";
import Login from "./views/login";
import Register from "./views/register";
import DefaultLayout from "./Components/DefaultLayout.jsx";
import GuestLayout from "./Components/GuestLayout.jsx";
import Users from "./views/users.jsx";
import UserForm from "./views/UserForm";
import Pets from "./views/pets";
import PetForm from "./views/PetForm.jsx";
import Roles from "./views/roles";
import RoleForm from "./views/RoleForm";

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
            },
            {
                path: "pets",
                element: <Pets />,
            },
            {
                path: "pets/new",
                element: <PetForm key="PetCreate" />,
            },
            {
                path: "pets/:id",
                element: <PetForm key="PetUpdate" />,
            },
            {
                path: "roles",
                element: <Roles />,
            },
            {
                path: "roles/new",
                element: <RoleForm key="RoleCreate" />,
            },
            {
                path: "roles/:id",
                element: <RoleForm key="RoleUpdate" />,
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