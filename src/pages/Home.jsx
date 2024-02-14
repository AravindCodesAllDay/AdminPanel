import React, { useEffect } from "react";
import Navbar from "../components/Navbar";

export default function () {

  useEffect(()=>{
    const token =  sessionStorage.getItem('token');
    const verifyToken = async () => {
      const res = await fetch(`http://lcoalhost:3000/users/admin/verify/${token}`)
    }
  },[])
  return (
    <>
      <Navbar />
    </>
  );
}
