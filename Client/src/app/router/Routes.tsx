import {createBrowserRouter} from "react-router";
import App from '../layouts/App.tsx';
import ChangePassword from "../../features/ChangePassword.tsx";
import { LoginPage } from "../../features/LoginPage.tsx";
import RegistrationPage from "../../features/RegistrationPage.tsx";
import  AdminBooksPage  from "../../features/AdminBooksPage.tsx";
import CreateBookPage from "../../features/CreateBook.tsx";
import AuthorsPage from "../../features/AuthorsPage.tsx";
import BookSection  from "../../features/BookSection.tsx";
import BookDetailsPage from "../../features/BookDetailsPage.tsx";
import AuthorDetailsPage from "../../features/AuthorDetailsPage.tsx";
import ResetPasswordPage from "../../features/ResetPasswordPage.tsx";
import ProtectedRoutes from "../components/ProtectedRoutes.tsx";
import ProfilePage from "../../features/ProfilePage.tsx";
import LandingPage from "../../features/LandingPage.tsx";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [

{
    index: true,
    element: <LandingPage/>

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

    element:<ProtectedRoutes allowedRoles={["SuperAdmin"]}/>,
    children:[
        {
            path:"booksAdmin",
            element:<AdminBooksPage/>,
        }
    ]
    },
    {
        element: <ProtectedRoutes/>,
        children:[
            {
    path: "change-password",
    element: <ChangePassword/>,
},
{
        path: "create-book",
        element: <CreateBookPage/>,
    },
    {
        path: "profile",
        element: <ProfilePage/>,
    }
        ]
    },
     {
    path:"books",
    element:<BookSection/>,
    },
    {
    path:"books/:id",
    element:<BookDetailsPage/>,
    },
    {
        path: "authors",
        element: <AuthorsPage/>,
    },
     {
        path: "authors/:id",
        element: <AuthorDetailsPage/>,
    },
    {
        path: "reset-password",
        element: <ResetPasswordPage/>,
    }
   ],
  },
]);