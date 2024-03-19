import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import WelcomePage from "./pages/WelcomePage.jsx";
import NoPage from "./pages/NoPage.jsx";
import Login from "./pages/Login.jsx";
import UpdateProduct from "./pages/Update.jsx";
import Addproduct from "./pages/Addproduct.jsx";
import ViewProducts from "./pages/ViewProducts.jsx";
import CarouselImg from "./pages/CarouselImg.jsx";
import ViewUsers from "./pages/ViewUsers.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/viewproducts",
    element: <ViewProducts />,
  },
  {
    path: "/update/:_id",
    element: <UpdateProduct />,
  },
  {
    path: "/viewusers",
    element: <ViewUsers />,
  },
  {
    path: "/add",
    element: <Addproduct />,
  },
  {
    path: "/carousel",
    element: <CarouselImg />,
  },
  {
    path: "*",
    element: <NoPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
