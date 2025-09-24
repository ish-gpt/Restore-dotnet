import { createBrowserRouter } from "react-router-dom";
import Catalog from "../../features/catalog/Catalog";
import ProductDetails from "../../features/catalog/ProductDetails";
import App from "../layout/App";
import AboutPage from "../../features/about/AboutPage";
import ContactPage from "../../features/contact/ContactPage";
import HomePage from "../../features/home/HomePage";

export const router = createBrowserRouter([
    {
        path:'/',
        element: <App />,
        children: [
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
                path:'home',
                element: <HomePage/>
            }
        ]
    }
]);