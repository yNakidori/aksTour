import React from "react";
import Navbar from "./assets/navbar";
import Footer from "./assets/footer";
import cruise from "./assets/images/cruise/cruzeiro.mp4";
import CruiseCard from "./assets/cruise/CruiseCard";

const Cruise = () => {
  return (
    <>
      <div className="relative min-h-screen">
        <Navbar />
        <div className="absolute top-0 left-0 w-full h-full -z-10">
          <video
            className="w-full h-full object-cover"
            src={cruise}
            autoPlay
            loop
            muted
          />
        </div>
        <CruiseCard />
      </div>
      <Footer />
    </>
  );
};

export default Cruise;
