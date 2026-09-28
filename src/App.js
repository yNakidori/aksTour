import "./App.css";
import { useRef } from "react";
import Navbar from "./assets/navbar";
import Banner from "./assets/images/New_Banner.png";
import CardsBar from "./assets/homepage/cardsBar";
import AccommodationList from "./assets/admin/AccommodationList";
import Savan from "./assets/homepage/savan";
import EuroTuor from "./assets/homepage/euroTuor";
import Featured from "./assets/homepage/featured";
import Companys from "./assets/homepage/companys";
import Clients from "./assets/homepage/clients";
import Footer from "./assets/footer";
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

// const services = [
//   {
//     title: "Emissão de Visto",
//     description:
//       "Cuidamos de todo o processo de solicitação do seu visto, do início ao fim. Você envia os documentos e nós lidamos com toda a burocracia junto ao consulado — rápido, seguro e sem complicações.",
//     icon: "📄",
//     featured: true,
//   },
//   {
//     title: "Análise de Documentos",
//     description:
//       "Revisamos todos os seus documentos com atenção aos mínimos detalhes, garantindo que sua solicitação seja enviada sem erros ou pendências.",
//     icon: "🔍",
//   },
//   {
//     title: "Preenchimento de Formulários",
//     description:
//       "Nossa equipe preenche todos os formulários consulares com precisão e conformidade, eliminando o risco de erros que possam atrasar ou inviabilizar seu visto.",
//     icon: "📝",
//   },
//   {
//     title: "Agendamento de Entrevista",
//     description:
//       "Cuidamos de todo o processo de agendamento junto ao consulado, economizando seu tempo e evitando complicações na marcação.",
//     icon: "📅",
//   },
//   {
//     title: "Acompanhamento do Processo",
//     description:
//       "Monitoramos cada etapa da sua solicitação e mantemos você informado até a aprovação final do visto.",
//     icon: "📡",
//   },
//   {
//     title: "Seguro Viagem",
//     description:
//       "Viaje com tranquilidade e segurança. Nossos seguros oferecem cobertura completa contra imprevistos, garantindo suporte onde quer que você esteja.",
//     icon: "🛡️",
//   },
// ];

// const guarantees = [
//   {
//     title: "Contrato direto, sem intermediários",
//     description:
//       "Você fecha um contrato de prestação de serviços diretamente com nossa empresa, com CNPJ e responsáveis identificados — sem risco de intermediários ou sócios fantasmas.",
//   },
//   {
//     title: "Processo transparente do início ao fim",
//     description:
//       "Todos os pedidos são cadastrados no seu próprio nome, e-mail e telefone. Você acompanha cada movimentação diretamente com o consulado, sem depender só da nossa palavra.",
//   },
//   {
//     title: "Você só descansa e aguarda",
//     description:
//       "Cuidamos de toda a parte burocrática enquanto você foca na sua viagem. Em alguns casos, pode ser necessária sua presença apenas no dia da entrevista.",
//   },
//   {
//     title: "Custo proporcional ao valor da viagem",
//     description:
//       "O investimento na assessoria costuma representar uma fração pequena do custo total da sua viagem — um valor justo perto da tranquilidade que você ganha.",
//   },
// ];

// const visaCountries = [
//   {
//     flag: "🇺🇸",
//     title: "Visto Americano",
//     description:
//       "Assessoria completa para visto de turismo, negócios ou trabalho, incluindo preenchimento do formulário DS-160 e preparação para a entrevista.",
//   },
//   {
//     flag: "🇨🇦",
//     title: "Visto Canadense",
//     description:
//       "Cuidamos da sua solicitação de eTA ou visto de visitante, com orientação sobre documentos e requisitos específicos do Canadá.",
//   },
//   {
//     flag: "🇦🇺",
//     title: "Visto Australiano",
//     description:
//       "Assessoria para eVisitor e demais categorias de visto, com acompanhamento de todo o processo junto às autoridades australianas.",
//   },
//   {
//     flag: "🇬🇧",
//     title: "Reino Unido",
//     description:
//       "Suporte na solicitação do Standard Visitor Visa e outras categorias, com revisão detalhada da documentação exigida.",
//   },
//   {
//     flag: "🇨🇳",
//     title: "China",
//     description:
//       "Orientação completa para visto de turismo ou negócios na China, incluindo carta convite e demais exigências consulares.",
//   },
//   {
//     flag: "🌍",
//     title: "Outros Vistos",
//     description:
//       "Atendemos solicitações para outros destinos não listados aqui. Fale com a gente e receba uma avaliação personalizada do seu caso.",
//   },
// ];

