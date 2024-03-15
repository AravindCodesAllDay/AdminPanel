import React from "react";
import AboutBanner from "../components/AboutBanner";
import AboutDetails from "../components/AboutDetails";
import AboutContact from "../components/AboutContact";
import Footer from "../components/Footer";
import Whatsapp from "../components/Whatsapp";

export default function AboutUs() {
  window.scrollTo(0, 0);
  return (
    <>
      <div className="sm:p-6 md:p-8 lg:p-10 xl:p-12 2xl:p-14 lg:bg-[#CDDCCB] sm:bg-white md:bg-white xl:bg-[#CDDCCB] 2xl:bg-[#CDDCCB]">
        <AboutBanner />
        <AboutDetails />
        <AboutContact />
      </div>
      <Footer />
      <Whatsapp />
    </>
  );
}