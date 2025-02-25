import { createBrowserRouter } from "react-router-dom";

import { Userlayout } from "../layout/Userlayout";
import { Aboutpage } from "../pages/user/Aboutpage";
import { Productpage } from "../pages/user/Productpage";
import Homepage from "../pages/user/Homepage";
import { LoginPage } from "../pages/shared/LoginPage";
import { SignupPage } from "../pages/user/SignupPage";
import { CartPage } from "../pages/CartPage";
import PaymentSuccess from "../pages/user/PaymentPage";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <Userlayout/>,
        errorElement:<h1>Error page</h1>,
        children :[
            {
                path:"",
                element:<Homepage/>
            },
            {
                path: "about",
                element: <Aboutpage/>
            },
            {
                path:"product",
                element:<Productpage/>
            },
            {
                path:"cart",
                element:<CartPage/>
            },
            {
                path:"payment/success",
                element:<PaymentSuccess />
            },
            {
                path:"login",
                element:<LoginPage/>
            },
            {
                path:"signup",
                element:<SignupPage/>
            }
        ]
    },
   
])

