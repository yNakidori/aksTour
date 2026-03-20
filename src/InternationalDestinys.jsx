import React from "react";
import Navbar from "./assets/navbar";
import Footer from "./assets/footer";
import turquia from "./assets/images/turquia.jpg";
import InternationalCard from "./assets/destinys/internationalCard";
import Services from "./assets/destinys/services";
import Whats from "./assets/whats.json";
import Lottie from "react-lottie";

const palette = {
  navy: "#0E2C45",
  gold: "#B78E46",
  pale: "#F6FBF8",
  subtle: "#E6F0EC",
};

const InternationalDestinys = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: Whats,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const whatsappNumber = "5511957700305";
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=Olá! Quero conhecer os destinos internacionais.`;

  const handleWhatsAppClick = () => {
    window.open(whatsappLink, "_blank");
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: palette.pale }}
    >
      <Navbar />

      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <img
          src={turquia}
          alt="Destinos internacionais"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to bottom, ${palette.navy}cc 0%, ${palette.navy}a8 55%, ${palette.navy}ee 100%)`,
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
            Mundo AKS
          </span>
          <h1
            className="text-5xl sm:text-6xl font-extrabold mb-6 leading-tight"
            style={{ color: palette.pale }}
          >
            Destinos <span style={{ color: palette.gold }}>Internacionais</span>
          </h1>
          <p
            className="text-lg max-w-2xl mx-auto leading-relaxed"
            style={{ color: palette.subtle }}
          >
            Descubra roteiros incríveis pelo mundo com curadoria especializada,
            suporte completo e experiências inesquecíveis.
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
              href="#internacionais"
              className="px-8 py-3.5 rounded-xl font-medium text-base transition-all duration-200 border"
              style={{ borderColor: `${palette.pale}40`, color: palette.pale }}
            >
              Ver Ofertas
            </a>
          </div>
        </div>
      </section>

      <section
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
              Pacotes Internacionais
            </h2>
            <p className="mt-3" style={{ color: `${palette.navy}aa` }}>
              Promoções exclusivas para as próximas temporadas.
            </p>
          </div>
          <div
            className="rounded-3xl p-3 md:p-8 border"
            style={{
              backgroundColor: "white",
              borderColor: `${palette.navy}15`,
              boxShadow: "0 12px 35px rgba(14,44,69,0.08)",
            }}
          >
            <InternationalCard filterType="package" />
          </div>
        </div>
      </section>

      <section className="py-20 px-6" style={{ backgroundColor: palette.pale }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span
              className="text-sm font-semibold uppercase tracking-widest"
              style={{ color: palette.gold }}
            >
              Passagens especiais
            </span>
            <h2
              className="text-4xl font-bold mt-3"
              style={{ color: palette.navy }}
            >
              Passagens Internacionais
            </h2>
            <p className="mt-3" style={{ color: `${palette.navy}aa` }}>
              Embarques com ótimos preços saindo de São Paulo.
            </p>
          </div>
          <div
            className="rounded-3xl p-3 md:p-8 border"
            style={{
              backgroundColor: "white",
              borderColor: `${palette.navy}15`,
              boxShadow: "0 12px 35px rgba(14,44,69,0.08)",
            }}
          >
            <InternationalCard filterType="ticket" />
          </div>
        </div>
      </section>

      <section
        id="internacionais"
        className="py-20 px-6"
        style={{ backgroundColor: palette.subtle }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span
              className="text-sm font-semibold uppercase tracking-widest"
              style={{ color: palette.gold }}
            >
              Suporte completo
            </span>
            <h2
              className="text-4xl font-bold mt-3"
              style={{ color: palette.navy }}
            >
              Serviços para sua viagem
            </h2>
          </div>
          <div
            className="rounded-3xl p-3 md:p-8 border"
            style={{
              backgroundColor: "white",
              borderColor: `${palette.navy}15`,
              boxShadow: "0 12px 35px rgba(14,44,69,0.08)",
            }}
          >
            <Services />
          </div>
        </div>
      </section>

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
            Pronto para explorar o mundo?
          </h2>
          <p className="mb-8 text-lg" style={{ color: palette.subtle }}>
            Fale com nossos especialistas e encontre o roteiro internacional
            ideal.
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

      <div
        className="fixed bottom-5 right-5 z-50 cursor-pointer"
        onClick={handleWhatsAppClick}
      >
        <Lottie options={defaultOptions} height={100} width={100} />
      </div>

      <Footer />
    </div>
  );
};

export default InternationalDestinys;
