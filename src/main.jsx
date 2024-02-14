import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, Router, RouterProvider } from "react-router-dom";
import "./index.css";
import WelcomePage from "./pages/WelcomePage.jsx";
import NoPage from "./pages/NoPage.jsx";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import UpdateProduct from "./pages/Update.jsx";
import GridData from "./components/GridData.jsx";
import Addproduct from "./pages/Addproduct.jsx";
import ViewProducts from "./pages/ViewProducts.jsx";
import CarouselImg from "./pages/CarouselImg.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <WelcomePage />,
  },
  {
    path: "/view",
    element: <ViewProducts />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/update/:_id",
    element: <UpdateProduct />,
  },
  {
    path: "/add",
    element: <Addproduct/>,
  },
  {
    path: "/home",
    element: <ViewProducts/>,
  },
  {
    path: "/carousel",
    element: <CarouselImg/>,
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
