import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./pages/business/root";
import { useEffect } from "react";
import {useDispatch } from "react-redux";
import BusinessSignUp from "./pages/business/business-signup";
import { fetchCities } from "./store/citySlice";
import { fetchCategories } from "./store/categorySlice";
import { fetchServices } from "./store/serviceSlice";
const router = createBrowserRouter([
    {
        path: "/",
        element: <BusinessSignUp />,
        }
                
]);
function App() {
    const dispatch=useDispatch()
    useEffect(() => {
        dispatch(fetchCities());
        dispatch(fetchCategories())
        dispatch(fetchServices())
    }, [dispatch]);
    return (
            <RouterProvider router={router}></RouterProvider>
    );
}

export default App;
