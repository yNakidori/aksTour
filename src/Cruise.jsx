import React from "react";
import Navbar from "./assets/navbar";
import Footer from "./assets/footer";
import cruise from "./assets/images/cruise/cruzeiro.mp4";
import CruiseCard from "./assets/cruise/CruiseCard";
import Whats from "./assets/whats.json";
import Lottie from "react-lottie";

const Cruise = () => {
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
      <section className="bg-gray-50 py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-blue-900 mb-8">
            Por que escolher um cruzeiro?
          </h2>
          <div className="text-lg text-gray-700 space-y-6 text-justify max-w-4xl mx-auto">
            <p>
              Viajar de cruzeiro é uma das formas mais relaxantes e completas de
              explorar diversos destinos em uma única viagem. Com conforto de
              hotel 5 estrelas, gastronomia internacional, entretenimento a
              bordo e paisagens incríveis, você aproveita cada segundo, sem se
              preocupar com deslocamentos ou bagagens.
            </p>
            <p>
              É ideal para casais, famílias, grupos ou até mesmo para quem busca
              uma viagem solo segura e cheia de atividades. Dos mares tropicais
              do Caribe às rotas históricas da Europa, há sempre uma nova
              experiência esperando por você.
            </p>
          </div>
        </div>
      </section>

      {/* Nova Sessão: Tipos de Cruzeiros */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-blue-900 mb-8">
            Tipos de Cruzeiros
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
            {[
              {
                title: "Cruzeiro Romântico",
                description:
                  "Perfeito para casais em lua de mel ou datas especiais. Ambientes intimistas, jantares exclusivos e muito charme em alto mar.",
                icon: "💑",
              },
              {
                title: "Cruzeiro Familiar",
                description:
                  "Atividades para todas as idades, áreas infantis, parques aquáticos e entretenimento para garantir diversão em grupo.",
                icon: "👨‍👩‍👧‍👦",
              },
              {
                title: "Cruzeiro de Aventura",
                description:
                  "Para quem busca destinos exóticos e paisagens selvagens. Trilha, mergulho e excursões com emoção garantida.",
                icon: "🌋",
              },
              {
                title: "Cruzeiro de Luxo",
                description:
                  "O ápice da sofisticação. Cabines espaçosas, spas, restaurantes gourmet e atendimento premium a bordo.",
                icon: "🛳️",
              },
              {
                title: "Cruzeiro Temático",
                description:
                  "Experiências com temas como gastronomia, música, esportes ou cultura pop, para quem busca algo fora do comum.",
                icon: "🎭",
              },
              {
                title: "Mini Cruzeiros",
                description:
                  "Viagens rápidas de 2 a 5 dias, ideais para escapadas curtas sem abrir mão da experiência completa de cruzeiro.",
                icon: "⏱️",
              },
            ].map((type, index) => (
              <div
                key={index}
                className="rounded-xl bg-gray-100 p-6 shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="text-4xl mb-4 text-blue-700 text-center">
                  {type.icon}
                </div>
                <h3 className="text-xl font-semibold text-blue-900 mb-2">
                  {type.title}
                </h3>
                <p className="text-gray-700 text-sm">{type.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
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

      {/* Seção com carrossel de cruzeiros */}
      <section className="bg-blue-50 py-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-blue-900 mb-12">
            Nossos Cruzeiros
          </h2>
          <CruiseCard />
        </div>
      </section>

      {/* Botão WhatsApp */}
      <div
        className="fixed bottom-5 right-5 z-50"
        onClick={handleWhatsAppClick}
      >
        <Lottie options={defaultOptions} height={100} width={100} />
      </div>

      <Footer />
    </>
  );
};

export default Cruise;
