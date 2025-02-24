import React from "react";

const NationalCard = (imageUrl, title, date, duration, price) => {
  return (
    <div className="max-w-sm bg-white rounded-2xl shadow-lg overflow-hidden">
      <img
        className="w-full h-48 object-cover"
        src="https://source.unsplash.com/400x300/?rio-de-janeiro"
        alt="Rio de Janeiro"
      />
      <div className="p-4">
        <span className="bg-orange-600 text-white text-xs font-bold font-poppins px-3 py-1 rounded-full">
          Pacote
        </span>
        <h2 className="text-xl font-bold mt-2">Rio de Janeiro</h2>
        <p className="text-gray-600 flex items-center gap-1 mt-1">
          <span>✈️</span> 07 de Abr 2025 - 10 dias
        </p>
        <p className="text-gray-500 text-sm mt-3">Pacotes a partir de</p>
        <p className="text-2xl font-bold">R$ 735</p>
      </div>
    </div>
  );
};

export default NationalCard;
