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

const palette = {
  navy: "#0E2C45",
  gold: "#B78E46",
  pale: "#F6FBF8",
  subtle: "#E6F0EC",
};

const benefits = [
  {
    icon: "🚌",
    titulo: "Conforto e Segurança",
    desc: "Ônibus modernos, confortáveis e com motoristas experientes em todas as rotas.",
  },
  {
    icon: "💰",
    titulo: "Preço que Cabe no Bolso",
    desc: "Viagens acessíveis com opções para todos os perfis e orçamentos.",
  },
  {
    icon: "🕐",
    titulo: "Horários Flexíveis",
    desc: "Escolha o melhor dia e horário para você e deixe o resto com a gente.",
  },
];

const destinations = [
  {
    nome: "Campos do Jordão",
    img: campos,
    desc: "A Suíça brasileira com clima ameno e charme nas montanhas.",
    tag: "Montanhas",
  },
  {
    nome: "Aparecida",
    img: aparecida,
    desc: "O maior centro de fé do Brasil, perfeito para um bate-volta espiritual.",
    tag: "Religioso",
  },
  {
    nome: "Santos",
    img: santos,
    desc: "Praias, museus e história a apenas 1h30 da capital.",
    tag: "Praia",
  },
];

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
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: palette.pale }}
    >
      <Navbar />

      {/* Hero */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <img
          src={bus}
          alt="Ônibus de viagem"
          className="absolute inset-0 w-full h-full object-cover"
        />
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
            Viagens Rodoviárias
          </span>
          <h1
            className="text-5xl sm:text-6xl font-extrabold mb-6 leading-tight"
            style={{ color: palette.pale }}
          >
            Viajar de ônibus nunca{" "}
            <span style={{ color: palette.gold }}>foi tão fácil</span>
          </h1>
          <p
            className="text-lg max-w-2xl mx-auto leading-relaxed"
            style={{ color: palette.subtle }}
          >
            A AKSTUR leva você com conforto e praticidade para destinos
            incríveis a poucas horas de São Paulo.
          </p>
          <div className="mt-10 flex flex-wrap gap-4 justify-center">
            <button
              onClick={handleWhatsAppClick}
              className="px-8 py-3.5 rounded-xl font-semibold text-base transition-all duration-200 hover:opacity-90 shadow-lg"
              style={{ backgroundColor: palette.gold, color: palette.pale }}
            >
              Solicitar Viagem
            </button>
            <a
              href="#routes"
              className="px-8 py-3.5 rounded-xl font-medium text-base transition-all duration-200 border"
              style={{ borderColor: `${palette.pale}40`, color: palette.pale }}
            >
              Ver Rotas
            </a>
          </div>
        </div>
      </section>

      {/* Destinos */}
      <section
        className="py-20 px-6"
        style={{ backgroundColor: palette.subtle }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span
              className="text-sm font-semibold uppercase tracking-widest"
              style={{ color: palette.gold }}
            >
              Pertinho de São Paulo
            </span>
            <h2
              className="text-4xl font-bold mt-3"
              style={{ color: palette.navy }}
            >
              Destinos em Destaque
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {destinations.map((destino, index) => (
              <div
                key={index}
                className="group rounded-2xl overflow-hidden border transition-all duration-300 hover:-translate-y-1"
                style={{
                  backgroundColor: "white",
                  borderColor: `${palette.navy}15`,
                  boxShadow: "0 4px 24px rgba(14,44,69,0.08)",
                }}
              >
                <div className="relative overflow-hidden h-48">
                  <img
                    src={destino.img}
                    alt={destino.nome}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span
                    className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide"
                    style={{
                      backgroundColor: `${palette.gold}ee`,
                      color: "white",
                    }}
                  >
                    {destino.tag}
                  </span>
                </div>
                <div className="p-6">
                  <h3
                    className="text-lg font-bold mb-1"
                    style={{ color: palette.navy }}
                  >
                    {destino.nome}
                  </h3>
                  <div
                    className="w-10 h-0.5 rounded-full mb-3"
                    style={{ backgroundColor: palette.gold }}
                  />
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: `${palette.navy}99` }}
                  >
                    {destino.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ofertas Rodoviárias */}
      <section
        id="routes"
        className="py-20 px-6"
        style={{ backgroundColor: palette.pale }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span
              className="text-sm font-semibold uppercase tracking-widest"
              style={{ color: palette.gold }}
            >
              Confira nossas rotas
            </span>
            <h2
              className="text-4xl font-bold mt-3"
              style={{ color: palette.navy }}
            >
              Ofertas Rodoviárias
            </h2>
          </div>
          <BusRouteCard />
        </div>
      </section>

      {/* Benefícios */}
      <section
        className="py-20 px-6"
        style={{ backgroundColor: palette.subtle }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span
              className="text-sm font-semibold uppercase tracking-widest"
              style={{ color: palette.gold }}
            >
              Nossas vantagens
            </span>
            <h2
              className="text-4xl font-bold mt-3"
              style={{ color: palette.navy }}
            >
              Por que escolher a AKSTUR?
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {benefits.map((b, index) => (
              <div
                key={index}
                className="group rounded-2xl p-8 border transition-all duration-300"
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
                  {b.icon}
                </div>
                <h3
                  className="text-lg font-semibold mb-3"
                  style={{ color: palette.navy }}
                >
                  {b.titulo}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: `${palette.navy}99` }}
                >
                  {b.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Como Funciona */}
      <section className="py-20 px-6" style={{ backgroundColor: palette.pale }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <span
              className="text-sm font-semibold uppercase tracking-widest"
              style={{ color: palette.gold }}
            >
              Simples e rápido
            </span>
            <h2
              className="text-4xl font-bold mt-3"
              style={{ color: palette.navy }}
            >
              Como funciona?
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                step: "01",
                title: "Escolha o destino",
                desc: "Selecione seu destino e as datas que preferir.",
              },
              {
                step: "02",
                title: "Receba as opções",
                desc: "Enviamos horários e valores disponíveis via WhatsApp.",
              },
              {
                step: "03",
                title: "Embarque tranquilo",
                desc: "Após a confirmação, cuidamos de tudo para você.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="rounded-2xl p-8 border text-center"
                style={{
                  backgroundColor: "white",
                  borderColor: `${palette.navy}15`,
                  boxShadow: "0 4px 20px rgba(14,44,69,0.06)",
                }}
              >
                <span
                  className="text-4xl font-extrabold"
                  style={{ color: `${palette.gold}55` }}
                >
                  {item.step}
                </span>
                <h3
                  className="text-lg font-semibold mt-3 mb-2"
                  style={{ color: palette.navy }}
                >
                  {item.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: `${palette.navy}99` }}
                >
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-20 px-6"
        style={{ backgroundColor: palette.subtle }}
      >
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
            🎁 Promoções Especiais
          </h2>
          <p className="mb-8 text-lg" style={{ color: palette.subtle }}>
            Descontos para viagens curtas saindo de São Paulo. Fale com a gente
            agora e garanta sua oferta!
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
