import React, { useRef, useState } from "react";

import Navbar from "./assets/navbar";

import InternationalCard from "./assets/destinys/internationalCard";
import NationalCard from "./assets/destinys/nationalCard";
import CruiseCard from "./assets/cruise/CruiseCard";
import BusRouteCard from "./assets/bus/BusRouteCard";
import EventTicketCard from "./assets/events/EventTicketCard";

import bannerVistos from "./assets/images/mainbanner.jpg";

import WhatsAppAssistant from "./assets/generic/WhatsAppAssistant";

const palette = {
  navy: "#0E2C45",
  gold: "#B78E46",
  pale: "#F6FBF8",
  subtle: "#E6F0EC",
};

const Services = () => {
  const assistantRef = useRef(null);
  const [openFaq, setOpenFaq] = useState(null);

  const handleWhatsAppClick = () => {
    assistantRef.current?.openChat();
  };

  const toggleFaq = (index) => {
    setOpenFaq((prev) => (prev === index ? null : index));
  };

  /*
   * ============================================================
   * SERVIÇOS
   * ============================================================
   */

  const serviceCategories = [
    {
      id: "pacotes",
      number: "01",
      title: "Pacotes Nacionais e Internacionais",
      description:
        "Encontre roteiros completos para viajar pelo Brasil ou explorar destinos internacionais.",
    },
    {
      id: "passagens",
      number: "02",
      title: "Passagens",
      description:
        "Opções de passagens nacionais e internacionais para você encontrar o melhor embarque.",
    },
    {
      id: "cruzeiros",
      number: "03",
      title: "Cruzeiros",
      description:
        "Experiências em alto mar para viagens românticas, familiares, de aventura ou luxo.",
    },
    {
      id: "rodoviario",
      number: "04",
      title: "Rodoviário",
      description: "Viagens de ônibus com conforto, segurança e praticidade.",
    },
    {
      id: "seguro",
      number: "05",
      title: "Seguro Viagem",
      description:
        "Proteção para você viajar com mais tranquilidade durante toda a sua experiência.",
    },
    {
      id: "transfer",
      number: "06",
      title: "Transfer",
      description:
        "Transporte organizado para facilitar seus deslocamentos durante a viagem.",
    },
    {
      id: "eventos",
      number: "07",
      title: "Eventos e Experiências",
      description: "Passeios, excursões, eventos e experiências selecionadas.",
    },
  ];

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
        "Para quem busca destinos exóticos e paisagens selvagens. Trilhas, mergulho e excursões.",
      icon: "🌋",
    },
    {
      title: "Cruzeiro de Luxo",
      description:
        "Cabines espaçosas, spas, restaurantes gourmet e atendimento premium a bordo.",
      icon: "🛳️",
    },
    {
      title: "Cruzeiro Temático",
      description:
        "Experiências com temas como gastronomia, música, esportes ou cultura pop.",
      icon: "🎭",
    },
    {
      title: "Mini Cruzeiros",
      description:
        "Viagens rápidas de 2 a 5 dias, ideais para escapadas curtas.",
      icon: "⏱️",
    },
  ];

  const busDestinations = [
    {
      title: "Campos do Jordão",
      description: "A Suíça brasileira com clima ameno e charme nas montanhas.",
      tag: "Montanhas",
    },
    {
      title: "Aparecida",
      description: "Destino perfeito para um bate-volta.",
      tag: "Religioso",
    },
    {
      title: "Santos",
      description: "Praias, museus e história a poucos quilômetros da capital.",
      tag: "Praia",
    },
  ];

  const eventTypes = [
    {
      title: "Passeios Culturais",
      description:
        "Roteiros imersivos em museus, centros históricos e experiências culturais guiadas.",
    },
    {
      title: "Excursões e Tours",
      description:
        "Saídas organizadas com transporte e guia para pontos turísticos e atrações locais.",
    },
    {
      title: "Passeios Esportivos",
      description:
        "Vivencie eventos esportivos e atividades ao ar livre com organização e suporte.",
    },
    {
      title: "Workshops e Imersões",
      description:
        "Experiências educativas e imersivas com curadoria e logística completa.",
    },
    {
      title: "Experiências Premium",
      description:
        "Roteiros exclusivos, acesso VIP e conforto para transformar cada passeio em uma memória única.",
    },
    {
      title: "Bate-volta Organizado",
      description:
        "Saídas rápidas e práticas para aproveitar atrações próximas sem se preocupar com transporte.",
    },
  ];

  const faqs = [
    {
      question: "Como funciona a contratação?",
      answer:
        "Você entra em contato com nossa equipe, informa o que precisa e recebe orientação sobre as melhores opções para sua viagem.",
    },
    {
      question: "Vocês trabalham com viagens nacionais e internacionais?",
      answer:
        "Sim. Trabalhamos com opções nacionais e internacionais, incluindo pacotes, passagens, cruzeiros, rodoviário e outros serviços.",
    },
    {
      question: "Posso montar uma viagem personalizada?",
      answer:
        "Sim. Nossa equipe pode ajudar a encontrar uma combinação de serviços adequada ao seu destino e ao seu perfil.",
    },
    {
      question: "Vocês oferecem seguro viagem?",
      answer:
        "Sim. Trabalhamos com seguro viagem para proporcionar mais tranquilidade durante sua experiência.",
    },
  ];

  return (
    <>
      <Navbar />

      <section
        id="services"
        className="relative overflow-hidden"
        style={{ backgroundColor: palette.pale }}
      >
        {/* HERO */}
        <div className="relative min-h-[500px] flex items-center overflow-hidden">
          <img
            src={bannerVistos}
            alt="Vistos e Passaportes"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Overlay para deixar o texto legível */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, rgba(246,251,248,0.98) 0%, rgba(246,251,248,0.92) 35%, rgba(246,251,248,0.55) 65%, rgba(246,251,248,0.15) 100%)",
            }}
          />

          <div className="relative max-w-7xl mx-auto w-full px-6 py-24">
            <div className="max-w-2xl">
              <span
                className="text-sm font-semibold uppercase tracking-[0.2em]"
                style={{ color: palette.gold }}
              >
                Mundo AKS
              </span>

              <h1
                className="text-5xl md:text-6xl font-bold mt-4 leading-[1.05]"
                style={{ color: palette.navy }}
              >
                Vistos &{" "}
                <span style={{ color: palette.gold }}>Passaportes</span>
              </h1>

              <p
                className="mt-6 text-lg md:text-xl leading-relaxed max-w-xl"
                style={{ color: `${palette.navy}b3` }}
              >
                Assessoria especializada para cuidar dos detalhes da sua viagem
                com segurança, praticidade e tranquilidade.
              </p>

              <button
                onClick={handleWhatsAppClick}
                className="mt-8 px-8 py-4 rounded-xl font-semibold transition-all duration-200 hover:opacity-90 shadow-lg"
                style={{
                  backgroundColor: palette.navy,
                  color: "white",
                }}
              >
                Falar com um especialista
              </button>
            </div>
          </div>
        </div>

        {/* CONTEÚDO DOS SERVIÇOS */}
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="max-w-3xl mb-16">
            <span
              className="text-sm font-semibold uppercase tracking-[0.2em]"
              style={{ color: palette.gold }}
            >
              Serviços
            </span>

            <h2
              className="text-4xl md:text-5xl font-bold mt-4 leading-tight"
              style={{ color: palette.navy }}
            >
              Tudo o que você precisa para{" "}
              <span style={{ color: palette.gold }}>viajar melhor.</span>
            </h2>

            <p
              className="mt-5 text-lg leading-relaxed max-w-2xl"
              style={{ color: `${palette.navy}99` }}
            >
              Da escolha do destino ao embarque, reunimos diferentes soluções
              para tornar o planejamento da sua viagem mais simples.
            </p>
          </div>

          {/* ==================================================
              ÍNDICE DE SERVIÇOS
          ================================================== */}

          <div
            className="border-t border-b"
            style={{ borderColor: `${palette.navy}18` }}
          >
            {serviceCategories.map((service) => (
              <a
                key={service.id}
                href={`#${service.id}`}
                className="group grid grid-cols-[55px_1fr_auto] md:grid-cols-[80px_1fr_2fr_auto] items-center gap-4 py-6 transition-all duration-200"
                style={{
                  borderBottom: `1px solid ${palette.navy}12`,
                }}
              >
                <span
                  className="text-sm font-semibold"
                  style={{ color: palette.gold }}
                >
                  {service.number}
                </span>

                <h3
                  className="text-lg md:text-xl font-semibold"
                  style={{ color: palette.navy }}
                >
                  {service.title}
                </h3>

                <p
                  className="hidden md:block text-sm"
                  style={{ color: `${palette.navy}88` }}
                >
                  {service.description}
                </p>

                <span
                  className="text-xl transition-transform duration-200 group-hover:translate-x-1"
                  style={{ color: palette.gold }}
                >
                  →
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================================
          PACOTES NACIONAIS E INTERNACIONAIS
      ====================================================== */}

      <section
        id="pacotes"
        className="py-24 px-6"
        style={{ backgroundColor: "white" }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-12">
            <span
              className="text-sm font-semibold uppercase tracking-[0.2em]"
              style={{ color: palette.gold }}
            >
              01 — Pacotes
            </span>

            <h2
              className="text-3xl md:text-4xl font-bold mt-3"
              style={{ color: palette.navy }}
            >
              Pacotes Nacionais e Internacionais
            </h2>

            <p
              className="mt-4 leading-relaxed"
              style={{ color: `${palette.navy}88` }}
            >
              Roteiros completos para conhecer destinos dentro e fora do Brasil.
            </p>
          </div>

          {/* Nacionais */}

          <div className="mb-16">
            <div className="flex items-end justify-between mb-6">
              <div>
                <span
                  className="text-xs uppercase tracking-widest font-semibold"
                  style={{ color: palette.gold }}
                >
                  Brasil
                </span>

                <h3
                  className="text-2xl font-bold mt-1"
                  style={{ color: palette.navy }}
                >
                  Pacotes Nacionais
                </h3>
              </div>
            </div>

            <div
              className="rounded-2xl p-4 md:p-8 border"
              style={{
                backgroundColor: palette.pale,
                borderColor: `${palette.navy}15`,
              }}
            >
              <NationalCard filterType="package" />
            </div>
          </div>

          {/* Internacionais */}

          <div>
            <div className="mb-6">
              <span
                className="text-xs uppercase tracking-widest font-semibold"
                style={{ color: palette.gold }}
              >
                Mundo
              </span>

              <h3
                className="text-2xl font-bold mt-1"
                style={{ color: palette.navy }}
              >
                Pacotes Internacionais
              </h3>
            </div>

            <div
              className="rounded-2xl p-4 md:p-8 border"
              style={{
                backgroundColor: palette.pale,
                borderColor: `${palette.navy}15`,
              }}
            >
              <InternationalCard filterType="package" />
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================
          PASSAGENS
      ====================================================== */}

      <section
        id="passagens"
        className="py-24 px-6"
        style={{ backgroundColor: palette.subtle }}
      >
        <div className="max-w-7xl mx-auto">
          {/* CABEÇALHO */}
          <div className="max-w-2xl mb-12">
            <span
              className="text-sm font-semibold uppercase tracking-[0.2em]"
              style={{ color: palette.gold }}
            >
              02 — Passagens
            </span>

            <h2
              className="text-3xl md:text-4xl font-bold mt-3"
              style={{ color: palette.navy }}
            >
              Passagens
            </h2>

            <p
              className="mt-4 leading-relaxed"
              style={{ color: `${palette.navy}88` }}
            >
              Encontre opções de embarque para destinos nacionais e
              internacionais.
            </p>
          </div>

          {/* =========================================
        PASSAGENS NACIONAIS
    ========================================= */}

          <div className="mb-16">
            <div className="mb-6">
              <span
                className="text-xs uppercase tracking-widest font-semibold"
                style={{ color: palette.gold }}
              >
                Brasil
              </span>

              <h3
                className="text-2xl font-bold mt-1"
                style={{ color: palette.navy }}
              >
                Passagens Nacionais
              </h3>
            </div>

            <div
              className="rounded-2xl p-4 md:p-8 border"
              style={{
                backgroundColor: "white",
                borderColor: `${palette.navy}15`,
                boxShadow: "0 8px 30px rgba(14,44,69,0.05)",
              }}
            >
              <NationalCard filterType="ticket" />
            </div>
          </div>

          {/* =========================================
        PASSAGENS INTERNACIONAIS
    ========================================= */}

          <div>
            <div className="mb-6">
              <span
                className="text-xs uppercase tracking-widest font-semibold"
                style={{ color: palette.gold }}
              >
                Mundo
              </span>

              <h3
                className="text-2xl font-bold mt-1"
                style={{ color: palette.navy }}
              >
                Passagens Internacionais
              </h3>
            </div>

            <div
              className="rounded-2xl p-4 md:p-8 border"
              style={{
                backgroundColor: "white",
                borderColor: `${palette.navy}15`,
                boxShadow: "0 8px 30px rgba(14,44,69,0.05)",
              }}
            >
              <InternationalCard filterType="ticket" />
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================
          CRUZEIROS
      ====================================================== */}

      <section
        id="cruzeiros"
        className="py-24 px-6"
        style={{ backgroundColor: palette.pale }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-12">
            <span
              className="text-sm font-semibold uppercase tracking-[0.2em]"
              style={{ color: palette.gold }}
            >
              03 — Cruzeiros
            </span>

            <h2
              className="text-3xl md:text-4xl font-bold mt-3"
              style={{ color: palette.navy }}
            >
              Cruzeiros
            </h2>

            <p
              className="mt-4 leading-relaxed"
              style={{ color: `${palette.navy}88` }}
            >
              Escolha o estilo de viagem que combina com você e encontre sua
              próxima experiência em alto mar.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
            {cruiseTypes.map((type) => (
              <div
                key={type.title}
                className="p-7 rounded-2xl border transition-all duration-300 hover:-translate-y-1"
                style={{
                  backgroundColor: "white",
                  borderColor: `${palette.navy}15`,
                  boxShadow: "0 5px 25px rgba(14,44,69,0.05)",
                }}
              >
                <div className="text-3xl mb-5">{type.icon}</div>

                <h3
                  className="font-semibold text-lg mb-3"
                  style={{ color: palette.navy }}
                >
                  {type.title}
                </h3>

                <p
                  className="text-sm leading-relaxed"
                  style={{ color: `${palette.navy}88` }}
                >
                  {type.description}
                </p>
              </div>
            ))}
          </div>

          <div>
            <div className="mb-6">
              <span
                className="text-xs uppercase tracking-widest font-semibold"
                style={{ color: palette.gold }}
              >
                Ofertas
              </span>

              <h3
                className="text-2xl font-bold mt-1"
                style={{ color: palette.navy }}
              >
                Cruzeiros disponíveis
              </h3>
            </div>

            <CruiseCard />
          </div>
        </div>
      </section>

      {/* ======================================================
          RODOVIÁRIO
      ====================================================== */}

      <section
        id="rodoviario"
        className="py-24 px-6"
        style={{ backgroundColor: palette.subtle }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-12">
            <span
              className="text-sm font-semibold uppercase tracking-[0.2em]"
              style={{ color: palette.gold }}
            >
              04 — Rodoviário
            </span>

            <h2
              className="text-3xl md:text-4xl font-bold mt-3"
              style={{ color: palette.navy }}
            >
              Viagens Rodoviárias
            </h2>

            <p
              className="mt-4 leading-relaxed"
              style={{ color: `${palette.navy}88` }}
            >
              Viagens práticas e confortáveis para destinos próximos de São
              Paulo.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5 mb-12">
            {busDestinations.map((destination) => (
              <div
                key={destination.title}
                className="rounded-2xl overflow-hidden border bg-white"
                style={{
                  borderColor: `${palette.navy}15`,
                }}
              >
                <div
                  className="h-2"
                  style={{ backgroundColor: palette.gold }}
                />

                <div className="p-7">
                  <span
                    className="text-xs uppercase tracking-widest font-semibold"
                    style={{ color: palette.gold }}
                  >
                    {destination.tag}
                  </span>

                  <h3
                    className="text-xl font-bold mt-2"
                    style={{ color: palette.navy }}
                  >
                    {destination.title}
                  </h3>

                  <p
                    className="text-sm leading-relaxed mt-3"
                    style={{ color: `${palette.navy}88` }}
                  >
                    {destination.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <BusRouteCard />
        </div>
      </section>

      {/* ======================================================
          SEGURO VIAGEM
      ====================================================== */}

      <section
        id="seguro"
        className="py-24 px-6"
        style={{ backgroundColor: "white" }}
      >
        <div className="max-w-6xl mx-auto">
          <div
            className="rounded-3xl p-8 md:p-14 border"
            style={{
              backgroundColor: palette.pale,
              borderColor: `${palette.navy}15`,
            }}
          >
            <div className="max-w-3xl">
              <span
                className="text-sm font-semibold uppercase tracking-[0.2em]"
                style={{ color: palette.gold }}
              >
                05 — Seguro Viagem
              </span>

              <h2
                className="text-3xl md:text-4xl font-bold mt-3"
                style={{ color: palette.navy }}
              >
                Viaje com mais tranquilidade
              </h2>

              <p
                className="mt-5 text-lg leading-relaxed"
                style={{ color: `${palette.navy}99` }}
              >
                Proteja sua viagem contra imprevistos e conte com assistência
                quando precisar.
              </p>

              <div className="grid sm:grid-cols-2 gap-4 mt-10">
                {[
                  "Cobertura durante a viagem",
                  "Assistência em caso de imprevistos",
                  "Opções para diferentes destinos",
                  "Suporte especializado",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 p-4 rounded-xl bg-white border"
                    style={{
                      borderColor: `${palette.navy}12`,
                    }}
                  >
                    <span
                      className="w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold"
                      style={{
                        backgroundColor: `${palette.gold}20`,
                        color: palette.gold,
                      }}
                    >
                      ✓
                    </span>

                    <span
                      className="text-sm font-medium"
                      style={{ color: palette.navy }}
                    >
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              <button
                onClick={handleWhatsAppClick}
                className="mt-10 px-7 py-3.5 rounded-xl font-semibold transition-opacity hover:opacity-90"
                style={{
                  backgroundColor: palette.navy,
                  color: "white",
                }}
              >
                Solicitar Seguro
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================
          TRANSFER
      ====================================================== */}

      <section
        id="transfer"
        className="py-24 px-6"
        style={{ backgroundColor: palette.subtle }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="max-w-2xl">
            <span
              className="text-sm font-semibold uppercase tracking-[0.2em]"
              style={{ color: palette.gold }}
            >
              06 — Transfer
            </span>

            <h2
              className="text-3xl md:text-4xl font-bold mt-3"
              style={{ color: palette.navy }}
            >
              Seu deslocamento também faz parte da viagem
            </h2>

            <p
              className="mt-5 leading-relaxed"
              style={{ color: `${palette.navy}88` }}
            >
              Organize seus deslocamentos com antecedência e chegue ao seu
              destino com mais praticidade.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5 mt-12">
            {[
              {
                icon: "✈",
                title: "Aeroporto",
                description:
                  "Transporte entre aeroporto, hotel e outros pontos.",
              },
              {
                icon: "🚐",
                title: "Hotel",
                description: "Deslocamentos organizados durante sua estadia.",
              },
              {
                icon: "📍",
                title: "Destino",
                description: "Transfer personalizado conforme sua necessidade.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-2xl p-7 border"
                style={{
                  borderColor: `${palette.navy}15`,
                }}
              >
                <div className="text-2xl mb-5" style={{ color: palette.gold }}>
                  {item.icon}
                </div>

                <h3
                  className="text-lg font-semibold"
                  style={{ color: palette.navy }}
                >
                  {item.title}
                </h3>

                <p
                  className="text-sm leading-relaxed mt-3"
                  style={{ color: `${palette.navy}88` }}
                >
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          <button
            onClick={handleWhatsAppClick}
            className="mt-10 px-7 py-3.5 rounded-xl font-semibold transition-opacity hover:opacity-90"
            style={{
              backgroundColor: palette.gold,
              color: palette.navy,
            }}
          >
            Solicitar Transfer
          </button>
        </div>
      </section>

      {/* ======================================================
          EVENTOS
      ====================================================== */}

      <section
        id="eventos"
        className="py-24 px-6"
        style={{ backgroundColor: palette.pale }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-12">
            <span
              className="text-sm font-semibold uppercase tracking-[0.2em]"
              style={{ color: palette.gold }}
            >
              07 — Eventos
            </span>

            <h2
              className="text-3xl md:text-4xl font-bold mt-3"
              style={{ color: palette.navy }}
            >
              Eventos e Experiências
            </h2>

            <p
              className="mt-4 leading-relaxed"
              style={{ color: `${palette.navy}88` }}
            >
              Passeios, excursões e experiências selecionadas para tornar sua
              viagem ainda mais especial.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
            {eventTypes.map((event) => (
              <div
                key={event.title}
                className="rounded-2xl p-7 border bg-white transition-all duration-300 hover:-translate-y-1"
                style={{
                  borderColor: `${palette.navy}15`,
                  boxShadow: "0 5px 25px rgba(14,44,69,0.05)",
                }}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center mb-5 text-sm font-bold"
                  style={{
                    backgroundColor: `${palette.gold}18`,
                    color: palette.gold,
                  }}
                >
                  +
                </div>

                <h3
                  className="font-semibold text-lg mb-3"
                  style={{ color: palette.navy }}
                >
                  {event.title}
                </h3>

                <p
                  className="text-sm leading-relaxed"
                  style={{ color: `${palette.navy}88` }}
                >
                  {event.description}
                </p>
              </div>
            ))}
          </div>

          <div>
            <div className="mb-6">
              <span
                className="text-xs uppercase tracking-widest font-semibold"
                style={{ color: palette.gold }}
              >
                Experiências disponíveis
              </span>

              <h3
                className="text-2xl font-bold mt-1"
                style={{ color: palette.navy }}
              >
                Próximos eventos
              </h3>
            </div>

            <EventTicketCard />
          </div>
        </div>
      </section>

      {/* ======================================================
          FAQ
      ====================================================== */}

      <section className="py-24 px-6" style={{ backgroundColor: "white" }}>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span
              className="text-sm font-semibold uppercase tracking-[0.2em]"
              style={{ color: palette.gold }}
            >
              Dúvidas
            </span>

            <h2
              className="text-3xl md:text-4xl font-bold mt-3"
              style={{ color: palette.navy }}
            >
              Perguntas frequentes
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={faq.question}
                className="rounded-xl border overflow-hidden"
                style={{
                  borderColor: `${palette.navy}15`,
                }}
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between text-left p-5 font-semibold"
                  style={{ color: palette.navy }}
                >
                  {faq.question}

                  <span
                    className="text-xl transition-transform"
                    style={{
                      color: palette.gold,
                      transform:
                        openFaq === index ? "rotate(45deg)" : "rotate(0deg)",
                    }}
                  >
                    +
                  </span>
                </button>

                {openFaq === index && (
                  <div
                    className="px-5 pb-5 text-sm leading-relaxed"
                    style={{ color: `${palette.navy}88` }}
                  >
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================================
          CTA
      ====================================================== */}

      <section className="py-24 px-6" style={{ backgroundColor: palette.pale }}>
        <div
          className="max-w-5xl mx-auto rounded-3xl p-10 md:p-16 text-center"
          style={{
            backgroundColor: palette.navy,
          }}
        >
          <span
            className="text-sm font-semibold uppercase tracking-[0.2em]"
            style={{ color: palette.gold }}
          >
            Vamos planejar?
          </span>

          <h2
            className="text-3xl md:text-4xl font-bold mt-4"
            style={{ color: "white" }}
          >
            Sua próxima viagem começa aqui.
          </h2>

          <p
            className="max-w-2xl mx-auto mt-5 text-lg leading-relaxed"
            style={{ color: `${palette.subtle}cc` }}
          >
            Fale com nossa equipe e encontre as melhores opções para o seu
            próximo destino.
          </p>

          <button
            onClick={handleWhatsAppClick}
            className="mt-9 px-9 py-4 rounded-xl font-bold transition-opacity hover:opacity-90"
            style={{
              backgroundColor: palette.gold,
              color: palette.navy,
            }}
          >
            Falar no WhatsApp
          </button>
        </div>
      </section>

      <WhatsAppAssistant ref={assistantRef} />
    </>
  );
};

export default Services;
