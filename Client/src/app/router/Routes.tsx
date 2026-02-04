import {createBrowserRouter} from "react-router";
import App from '../layouts/App.tsx';
import ChangePassword from "../../features/ChangePassword.tsx";
import { LoginPage } from "../../features/LoginPage.tsx";
import RegistrationPage from "../../features/RegistrationPage.tsx";
import  AdminBooksPage  from "../../features/AdminBooksPage.tsx";
import CreateBookPage from "../../features/CreateBook.tsx";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        // children: [
        //     {
        //         path:"change-password",
        //         element: <ChangePassword/>,
        //     }
        // ],

    },
{
    path: "change-password",
    element: <ChangePassword/>,
},
{
    path: "registration",
    element: <RegistrationPage/>,
},
{
    path: "login",
    element: <LoginPage/>,
},
    {
    path:"books",
    element:<AdminBooksPage/>,
    },
    {
        path: "create-book",
        element: <CreateBookPage/>,
    }
])