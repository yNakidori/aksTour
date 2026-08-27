import React from "react";
import PricingCards from "./pricingCards";

const palette = {
  navy: "#0E2C45",
  gold: "#B78E46",
  pale: "#F6FBF8",
  subtle: "#E6F0EC",
};

const Featured = () => {
  return (
    <div className="py-20 px-6" style={{ backgroundColor: palette.pale }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <span
            className="text-sm font-semibold uppercase tracking-widest"
            style={{ color: palette.gold }}
          >
            Selecionadas para você
          </span>
          <h2
            className="text-4xl font-bold mt-3"
            style={{ color: palette.navy }}
          >
            Ofertas em Destaque
          </h2>
          <p className="mt-3" style={{ color: `${palette.navy}aa` }}>
            Explore nossas melhores promoções e pacotes especiais.
          </p>
        </div>
        <PricingCards />
      </div>
    </div>
  );
};

export default Featured;
