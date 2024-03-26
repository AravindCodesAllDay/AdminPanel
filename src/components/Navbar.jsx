import React from "react";
import { Link, useLocation } from "react-router-dom";
import img1 from "../assets/Logo01.webp";

export default function Navbar() {
  const location = useLocation();
  return (
    <div className="flex flex-col items-center justify-center gap-[2px] relative bg-white">
      <div className="flex flex-col items-center justify-center gap-[10px] relative w-full max-w-[1440px]">
        <Link to="/">
          <img
            className="relative h-[100px] object-cover"
            alt="Image"
            src={img1}
          />
        </Link>
      </div>
      <div className="flex items-center justify-between px-4 lg:px-10 py-4 lg:py-13 relative w-full bg-[#40773b]">
        <div className="flex items-center gap-[16px] relative">
          <div
            className={`text-[16px] ${
              location.pathname === "/viewproducts"
                ? "text-[#6b986a]"
                : "hover:text-[#6b986a] text-white"
            }`}
          >
            <Link to={`/viewproducts`}>ViewProduct</Link>
          </div>
          <div
            className={`text-[16px] ${
              location.pathname === "/add"
                ? "text-[#6b986a]"
                : "hover:text-[#6b986a] text-white"
            }`}
          >
            <Link to={`/add`}>AddProduct</Link>
          </div>
          <div
            className={`text-[16px] ${
              location.pathname === "/viewusers"
                ? "text-[#6b986a]"
                : "hover:text-[#6b986a] text-white"
            }`}
          >
            <Link to={`/viewusers`}>ViewUsers</Link>
          </div>
          <div
            className={` text-[16px] ${
              location.pathname === "/carousel"
                ? "text-[#6b986a]"
                : "hover:text-[#6b986a] text-white"
            }`}
          >
            <Link to={`/carousel`}>ViewCarousel</Link>
          </div>
          <div
            className={` text-[16px] ${
              location.pathname === "/carousel"
                ? "text-[#6b986a]"
                : "hover:text-[#6b986a] text-white"
            }`}
          >
            <Link to={`/carousel`}>AddCarousel</Link>
          </div>{" "}
          <div
            className={` text-[16px] ${
              location.pathname === "/orders"
                ? "text-[#6b986a]"
                : "hover:text-[#6b986a] text-white"
            }`}
          >
            <Link to={`/orders`}>Orders</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
