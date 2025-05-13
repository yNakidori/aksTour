import React from "react";
import Navbar from "./assets/navbar";
import Footer from "./assets/footer";
import cruise from "./assets/images/cruise/cruzeiro.mp4";
import CruiseCard from "./assets/cruise/CruiseCard";

const Cruise = () => {
  return (
    <>
      <Navbar />

      {/* HERO com vídeo de fundo e frase centralizada */}
      <div className="relative h-[80vh] flex items-center justify-center text-white text-center">
        <video
          className="absolute inset-0 w-full h-full object-cover -z-10"
          src={cruise}
          autoPlay
          loop
          muted
        />
        <div className="bg-black/40 backdrop-blur-sm p-6 rounded-xl max-w-2xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold">
            Navegue pelo Mundo com Conforto e Estilo
          </h1>
          <p className="mt-4 text-lg">
            Descubra os melhores cruzeiros e viva experiências inesquecíveis.
          </p>
        </div>
      </div>

      {/* Sessão Informativa */}
      <section className="bg-white py-16 px-6 text-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 uppercase tracking-wide">
            Por que escolher um cruzeiro?
          </h2>
          <p className="text-lg leading-relaxed text-justify">
            Viajar de cruzeiro é uma das formas mais relaxantes e completas de
            explorar diversos destinos em uma única viagem. Com conforto de
            hotel 5 estrelas, gastronomia internacional, entretenimento a bordo
            e paisagens incríveis, você aproveita cada segundo, sem se preocupar
            com deslocamentos ou bagagens.
          </p>
          <p className="mt-6 text-lg leading-relaxed text-justify">
            É ideal para casais, famílias, grupos ou até mesmo para quem busca
            uma viagem solo segura e cheia de atividades. Dos mares tropicais do
            Caribe às rotas históricas da Europa, há sempre uma nova experiência
            esperando por você.
          </p>
        </div>
      </section>

      {/* Seção com carrossel */}
      <section className="bg-[#c0d9f1] py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 uppercase tracking-wide">
            Nossos Cruzeiros
          </h2>
          <CruiseCard />
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Cruise;
