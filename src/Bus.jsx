import React from "react";
import Navbar from "./assets/navbar";
import Footer from "./assets/footer";
import bus from "./assets/images/bus/onibus.png";
import campos from "./assets/images/bus/campos.png";
import aparecida from "./assets/images/bus/aparecida.png";
import santos from "./assets/images/bus/santos.png";
import Whats from "./assets/whats";
import Lottie from "react-lottie";
import BusRouteCard from "./assets/bus/BusRouteCard";

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
    <div className="bg-gray-50">
      <Navbar />

      {/* Banner */}
      <div className="relative">
        <img
          src={bus}
          alt="Ônibus de viagem"
          className="w-full h-auto object-cover"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-30 flex items-center justify-center">
          <h1 className="text-white text-4xl md:text-6xl font-bold drop-shadow-lg">
            Viajar de ônibus nunca foi tão fácil
          </h1>
        </div>
      </div>

      {/* Intro */}
      <section className="container mx-auto px-6 py-10 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Destinos pertinho de São Paulo
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Quer escapar da rotina sem ir longe? A AKS leva você com conforto e
          praticidade para destinos incríveis a poucas horas de São Paulo.
        </p>
      </section>

      {/* Destinos */}
      <section className="container mx-auto px-6 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              nome: "Campos do Jordão",
              img: campos,
              desc: "A Suíça brasileira com clima ameno e charme nas montanhas.",
            },
            {
              nome: "Aparecida",
              img: aparecida,
              desc: "O maior centro de fé do Brasil, perfeito para um bate-volta espiritual.",
            },
            {
              nome: "Santos",
              img: santos,
              desc: "Praias, museus e história a apenas 1h30 da capital.",
            },
          ].map((destino, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-md">
              <img
                src={destino.img}
                alt={destino.nome}
                className="rounded-md mb-4 w-full h-48 object-cover"
              />
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {destino.nome}
              </h3>
              <p className="text-gray-600">{destino.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Ofertas Rodoviárias
          </h2>
          <p className="text-gray-600 mb-10">
            Confira nossas ofertas de viagens rodoviárias e aproveite para
            conhecer novos destinos com conforto e segurança.
          </p>
          <BusRouteCard />
        </div>
      </section>

      {/* Benefícios */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-10">
            Por que escolher a AKStur?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                img: "https://cdn-icons-png.flaticon.com/512/833/833593.png",
                titulo: "Conforto e Segurança",
                desc: "Nossos parceiros oferecem ônibus modernos, confortáveis e com motoristas experientes.",
              },
              {
                img: "https://cdn-icons-png.flaticon.com/512/929/929564.png",
                titulo: "Preço que Cabe no Bolso",
                desc: "Viagens acessíveis com opções para todos os perfis.",
              },
              {
                img: "https://cdn-icons-png.flaticon.com/512/3135/3135706.png",
                titulo: "Horários Flexíveis",
                desc: "Escolha o melhor dia e horário para você e deixe o resto com a gente.",
              },
            ].map((beneficio, index) => (
              <div
                key={index}
                className="flex flex-col items-center bg-gray-50 p-6 rounded-lg shadow"
              >
                <img
                  src={beneficio.img}
                  alt={beneficio.titulo}
                  className="w-16 h-16 mb-4"
                />
                <h3 className="text-lg font-bold text-gray-800">
                  {beneficio.titulo}
                </h3>
                <p className="text-gray-600 mt-2">{beneficio.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Como Funciona */}
      <section className="container mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Como funciona?
        </h2>
        <ol className="text-gray-700 space-y-3 text-lg max-w-xl mx-auto list-decimal list-inside">
          <li>Você escolhe seu destino e datas.</li>
          <li>Enviamos as opções de horários e valores via WhatsApp.</li>
          <li>
            Após confirmação, cuidamos de tudo para você embarcar tranquilo.
          </li>
        </ol>
      </section>

      {/* Promoção */}
      <section className="bg-yellow-100 py-12 text-center">
        <h2 className="text-3xl font-bold text-gray-800">🎁 Promoções</h2>
        <p className="text-lg mt-4 text-gray-700">
          Descontos para viagens curtas saindo de São Paulo. Fale com a gente
          agora!
        </p>
      </section>

      {/* WhatsApp Flutuante */}
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
