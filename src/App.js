import "./App.css";
import { useRef } from "react";
import Navbar from "./assets/navbar";
import Banner_Mobile from "./assets/images/Banner_mobile.png";
import Banner from "./assets/images/New_Banner.png";
import CardsBar from "./assets/homepage/cardsBar";
import AccommodationList from "./assets/admin/AccommodationList";
import Savan from "./assets/homepage/savan";
import EuroTuor from "./assets/homepage/euroTuor";
import Featured from "./assets/homepage/featured";
import Companys from "./assets/homepage/companys";
import Clients from "./assets/homepage/clients";
import Footer from "./assets/footer";
import VistoAmericanoMobile from "./assets/images/Visto_Americano_Mobile.png";
import VistoAmericano from "./assets/images/Visto_Americano.png";
import WhatsAppAssistant from "./assets/generic/WhatsAppAssistant";
import CookieConsentBanner from "./assets/generic/CookieConsentBanner";
import TravelDocsExplorer from "./assets/generic/TraveldocExplorer";
import ServicesSection from "./assets/generic/ServicesSection";

const palette = {
  navy: "#0E2C45",
  gold: "#B78E46",
  pale: "#F6FBF8",
  subtle: "#E6F0EC",
};

function App() {
  const assistantRef = useRef(null);

  const openChat = () => {
    assistantRef.current?.openChat();
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: palette.pale }}
    >
      <Navbar />

      {/* Banner principal */}
      <section className="w-full overflow-hidden bg-white pt-[64px]">
        <picture>
          <source media="(max-width: 767px)" srcSet={Banner_Mobile} />

          <img
            src={Banner}
            alt="Vistos e Passaportes — Assessoria especializada"
            className="w-full h-auto block"
          />
        </picture>
      </section>

      {/* Hero — Vistos e Passaportes */}
      <section
        className="relative overflow-hidden"
        style={{ backgroundColor: palette.pale }}
      >
        <div
          className="pointer-events-none absolute left-0 top-0 h-full w-1 bg-[#B78E46]/75"
          aria-hidden="true"
        />

        <div className="mx-auto grid max-w-7xl items-start gap-12 px-6 pb-14 pt-16 md:gap-16 md:pb-20 md:pt-24 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] lg:gap-20">
          <div className="lg:sticky lg:top-24">
            <div className="flex items-center gap-3">
              <span className="h-px w-9 bg-[#B78E46]" aria-hidden="true" />
              <span className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#926E2F]">
                AKS Tur · Assessoria documental
              </span>
            </div>

            <h1 className="mt-7 max-w-xl font-serif text-[clamp(2.7rem,5vw,4.85rem)] font-normal leading-[1.04] tracking-[-0.035em] text-[#0E2C45]">
              Sua próxima viagem começa com{" "}
              <em className="font-normal text-[#B78E46]">tranquilidade.</em>
            </h1>

            <div className="mt-7 max-w-md border-l border-[#B78E46]/65 pl-5">
              <p className="text-base leading-[1.85] text-[#0E2C45]/70">
                Assessoria para vistos, passaportes e autorizações eletrônicas.
                Orientação clara e acompanhamento em cada etapa da sua
                solicitação.
              </p>
            </div>

            <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-5">
              <button
                type="button"
                onClick={openChat}
                className="group inline-flex min-h-12 items-center gap-5 bg-[#0E2C45] px-6 py-3.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#173E5D] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B78E46]"
              >
                Falar com um especialista
                <svg
                  aria-hidden="true"
                  className="h-4 w-4 text-[#B78E46] transition-transform group-hover:translate-x-1"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                >
                  <path d="M5 12h14m-6-6 6 6-6 6" />
                </svg>
              </button>
              <a
                href="#visa-passports"
                className="border-b border-[#B78E46] pb-1 text-sm font-semibold text-[#0E2C45] transition-colors hover:text-[#926E2F]"
              >
                Conhecer os serviços
              </a>
            </div>

            <div className="mt-12 grid max-w-md grid-cols-3 gap-3 border-t border-[#0E2C45]/15 pt-6">
              {[
                ["01", "Orientação individual"],
                ["02", "Documentos organizados"],
                ["03", "Apoio no processo"],
              ].map(([number, label]) => (
                <div key={number}>
                  <span className="font-serif text-xl text-[#B78E46]">
                    {number}
                  </span>
                  <p className="mt-2 text-[11px] leading-relaxed text-[#0E2C45]/65">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <TravelDocsExplorer />
        </div>

        {(VistoAmericano || VistoAmericanoMobile) && (
          <div className="border-t border-[#0E2C45]/10 bg-white py-14 md:py-20">
            <div className="mx-auto max-w-7xl px-6">
              <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#B78E46]">
                    Guia visual
                  </p>
                  <h2 className="mt-2 font-serif text-3xl leading-tight text-[#0E2C45] md:text-4xl">
                    Visto americano, passo a passo
                  </h2>
                </div>
                <p className="max-w-xs text-sm leading-relaxed text-[#0E2C45]/60">
                  Conheça as principais etapas do processo de solicitação.
                </p>
              </div>
              <picture>
                {VistoAmericanoMobile && (
                  <source
                    media="(max-width: 767px)"
                    srcSet={VistoAmericanoMobile}
                  />
                )}
                <img
                  src={VistoAmericano || VistoAmericanoMobile}
                  alt="Etapas para solicitação do visto americano"
                  className="block h-auto w-full object-cover"
                  loading="lazy"
                />
              </picture>
            </div>
          </div>
        )}
      </section>

      {/* Serviços de vistos e passaportes */}
      <ServicesSection onContact={openChat} />

      <section className="py-20 px-6" style={{ backgroundColor: palette.pale }}>
        <div className="max-w-7xl mx-auto">
          <CardsBar />
        </div>
      </section>

      <section
        className="py-20 px-6"
        style={{ backgroundColor: palette.subtle }}
      >
        <div className="max-w-7xl mx-auto">
          <Savan />
        </div>
      </section>

      <section className="py-20 px-6" style={{ backgroundColor: palette.pale }}>
        <div className="max-w-7xl mx-auto">
          <EuroTuor />
        </div>
      </section>

      <section
        className="py-20 px-6"
        style={{ backgroundColor: palette.subtle }}
      >
        <div className="max-w-7xl mx-auto">
          <Featured />
        </div>
      </section>

      <section className="py-20 px-6" style={{ backgroundColor: palette.pale }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span
              className="text-sm font-semibold uppercase tracking-widest"
              style={{ color: palette.gold }}
            >
              Opções selecionadas
            </span>
            <h2
              className="text-4xl font-bold mt-3"
              style={{ color: palette.navy }}
            >
              Hospedagem Premium
            </h2>
            <p className="mt-3" style={{ color: `${palette.navy}aa` }}>
              Conheça nossas opções de acomodação em destinos incríveis.
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
            <AccommodationList isAdmin={false} />
          </div>
        </div>
      </section>

      <section
        className="py-20 px-6"
        style={{ backgroundColor: palette.subtle }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span
              className="text-sm font-semibold uppercase tracking-widest"
              style={{ color: palette.gold }}
            >
              Sobre nós
            </span>
            <h2
              className="text-4xl font-bold mt-3 mb-6"
              style={{ color: palette.navy }}
            >
              Quem Somos
            </h2>
          </div>
          <div
            className="rounded-3xl p-8 md:p-12 border"
            style={{
              backgroundColor: "white",
              borderColor: `${palette.navy}15`,
              boxShadow: "0 12px 35px rgba(14,44,69,0.08)",
            }}
          >
            <p
              className="text-lg leading-relaxed"
              style={{ color: `${palette.navy}bb` }}
            >
              Somos uma agência especializada em criar experiências
              inesquecíveis. Seja uma viagem de férias, intercâmbio ou
              hospedagens exclusivas, nosso compromisso é com a sua satisfação e
              segurança. Conheça nossos destinos e venha viajar com
              tranquilidade!
            </p>
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
              Destaque
            </span>
            <h2
              className="text-4xl font-bold mt-3"
              style={{ color: palette.navy }}
            >
              Por Que Escolher a AKS
            </h2>
            <p className="mt-3" style={{ color: `${palette.navy}aa` }}>
              Três razões para viajar com segurança e confiança.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Promoções Relâmpago",
                description:
                  "Aproveite ofertas especiais em destinos selecionados por tempo limitado.",
              },
              {
                title: "Destinos Exóticos",
                description:
                  "Descubra lugares fora do comum com pacotes exclusivos e personalizados.",
              },
              {
                title: "Suporte 24/7",
                description:
                  "Nossa equipe está sempre disponível para te ajudar, antes, durante e depois da viagem.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="rounded-2xl p-8 transition-all duration-300 border"
                style={{
                  backgroundColor: "white",
                  borderColor: `${palette.navy}15`,
                  boxShadow: "0 4px 20px rgba(14,44,69,0.06)",
                }}
              >
                <h3
                  className="text-xl font-semibold mb-3"
                  style={{ color: palette.navy }}
                >
                  {item.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: `${palette.navy}99` }}
                >
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        className="py-20 px-6"
        style={{ backgroundColor: palette.subtle }}
      >
        <div className="max-w-7xl mx-auto">
          <Companys />
        </div>
      </section>

      <section className="py-20 px-6" style={{ backgroundColor: palette.pale }}>
        <div className="max-w-7xl mx-auto">
          <Clients />
        </div>
      </section>

      <section
        className="py-20 px-6"
        style={{ backgroundColor: palette.subtle }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span
              className="text-sm font-semibold uppercase tracking-widest"
              style={{ color: palette.gold }}
            >
              Satisfação
            </span>
            <h2
              className="text-4xl font-bold mt-3"
              style={{ color: palette.navy }}
            >
              O Que Dizem Nossos Viajantes
            </h2>
          </div>
          <div
            className="rounded-3xl p-8 md:p-12 border"
            style={{
              backgroundColor: palette.navy,
              borderColor: `${palette.gold}35`,
              boxShadow: "0 12px 35px rgba(14,44,69,0.12)",
            }}
          >
            <p
              className="italic text-lg leading-relaxed mb-6"
              style={{ color: palette.subtle }}
            >
              "A melhor experiência que já tive! Tudo muito organizado,
              atendimento rápido e destinos incríveis. Recomendo para todos que
              querem viajar com tranquilidade."
            </p>
            <p className="font-semibold" style={{ color: palette.gold }}>
              — Mariana Costa
            </p>
          </div>
        </div>
      </section>

      <WhatsAppAssistant ref={assistantRef} />
      <CookieConsentBanner />

      <section className="py-20 px-6" style={{ backgroundColor: palette.pale }}>
        <div className="max-w-3xl mx-auto text-center">
          <span
            className="text-sm font-semibold uppercase tracking-widest block mb-4"
            style={{ color: palette.gold }}
          >
            Vamos começar
          </span>
          <h2
            className="text-4xl font-bold mb-6"
            style={{ color: palette.navy }}
          >
            Pronto Para Sua Próxima Aventura?
          </h2>
          <p
            className="text-lg mb-8 leading-relaxed"
            style={{ color: `${palette.navy}bb` }}
          >
            Clique abaixo e saiba tudo sobre nossas oportunidades incríveis de
            viagem. Nossa equipe está pronta para ajudá-lo!
          </p>
          <button
            onClick={openChat}
            className="px-10 py-4 rounded-xl font-bold text-base transition-all duration-200 hover:opacity-90"
            style={{ backgroundColor: palette.gold, color: palette.pale }}
          >
            Quero Conhecer!
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default App;
