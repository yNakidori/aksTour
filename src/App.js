import "./App.css";
import { useRef } from "react";
import Navbar from "./assets/navbar";
import BannerCarousel from "./assets/BannerCarousel";
import CardsBar from "./assets/homepage/cardsBar";
import AccommodationList from "./assets/admin/AccommodationList";
import Savan from "./assets/homepage/savan";
import EuroTuor from "./assets/homepage/euroTuor";
import Featured from "./assets/homepage/featured";
import Companys from "./assets/homepage/companys";
import Clients from "./assets/homepage/clients";
import Footer from "./assets/footer";
import WhatsAppAssistant from "./assets/generic/WhatsAppAssistant";
import CookieConsentBanner from "./assets/generic/CookieConsentBanner";

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
      <BannerCarousel />
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
