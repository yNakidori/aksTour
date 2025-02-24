import React from "react";
import Navbar from "./assets/navbar";
import Footer from "./assets/footer";
import lencois from "./assets/images/lencois.png";
import NationalCard from "./assets/destinys/nationalCard";

const LocalDestinys = () => {
  return (
    <div>
      <Navbar />
      <div
        className="relative min-h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${lencois})` }}
      >
        <div className="container mx-auto relative z-10"></div>
      </div>
      <Footer />
    </div>
  );
};

export default LocalDestinys;
