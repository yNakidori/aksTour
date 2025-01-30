import React from "react";
import Navbar from "./assets/navbar";
import Footer from "./assets/footer";

const Social = () => {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-4 bg-orange-200 h-screen w-screen">
        <h1 className="text-2xl font-bold text-center">Redes Sociais</h1>
        <p className="text-gray-500">Acompanhe-nos nas redes sociais</p>
      </div>
      <Footer />
    </div>
  );
};

export default Social;
