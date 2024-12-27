import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <h1 className="text-blue-600 text-2xl font-poppins">AKS</h1>
          <p className="text-blue-500 text-2xl mt-1 font-poppins">TUR</p>
        </div>
        <ul className="flex space-x-4">
          <li className="text-orange-400 hover:underline">Home</li>
          <li className="text-orange-400 hover:underline">Destinos</li>
          <li className="text-orange-400 hover:underline">Serviços</li>
          <li className="text-orange-400 hover:underline">Contato</li>
          <li className="text-orange-400 hover:underline">Social</li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
