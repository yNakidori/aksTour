import React from "react";
import PricingCards from "./pricingCards";

const Featured = () => {
  return (
    <div>
      <div className="text-center mt-10 mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Confira aqu algumas das nossas ofertas!
        </h1>
        <div className="h-1 w-16 bg-green-600 mx-auto mt-2 mb-6"></div>
      </div>
      <PricingCards />
    </div>
  );
};

export default Featured;
