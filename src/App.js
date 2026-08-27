import "./App.css";
import { useRef, useState } from "react";
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

const services = [
  {
    title: "Emissão de Visto",
    description:
      "Cuidamos de todo o processo de solicitação do seu visto, do início ao fim. Você envia os documentos e nós lidamos com toda a burocracia junto ao consulado — rápido, seguro e sem complicações.",
    icon: "📄",
    featured: true,
  },
  {
    title: "Análise de Documentos",
    description:
      "Revisamos todos os seus documentos com atenção aos mínimos detalhes, garantindo que sua solicitação seja enviada sem erros ou pendências.",
    icon: "🔍",
  },
  {
    title: "Preenchimento de Formulários",
    description:
      "Nossa equipe preenche todos os formulários consulares com precisão e conformidade, eliminando o risco de erros que possam atrasar ou inviabilizar seu visto.",
    icon: "📝",
  },
  {
    title: "Agendamento de Entrevista",
    description:
      "Cuidamos de todo o processo de agendamento junto ao consulado, economizando seu tempo e evitando complicações na marcação.",
    icon: "📅",
  },
  {
    title: "Acompanhamento do Processo",
    description:
      "Monitoramos cada etapa da sua solicitação e mantemos você informado até a aprovação final do visto.",
    icon: "📡",
  },
  {
    title: "Seguro Viagem",
    description:
      "Viaje com tranquilidade e segurança. Nossos seguros oferecem cobertura completa contra imprevistos, garantindo suporte onde quer que você esteja.",
    icon: "🛡️",
  },
];

const guarantees = [
  {
    title: "Contrato direto, sem intermediários",
    description:
      "Você fecha um contrato de prestação de serviços diretamente com nossa empresa, com CNPJ e responsáveis identificados — sem risco de intermediários ou sócios fantasmas.",
  },
  {
    title: "Processo transparente do início ao fim",
    description:
      "Todos os pedidos são cadastrados no seu próprio nome, e-mail e telefone. Você acompanha cada movimentação diretamente com o consulado, sem depender só da nossa palavra.",
  },
  {
    title: "Você só descansa e aguarda",
    description:
      "Cuidamos de toda a parte burocrática enquanto você foca na sua viagem. Em alguns casos, pode ser necessária sua presença apenas no dia da entrevista.",
  },
  {
    title: "Custo proporcional ao valor da viagem",
    description:
      "O investimento na assessoria costuma representar uma fração pequena do custo total da sua viagem — um valor justo perto da tranquilidade que você ganha.",
  },
];

const visaCountries = [
  {
    flag: "🇺🇸",
    title: "Visto Americano",
    description:
      "Assessoria completa para visto de turismo, negócios ou trabalho, incluindo preenchimento do formulário DS-160 e preparação para a entrevista.",
  },
  {
    flag: "🇨🇦",
    title: "Visto Canadense",
    description:
      "Cuidamos da sua solicitação de eTA ou visto de visitante, com orientação sobre documentos e requisitos específicos do Canadá.",
  },
  {
    flag: "🇦🇺",
    title: "Visto Australiano",
    description:
      "Assessoria para eVisitor e demais categorias de visto, com acompanhamento de todo o processo junto às autoridades australianas.",
  },
  {
    flag: "🇬🇧",
    title: "Reino Unido",
    description:
      "Suporte na solicitação do Standard Visitor Visa e outras categorias, com revisão detalhada da documentação exigida.",
  },
  {
    flag: "🇨🇳",
    title: "China",
    description:
      "Orientação completa para visto de turismo ou negócios na China, incluindo carta convite e demais exigências consulares.",
  },
  {
    flag: "🌍",
    title: "Outros Vistos",
    description:
      "Atendemos solicitações para outros destinos não listados aqui. Fale com a gente e receba uma avaliação personalizada do seu caso.",
  },
];

const faqs = [
  {
    question: "Quais documentos são necessários para solicitar o visto?",
    answer:
      "A lista varia conforme o país e o tipo de visto, mas em geral inclui passaporte válido, formulário preenchido, fotos recentes, comprovante de pagamento das taxas consulares, comprovante de renda e comprovante de residência. Após a análise do seu caso, enviamos uma lista detalhada e personalizada.",
  },
  {
    question: "Como funciona o pagamento das taxas consulares?",
    answer:
      "As taxas consulares são pagas diretamente ao consulado do país de destino, por boleto ou cartão, conforme as regras de cada um. Nossa equipe orienta exatamente como e quando fazer esse pagamento.",
  },
  {
    question: "Vocês garantem a aprovação do visto?",
    answer:
      "A decisão final é sempre do consulado. O que garantimos é um processo revisado com atenção, sem erros de preenchimento ou documentação, o que aumenta significativamente as chances de aprovação.",
  },
  {
    question: "O que acontece se o visto for negado?",
    answer:
      "Analisamos o motivo da negativa junto com você e orientamos os próximos passos, incluindo a possibilidade de um novo pedido com o processo ajustado.",
  },
  {
    question: "Vocês ajudam com vistos de estudante e de trabalho?",
    answer:
      "Sim. Além do visto de turismo, também prestamos assessoria para vistos de estudo, trabalho e nômade digital, sempre com acompanhamento especializado por tipo de solicitação.",
  },
];

