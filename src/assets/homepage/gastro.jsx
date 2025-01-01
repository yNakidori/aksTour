import React from "react";
import RecipeList from "./foodCard";

const Gastro = () => {
  return (
    <>
      <div className="text-center mt-10">
        <h1 className="text-3xl font-bold text-gray-800">
          Turismo Gastronômico
        </h1>
        <div className="h-1 w-16 bg-lime-500 mx-auto mt-2"></div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-8">
        <RecipeList />
      </div>
    </>
  );
};

export default Gastro;
