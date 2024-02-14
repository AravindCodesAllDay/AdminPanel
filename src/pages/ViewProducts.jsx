import React from "react";
import { useEffect } from "react";
import Navbar from "../components/Navbar";
import GridData from "../components/GridData";
import { useNavigate } from "react-router-dom";

export default function ViewProducts() {
  const nav = useNavigate();
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const verifyToken = async () => {
      const res = await fetch(
        `http://localhost:3000/users/admin/verify/${token}`
      );
      const data = await res.json();
      console.log(data.valid)
      if(!data.valid){
        nav("*")
      }
    };
    verifyToken()
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
