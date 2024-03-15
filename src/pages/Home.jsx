import React, { useEffect } from "react";
import Navbar from "../components/Navbar";

export default function () {
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const verifyToken = async () => {
      const res = await fetch(
        `http://lcoalhost:3000/users/admin/verify/${token}`
      );
    };
    verifyToken();
  }, []);

  useEffect(() => {
    const fetchMobileImages = async () => {
      const res = await fetch(`http://localhost:3000/carousels`, {
        method: "GET",
      });
      const data = await res.json();
      data.forEach((element) => {
        if (element.mobile) {
          console.log(element);
        }
      });

      fetchMobileImages();
    };
  },[]);

  return (
    <>
      <Navbar />
    </>
  );
}
