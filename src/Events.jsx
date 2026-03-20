import React from "react";
import Navbar from "./assets/navbar";
import Footer from "./assets/footer";
import backgroundHero from "./assets/images/events/e3.png";
import EventTicketCard from "./assets/events/EventTicketCard";
import Whats from "./assets/whats.json";
import Lottie from "react-lottie";

const palette = {
  navy: "#0E2C45",
  gold: "#B78E46",
  pale: "#F6FBF8",
  subtle: "#E6F0EC",
};

const eventTypes = [
  {
    title: "Festivais e Shows",
    description:
      "Grandes atracoes musicais, experiencias imersivas e toda a energia dos eventos mais esperados do ano.",
    icon: "MUSICA",
  },
  {
    title: "Feiras e Exposicoes",
    description:
      "Negocios, inovacao, gastronomia e cultura reunidos em encontros que conectam pessoas e tendencias.",
    icon: "EXPO",
  },
  {
    title: "Eventos Esportivos",
    description:
      "Viva o clima das competicoes de perto com pacotes organizados e suporte completo do inicio ao fim.",
    icon: "SPORT",
  },
  {
    title: "Congressos e Imersoes",
    description:
      "Participe dos principais encontros profissionais com logistica estrategica e atendimento personalizado.",
    icon: "TALK",
  },
  {
    title: "Experiencias Premium",
    description:
      "Acesso diferenciado, roteiros especiais e conforto para transformar cada evento em uma memoria unica.",
    icon: "VIP",
  },
  {
    title: "Bate-volta Organizado",
    description:
      "Saidas rapidas e praticas para curtir grandes eventos sem se preocupar com transporte e planejamento.",
    icon: "TRIP",
  },
];

const includedBenefits = [
  "Ingressos e acessos facilitados",
  "Transporte confortavel e seguro",
  "Suporte antes, durante e depois",
  "Pacotes com hospedagem opcional",
];

const Events = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: Whats,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const whatsappNumber = "5511957700305";
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=Ola! Quero saber mais sobre eventos.`;

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
          src={backgroundHero}
          alt="Eventos em destaque"
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
            Agenda 2026
          </span>
          <h1
            className="text-5xl sm:text-6xl font-extrabold mb-6 leading-tight"
            style={{ color: palette.pale }}
          >
            Viva os Melhores{" "}
            <span style={{ color: palette.gold }}>Eventos</span>
          </h1>
          <p
            className="text-lg max-w-2xl mx-auto leading-relaxed"
            style={{ color: palette.subtle }}
          >
            Festivais, feiras, shows e experiencias unicas com a curadoria da
            nossa equipe para voce viajar sem preocupacoes.
          </p>
          <div className="mt-10 flex flex-wrap gap-4 justify-center">
            <button
              onClick={handleWhatsAppClick}
              className="px-8 py-3.5 rounded-xl font-semibold text-base transition-all duration-200 hover:opacity-90 shadow-lg"
              style={{ backgroundColor: palette.gold, color: palette.pale }}
            >
              Solicitar Orcamento
            </button>
            <a
              href="#eventos"
              className="px-8 py-3.5 rounded-xl font-medium text-base transition-all duration-200 border"
              style={{ borderColor: `${palette.pale}40`, color: palette.pale }}
            >
              Ver Eventos
            </a>
          </div>
        </div>
      </section>

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
              Por que escolher
            </span>
            <h2
              className="text-4xl font-bold mt-3 mb-6 leading-tight"
              style={{ color: palette.navy }}
            >
              Eventos com organizacao premium
            </h2>
            <p
              className="leading-relaxed mb-4"
              style={{ color: `${palette.navy}bb` }}
            >
              Cuidamos de cada detalhe da sua experiencia, desde o planejamento
              da viagem ate a entrada no evento. Tudo pensado para voce
              aproveitar com seguranca, conforto e praticidade.
            </p>
            <p
              className="leading-relaxed"
              style={{ color: `${palette.navy}bb` }}
            >
              Seja para curtir um grande show, participar de uma feira
              importante ou viver uma experiencia cultural exclusiva, voce conta
              com suporte completo em todas as etapas.
            </p>
            <ul className="space-y-3 mt-6">
              {includedBenefits.map((item) => (
                <li
                  key={item}
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
                    +
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {["Musica", "Negocios", "Esportes", "Cultura"].map((item) => (
              <div
                key={item}
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
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6" style={{ backgroundColor: palette.pale }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span
              className="text-sm font-semibold uppercase tracking-widest"
              style={{ color: palette.gold }}
            >
              Para cada perfil
            </span>
            <h2
              className="text-4xl font-bold mt-3"
              style={{ color: palette.navy }}
            >
              Tipos de Eventos
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {eventTypes.map((type) => (
              <div
                key={type.title}
                className="group rounded-2xl p-8 transition-all duration-300 border"
                style={{
                  backgroundColor: "white",
                  borderColor: `${palette.navy}15`,
                  boxShadow: "0 4px 20px rgba(14,44,69,0.06)",
                }}
              >
                <div
                  className="h-12 min-w-12 px-3 rounded-xl flex items-center justify-center text-xs mb-6 font-semibold tracking-wide group-hover:scale-105 transition-transform duration-300 border"
                  style={{
                    backgroundColor: `${palette.gold}18`,
                    borderColor: `${palette.gold}40`,
                    color: palette.navy,
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

      <section
        id="eventos"
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
              Eventos em Destaque
            </h2>
          </div>
          <EventTicketCard />
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
            Pronto para o proximo evento?
          </h2>
          <p className="mb-8 text-lg" style={{ color: palette.subtle }}>
            Fale com nosso time e monte o pacote ideal para curtir sua proxima
            experiencia ao vivo.
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

export default Events;