function App() {
  const assistantRef = useRef(null);
  const [openFaq, setOpenFaq] = useState(null);

  const openChat = () => {
    assistantRef.current?.openChat();
  };

  const toggleFaq = (index) => {
    setOpenFaq((prev) => (prev === index ? null : index));
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: palette.pale }}
    >
      <Navbar />
      <BannerCarousel />

      {/* Guarantees / Trust block */}
      <section className="py-20 px-6" style={{ backgroundColor: palette.navy }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span
              className="text-sm font-semibold uppercase tracking-widest"
              style={{ color: palette.gold }}
            >
              Confiança em primeiro lugar
            </span>
            <h2
              className="text-4xl font-bold mt-3"
              style={{ color: palette.pale }}
            >
              O que você tem ao contratar nossa assessoria
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {guarantees.map((item, i) => (
              <div
                key={i}
                className="rounded-2xl p-6 border"
                style={{
                  backgroundColor: `${palette.pale}08`,
                  borderColor: `${palette.gold}30`,
                }}
              >
                <div className="flex items-start gap-3">
                  <span
                    className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 border"
                    style={{
                      backgroundColor: `${palette.gold}22`,
                      borderColor: `${palette.gold}55`,
                      color: palette.gold,
                    }}
                  >
                    ✓
                  </span>
                  <div>
                    <h3
                      className="font-semibold mb-1.5"
                      style={{ color: palette.pale }}
                    >
                      {item.title}
                    </h3>
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: `${palette.subtle}cc` }}
                    >
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section
        id="services"
        className="py-20 px-6"
        style={{ backgroundColor: palette.pale }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span
              className="text-sm font-semibold uppercase tracking-widest"
              style={{ color: palette.gold }}
            >
              O que oferecemos
            </span>
            <h2
              className="text-4xl font-bold mt-3"
              style={{ color: palette.navy }}
            >
              Nossos Serviços
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="group rounded-2xl p-8 transition-all duration-300 border"
                style={{
                  backgroundColor: service.featured ? palette.navy : "white",
                  borderColor: service.featured
                    ? palette.gold
                    : `${palette.navy}15`,
                  boxShadow: service.featured
                    ? `0 8px 30px rgba(183,142,70,0.25)`
                    : "0 4px 20px rgba(14,44,69,0.06)",
                }}
              >
                {service.featured && (
                  <span
                    className="inline-block mb-4 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide"
                    style={{
                      backgroundColor: palette.gold,
                      color: palette.navy,
                    }}
                  >
                    Serviço Principal
                  </span>
                )}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform duration-300 border"
                  style={{
                    backgroundColor: `${palette.gold}18`,
                    borderColor: `${palette.gold}40`,
                  }}
                >
                  {service.icon}
                </div>
                <h3
                  className="text-lg font-semibold mb-3"
                  style={{
                    color: service.featured ? palette.pale : palette.navy,
                  }}
                >
                  {service.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{
                    color: service.featured
                      ? `${palette.subtle}cc`
                      : `${palette.navy}99`,
                  }}
                >
                  {service.description}
                </p>
                {service.featured && (
                  <button
                    onClick={openChat}
                    className="mt-6 px-5 py-2.5 rounded-lg font-semibold text-sm transition-all duration-200 hover:opacity-90"
                    style={{
                      backgroundColor: palette.gold,
                      color: palette.navy,
                    }}
                  >
                    Iniciar Emissão →
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visto por destino */}
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
              Destinos atendidos
            </span>
            <h2
              className="text-4xl font-bold mt-3"
              style={{ color: palette.navy }}
            >
              Visto para o Seu Destino
            </h2>
            <p className="mt-3" style={{ color: `${palette.navy}aa` }}>
              Assessoria especializada por país, com as regras e formulários
              certos para cada consulado.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {visaCountries.map((country, index) => (
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
                  {country.flag}
                </div>
                <h3
                  className="text-lg font-semibold mb-3"
                  style={{ color: palette.navy }}
                >
                  {country.title}
                </h3>
                <p
                  className="text-sm leading-relaxed mb-5"
                  style={{ color: `${palette.navy}99` }}
                >
                  {country.description}
                </p>
                <button
                  onClick={openChat}
                  className="text-sm font-semibold transition-all duration-200 hover:opacity-80"
                  style={{ color: palette.gold }}
                >
                  Consultar este visto →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6" style={{ backgroundColor: palette.pale }}>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span
              className="text-sm font-semibold uppercase tracking-widest"
              style={{ color: palette.gold }}
            >
              Dúvidas frequentes
            </span>
            <h2
              className="text-4xl font-bold mt-3"
              style={{ color: palette.navy }}
            >
              Perguntas sobre emissão de vistos
            </h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="rounded-xl border overflow-hidden"
                style={{
                  borderColor: `${palette.navy}18`,
                  backgroundColor: "white",
                }}
              >
                <button
                  onClick={() => toggleFaq(i)}
                  className="w-full flex items-center justify-between text-left px-6 py-4 font-medium"
                  style={{ color: palette.navy }}
                >
                  {faq.question}
                  <span
                    className="ml-4 flex-shrink-0 transition-transform duration-200"
                    style={{
                      color: palette.gold,
                      transform:
                        openFaq === i ? "rotate(45deg)" : "rotate(0deg)",
                    }}
                  >
                    +
                  </span>
                </button>
                {openFaq === i && (
                  <div
                    className="px-6 pb-5 text-sm leading-relaxed"
                    style={{ color: `${palette.navy}99` }}
                  >
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

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
