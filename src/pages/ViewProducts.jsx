import React from "react";
import { useEffect } from "react";
import Navbar from "../components/Navbar";
import GridData from "../components/GridData";

export default function ViewProducts() {
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const verifyToken = async () => {
      const res = await fetch(
        `${import.meta.env.VITE_API}users/admin/verify/${token}`
      );
    };
    verifyToken();
  }, []);
  return (
    <>
      <Navbar />
      <div className="flex p-5 justify-center">
        <GridData />
      </div>
    </>
  );
}
