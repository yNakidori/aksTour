import React from "react";
import Navbar from "./assets/navbar";
import Footer from "./assets/footer";
import cruise from "./assets/images/cruise/cruzeiro.mp4";
import CruiseCard from "./assets/cruise/CruiseCard";
import Whats from "./assets/whats.json";
import Lottie from "react-lottie";

const palette = {
  navy: "#0E2C45",
  gold: "#B78E46",
  pale: "#F6FBF8",
  subtle: "#E6F0EC",
};

const cruiseTypes = [
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
];

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
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: palette.pale }}
    >
      <Navbar />

      {/* Hero com vídeo de fundo */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src={cruise}
          autoPlay
          loop
          muted
        />
        {/* overlay navy com gradiente */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to bottom, ${palette.navy}cc 0%, ${palette.navy}99 60%, ${palette.navy}ee 100%)`,
          }}
        />
        <div className="relative max-w-4xl mx-auto text-center px-6">
          <span
            className="inline-block mb-4 px-4 py-1.5 rounded-full text-sm font-medium tracking-wide uppercase border"
            style={{
              borderColor: `${palette.gold}55`,
              backgroundColor: `${palette.gold}20`,
              color: palette.gold,
            }}
          >
            Cruzeiros Exclusivos
          </span>
          <h1
            className="text-5xl sm:text-6xl font-extrabold mb-6 leading-tight"
            style={{ color: palette.pale }}
          >
            Navegue pelo Mundo com{" "}
            <span style={{ color: palette.gold }}>Conforto e Estilo</span>
          </h1>
          <p
            className="text-lg max-w-2xl mx-auto leading-relaxed"
            style={{ color: palette.subtle }}
          >
            Descubra os melhores cruzeiros e viva experiências inesquecíveis em
            alto mar.
          </p>
          <div className="mt-10 flex flex-wrap gap-4 justify-center">
            <button
              onClick={handleWhatsAppClick}
              className="px-8 py-3.5 rounded-xl font-semibold text-base transition-all duration-200 hover:opacity-90 shadow-lg"
              style={{ backgroundColor: palette.gold, color: palette.pale }}
            >
              Solicitar Orçamento
            </button>
            <a
              href="#cruises"
              className="px-8 py-3.5 rounded-xl font-medium text-base transition-all duration-200 border"
              style={{ borderColor: `${palette.pale}40`, color: palette.pale }}
            >
              Ver Cruzeiros
            </a>
          </div>
        </div>
      </section>

      {/* Por que escolher */}
      <section
        className="py-20 px-6"
        style={{ backgroundColor: palette.subtle }}
      >
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span
              className="text-sm font-semibold uppercase tracking-widest"
              style={{ color: palette.gold }}
            >
              Por que nos escolher
            </span>
            <h2
              className="text-4xl font-bold mt-3 mb-6 leading-tight"
              style={{ color: palette.navy }}
            >
              Uma forma única de explorar o mundo
            </h2>
            <p
              className="leading-relaxed mb-4"
              style={{ color: `${palette.navy}bb` }}
            >
              Viajar de cruzeiro é uma das formas mais relaxantes e completas de
              explorar diversos destinos em uma única viagem. Com conforto de
              hotel 5 estrelas, gastronomia internacional e entretenimento a
              bordo, você aproveita cada segundo.
            </p>
            <p
              className="leading-relaxed"
              style={{ color: `${palette.navy}bb` }}
            >
              Ideal para casais, famílias ou viajantes solos que buscam
              segurança e experiências marcantes — dos mares tropicais do Caribe
              às rotas históricas da Europa.
            </p>
            <ul className="space-y-3 mt-6">
              {[
                "Destinos em todo o mundo",
                "Gastronomia internacional a bordo",
                "Entretenimento para todas as idades",
                "Suporte completo na contratação",
              ].map((item, i) => (
                <li
                  key={i}
                  className="flex items-center gap-3 text-sm"
                  style={{ color: palette.navy }}
                >
                  <span
                    className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 border"
                    style={{
                      backgroundColor: `${palette.gold}22`,
                      borderColor: `${palette.gold}55`,
                      color: palette.gold,
                    }}
                  >
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {["🌊 Caribe", "🏛️ Europa", "🌏 Ásia", "🧊 Ártico"].map(
              (item, i) => (
                <div
                  key={i}
                  className="rounded-2xl p-6 text-center transition-all duration-300 border"
                  style={{
                    backgroundColor: "white",
                    borderColor: `${palette.navy}18`,
                    color: palette.navy,
                    boxShadow: "0 2px 12px rgba(14,44,69,0.05)",
                  }}
                >
                  <p className="font-medium text-sm">{item}</p>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* Tipos de Cruzeiros */}
      <section className="py-20 px-6" style={{ backgroundColor: palette.pale }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span
              className="text-sm font-semibold uppercase tracking-widest"
              style={{ color: palette.gold }}
            >
              Para cada viajante
            </span>
            <h2
              className="text-4xl font-bold mt-3"
              style={{ color: palette.navy }}
            >
              Tipos de Cruzeiros
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cruiseTypes.map((type, index) => (
              <div
                key={index}
                className="group rounded-2xl p-8 transition-all duration-300 border"
                style={{
                  backgroundColor: "white",
                  borderColor: `${palette.navy}15`,
                  boxShadow: "0 4px 20px rgba(14,44,69,0.06)",
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform duration-300 border"
                  style={{
                    backgroundColor: `${palette.gold}18`,
                    borderColor: `${palette.gold}40`,
                  }}
                >
                  {type.icon}
                </div>
                <h3
                  className="text-lg font-semibold mb-3"
                  style={{ color: palette.navy }}
                >
                  {type.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: `${palette.navy}99` }}
                >
                  {type.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nossos Cruzeiros */}
      <section
        id="cruises"
        className="py-20 px-6"
        style={{ backgroundColor: palette.subtle }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span
              className="text-sm font-semibold uppercase tracking-widest"
              style={{ color: palette.gold }}
            >
              Ofertas selecionadas
            </span>
            <h2
              className="text-4xl font-bold mt-3"
              style={{ color: palette.navy }}
            >
              Nossos Cruzeiros
            </h2>
          </div>
          <CruiseCard />
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6" style={{ backgroundColor: palette.pale }}>
        <div
          className="max-w-3xl mx-auto text-center rounded-3xl px-8 py-16 border"
          style={{
            backgroundColor: palette.navy,
            borderColor: `${palette.gold}35`,
            boxShadow: "0 20px 60px rgba(14,44,69,0.15)",
          }}
        >
          <h2
            className="text-4xl font-bold mb-4"
            style={{ color: palette.pale }}
          >
            Pronto para zarpar?
          </h2>
          <p className="mb-8 text-lg" style={{ color: palette.subtle }}>
            Fale com nossos especialistas e encontre o cruzeiro perfeito para
            você.
          </p>
          <button
            onClick={handleWhatsAppClick}
            className="px-10 py-4 rounded-xl font-bold text-base transition-all duration-200 hover:opacity-90"
            style={{ backgroundColor: palette.gold, color: palette.pale }}
          >
            Falar no WhatsApp
          </button>
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
    </div>
  );
};

export default Cruise;
