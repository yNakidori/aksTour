import React from "react";
import Navbar from "./assets/navbar";
import Footer from "./assets/footer";
import bus from "./assets/images/bus/onibus.png";
import foz from "./assets/images/bus/foz.png";
import gramado from "./assets/images/bus/gramado.png";
import rio from "./assets/images/bus/rio.png";
import Whats from "./assets/whats";
import Lottie from "react-lottie";

const Bus = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: Whats,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const whatsappNumber = "5511957700305";
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=Olá!`;

  const handleWhatsAppClick = () => {
    window.open(whatsappLink, "_blank");
  };

  return (
    <div>
      <Navbar />

      {/* Imagem de Apresentação */}
      <div className="relative">
        <img src={bus} alt="Ônibus" className="w-full h-auto object-cover" />
      </div>

      {/* Seção de Destinos Populares */}
      <div className="container mx-auto px-6 py-12">
        <h2 className="text-4xl mt-20 font-bold text-center text-black">
          🌍 Destinos Populares
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {[
            {
              nome: "Rio de Janeiro",
              img: rio,
              desc: "Praias, Cristo Redentor e muito mais!",
            },
            {
              nome: "Foz do Iguaçu",
              img: foz,
              desc: "Desfrute das incríveis Cataratas do Iguaçu.",
            },
            {
              nome: "Gramado",
              img: gramado,
              desc: "O charme europeu do sul do Brasil.",
            },
          ].map((destino, index) => (
            <div
              key={index}
              className="bg-white bg-opacity-75 p-4 rounded-lg shadow-md"
            >
              <h3 className="text-xl font-bold font-poppins">{destino.nome}</h3>
              <img
                src={destino.img}
                alt={destino.nome}
                className="w-full rounded-lg"
              />
              <p className="font-poppins">{destino.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Seção de Benefícios */}
      <div className="container mx-auto px-6 py-12">
        <h2 className="text-4xl font-bold text-center text-black">
          💼 Benefícios da Viagem de Ônibus com a AKS
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {[
            {
              img: "https://cdn-icons-png.flaticon.com/512/833/833593.png",
              titulo: "Maior Conforto e Segurança",
              desc: "Viaje com assentos espaçosos e aproveite um trajeto seguro e tranquilo.",
            },
            {
              img: "https://cdn-icons-png.flaticon.com/512/929/929564.png",
              titulo: "Economia Garantida",
              desc: "Passagens mais baratas que voos e opções flexíveis para o seu bolso.",
            },
            {
              img: "https://cdn-icons-png.flaticon.com/512/3135/3135706.png",
              titulo: "Mais Flexibilidade",
              desc: "Escolha entre vários horários e destinos sem burocracia.",
            },
          ].map((beneficio, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center text-center"
            >
              <img
                src={beneficio.img}
                alt={beneficio.titulo}
                className="w-16 h-16"
              />
              <h3 className="text-xl font-semibold mt-4">{beneficio.titulo}</h3>
              <p className="text-gray-600 mt-2">{beneficio.desc}</p>
            </div>
          ))}
        </div>
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
          <li>
            Realizamos toda a logística operacional para garantir uma
            experiência fantástica para você
          </li>
        </ol>
      </div>

      {/* Botão Flutuante do WhatsApp */}
      <div
        className="fixed bottom-5 right-5 z-50"
        onClick={handleWhatsAppClick}
      >
        <Lottie options={defaultOptions} height={100} width={100} />
      </div>

      <Footer />
    </div>
  );
};

export default Bus;
