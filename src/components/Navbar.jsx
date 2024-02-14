import React from "react";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import img1 from "../assets/curelli_logo.webp";

export default function Navbar() {

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
              location.pathname === "/add"
                ? "text-[#6b986a]"
                : "hover:text-[#6b986a] text-white"
            }`}
          >
            <Link to={`/add`}>Add</Link>
          </div>
          <div
            className={` text-[16px] ${
              location.pathname === "/view"
                ? "text-[#6b986a]"
                : "hover:text-[#6b986a] text-white"
            }`}
          >
            <Link to={`/view`}>View</Link>
          </div>
          <div
            className={` text-[16px] ${
              location.pathname === "/carousel"
                ? "text-[#6b986a]"
                : "hover:text-[#6b986a] text-white"
            }`}
          >
            <Link to={`/carousel`}>Carousel</Link>
          </div>
          <div
            className={`text-[16px] ${
              location.pathname === "/contact"
                ? "text-[#6b986a]"
                : "hover:text-[#6b986a] text-white"
            }`}
          >
            <Link to={`/contact`}>Contact</Link>
          </div>
        </div>
        {/* <div className="flex items-center gap-2 justify-center">
          <Link to="/cart">
            <img className="w-[30px] h-[30px]" alt="Shopping cart" src={img1} />
          </Link>
          {isUserIdPresent ? (
            <Dropdown />
          ) : (
            <div className="text-white text-[14px] border-white border-2 p-1 rounded hover:bg-white hover:text-black">
              <Link to="/login">Login</Link>
            </div>
          )}
        </div> */}
      </div>
    </div>
  );
}
