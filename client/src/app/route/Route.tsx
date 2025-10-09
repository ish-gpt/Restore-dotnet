import { createBrowserRouter, Navigate } from "react-router-dom";
import Catalog from "../../features/catalog/Catalog";
import ProductDetails from "../../features/catalog/ProductDetails";
import App from "../layout/App";
import AboutPage from "../../features/about/AboutPage";
import ContactPage from "../../features/contact/ContactPage";
import HomePage from "../../features/home/HomePage";
import ServerError from "../errors/ServerError";
import NotFound from "../errors/NotFound";
import BasketPage from "../../features/basket/BasketPage";
import Checkout from "../../features/checkout/Checkout";
import LoginForm from "../../features/acccount/LoginForm";
import RegisterForm from "../../features/acccount/RegisterForm";
import RequireAuth from "./RequireAuth";

export const router = createBrowserRouter([
    {
        path:'/',
        element: <App />,
        children: [
            {
                element:<RequireAuth></RequireAuth>, 
                children:[{
                    path:'checkout',
                    element: <Checkout/>
                }
            ]
            },
            {
                path:'catalog/:id',
                element: <ProductDetails/>
            },
            {
                path:'catalog',
                element: <Catalog/>
            },
            {
                path:'about',
                element: <AboutPage/>
            },
            {
                path:'contact',
                element: <ContactPage/>
            },
            {
                path:'basket',
                element: <BasketPage/>
            },
            {
                path:'home',
                element: <HomePage/>
            },
            {
                path:'server-error',
                element: <ServerError/>
            },
            {
                path:'not-found',
                element: <NotFound/>
            },
            {
                path:'/login',
                element: <LoginForm/>
            },
            {
                path:'/register',
                element: <RegisterForm/>
            },
            {
                path:'/',
                element: <HomePage/>
            },
            {
                path:'*',
                element: <Navigate replace to='/not-found'/>
            }
        ]
    }
]);