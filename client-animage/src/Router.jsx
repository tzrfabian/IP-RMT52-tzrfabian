import { createBrowserRouter, redirect } from "react-router-dom";
import Login from "./pages/Login";
import RootLayout from "./RootLayout"
import Homepage from "./pages/Homepage";
import Register from "./pages/Register";
export const router = createBrowserRouter([
    {
        path: "/register",
        element: <Register/>
    },
    {
        path: "/login",
        element: <Login/>,
        loader: () => {
            const access_token = localStorage.getItem("access_token");
            if(access_token) {
                throw redirect('/');
            }
            return null;
        }
    },
    {
        path: "/",
        element: <RootLayout/>,
        loader: () => {
            const access_token = localStorage.getItem("access_token");
            if(access_token) {
                return null
            }
            throw redirect('/login');
        },
        children: [
            {
                path: "",
                index: true,
                element: <Homepage/>
            }
        ]
    }
]);