// const faqs = [
//   {
//     question: "Quais documentos são necessários para solicitar o visto?",
//     answer:
//       "A lista varia conforme o país e o tipo de visto, mas em geral inclui passaporte válido, formulário preenchido, fotos recentes, comprovante de pagamento das taxas consulares, comprovante de renda e comprovante de residência. Após a análise do seu caso, enviamos uma lista detalhada e personalizada.",
//   },
//   {
//     question: "Como funciona o pagamento das taxas consulares?",
//     answer:
//       "As taxas consulares são pagas diretamente ao consulado do país de destino, por boleto ou cartão, conforme as regras de cada um. Nossa equipe orienta exatamente como e quando fazer esse pagamento.",
//   },
//   {
//     question: "Vocês garantem a aprovação do visto?",
//     answer:
//       "A decisão final é sempre do consulado. O que garantimos é um processo revisado com atenção, sem erros de preenchimento ou documentação, o que aumenta significativamente as chances de aprovação.",
//   },
//   {
//     question: "O que acontece se o visto for negado?",
//     answer:
//       "Analisamos o motivo da negativa junto com você e orientamos os próximos passos, incluindo a possibilidade de um novo pedido com o processo ajustado.",
//   },
//   {
//     question: "Vocês ajudam com vistos de estudante e de trabalho?",
//     answer:
//       "Sim. Além do visto de turismo, também prestamos assessoria para vistos de estudo, trabalho e nômade digital, sempre com acompanhamento especializado por tipo de solicitação.",
//   },
// ];

function App() {
  const assistantRef = useRef(null);
  // const [openFaq, setOpenFaq] = useState(null);

  const openChat = () => {
    assistantRef.current?.openChat();
  };

  // const toggleFaq = (index) => {
  //   setOpenFaq((prev) => (prev === index ? null : index));
  // };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: palette.pale }}
    >
      <Navbar />

      {/* Banner principal */}
      <section className="w-full overflow-hidden bg-white pt-[64px]">
        <img
          src={Banner}
          alt="Vistos e Passaportes — Assessoria especializada"
          className="w-full h-auto block"
        />
      </section>

      {/* Hero — Vistos e Passaportes */}
      <section
        className="relative overflow-hidden px-6 py-10 md:py-16 lg:py-20"
        style={{
          background:
            "linear-gradient(135deg, #F8FBFA 0%, #EEF5F2 55%, #F7F1E7 100%)",
        }}
      >
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="max-w-2xl">
            <span
              className="inline-flex items-center px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest border"
              style={{
                color: palette.gold,
                backgroundColor: `${palette.gold}12`,
                borderColor: `${palette.gold}35`,
              }}
            >
              Vistos consulares e passaportes
            </span>

            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] mt-6"
              style={{ color: palette.navy }}
            >
              Sua documentação para viajar,
              <span style={{ color: palette.gold }}> sem complicação.</span>
            </h1>

            <p
              className="text-base md:text-lg leading-relaxed mt-6 max-w-xl"
              style={{ color: `${palette.navy}aa` }}
            >
              Assessoria especializada para vistos, autorizações eletrônicas e
              passaportes. Organizamos cada etapa para você viajar com mais
              segurança e tranquilidade.
            </p>

            <div className="flex flex-wrap gap-3 mt-8">
              <button
                onClick={openChat}
                className="px-6 py-3.5 rounded-xl font-bold text-sm transition-all duration-200 hover:opacity-90 shadow-lg"
                style={{
                  backgroundColor: palette.navy,
                  color: "white",
                  boxShadow: "0 10px 25px rgba(14,44,69,0.16)",
                }}
              >
                Fale conosco →
              </button>

              <a
                href="#visa-passports"
                className="px-6 py-3.5 rounded-xl font-semibold text-sm border transition-all duration-200 hover:bg-white"
                style={{
                  color: palette.navy,
                  borderColor: `${palette.navy}25`,
                  backgroundColor: `${palette.pale}aa`,
                }}
              >
                Ver serviços
              </a>
            </div>

            <div className="flex flex-wrap gap-x-6 gap-y-2 mt-8 text-sm">
              <span style={{ color: `${palette.navy}99` }}>
                ✓ Atendimento personalizado
              </span>
              <span style={{ color: `${palette.navy}99` }}>
                ✓ Análise de documentação
              </span>
              <span style={{ color: `${palette.navy}99` }}>
                ✓ Acompanhamento do processo
              </span>
            </div>
          </div>

          <TravelDocsExplorer />
        </div>

        {/* Visto Americano - Processo */}
        <div className="relative w-full max-w-7xl mx-auto px-6 py-10 md:py-16 lg:py-20">
          <img
            src={VistoAmericano}
            alt="Etapas para aplicação do Visto Americano"
            className="w-full h-auto rounded-3xl object-cover"
          />
        </div>
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
