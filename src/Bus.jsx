import React from "react";
import Navbar from "./assets/navbar";
import Footer from "./assets/footer";
import bus from "./assets/images/bus/onibus.png";
import foz from "./assets/images/bus/foz.png";
import gramado from "./assets/images/bus/gramado.png";
import rio from "./assets/images/bus/rio.png";

const Bus = () => {
  return (
    <div>
      <Navbar />
      <div
        className="relative min-h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${bus})` }}
      >
        {/* Seção de Destinos Populares */}
        <div className="container mx-auto px-6 py-12">
          <h2 className="text-4xl font-bold text-center text-black">
            🌍 Destinos Populares
          </h2>
          <div className="grid grid-cols-3 gap-6 mt-8">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-xl font-bold">Rio de Janeiro</h3>
              <img src={rio} alt="rio" className="w-full rounded-lg"></img>
              <p>Praias, Cristo Redentor e muito mais!</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-xl font-bold">Foz do Iguaçu</h3>
              <img src={foz} alt="foz" className="w-full rounded-lg"></img>
              <p>Desfrute das incríveis Cataratas do Iguaçu.</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-xl font-bold">Gramado</h3>
              <img
                src={gramado}
                alt="gramado"
                className="w-full rounded-lg"
              ></img>
              <p>O charme europeu do sul do Brasil.</p>
            </div>
          </div>
        </div>

        {/* Seção de Benefícios */}
        <div className="container mx-auto px-6 py-12">
          <h2 className="text-4xl font-bold text-center text-black">
            💼 Benefícios da Viagem de Ônibus
          </h2>
          <ul className="list-disc mt-4 ml-8 text-lg text-gray-700">
            <li>Maior conforto e segurança</li>
            <li>Economia em comparação com viagens aéreas</li>
            <li>Mais flexibilidade de horários</li>
          </ul>
        </div>

        {/* Seção de Promoções */}
        <div className="container mx-auto px-6 py-12 bg-yellow-100 rounded-lg text-center">
          <h2 className="text-4xl font-bold text-black">
            🔥 Ofertas e Promoções
          </h2>
          <p className="text-xl text-gray-700 mt-4">
            Descontos de até 30% para viagens no final de semana!
          </p>
        </div>

        {/* Seção Como Funciona */}
        <div className="container mx-auto px-6 py-12">
          <h2 className="text-4xl font-bold text-center text-black">
            🚌 Como Funciona
          </h2>
          <ol className="list-decimal mt-4 ml-8 text-lg text-gray-700">
            <li>Escolha seu destino e data</li>
            <li>Selecione a categoria do ônibus</li>
            <li>Finalize a compra e receba seu bilhete digital</li>
          </ol>
        </div>

        {/* Seção de Depoimentos */}
        <div className="container mx-auto px-6 py-12 bg-gray-100 rounded-lg text-center">
          <h2 className="text-4xl font-bold text-black">
            ⭐ Depoimentos de Viajantes
          </h2>
          <p className="italic mt-4">
            "Viajar com a AKS foi incrível! Ônibus confortável e pontual." -
            Maria S.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Bus;
