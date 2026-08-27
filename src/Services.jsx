import React, { useRef, useState } from "react";
import Navbar from "./assets/navbar";
import Footer from "./assets/footer";
import HowItWorks from "./assets/services/HowItWorks";
import WhatsAppAssistant from "./assets/generic/WhatsAppAssistant";

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

const Services = () => {
  const assistantRef = useRef(null);
  const [openFaq, setOpenFaq] = useState(null);

  const handleWhatsAppClick = () => {
    assistantRef.current?.openChat();
  };

  const toggleFaq = (index) => {
    setOpenFaq((prev) => (prev === index ? null : index));
  };

  const destinations = [
    "🇺🇸 EUA",
    "🇨🇦 Canadá",
    "🇪🇺 Europa",
    "🇯🇵 Japão",
    "🇦🇺 Austrália",
    "🇬🇧 Reino Unido",
  ];

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: palette.pale }}
    >
      <Navbar />

      {/* Hero */}
      <section
        className="relative overflow-hidden py-28 px-6"
        style={{ backgroundColor: palette.navy }}
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, ${palette.gold} 0%, transparent 55%), radial-gradient(circle at 80% 20%, ${palette.gold} 0%, transparent 45%)`,
          }}
        />
        <div className="relative max-w-4xl mx-auto text-center">
          <span
            className="inline-block mb-4 px-4 py-1.5 rounded-full text-sm font-medium tracking-wide uppercase border"
            style={{
              borderColor: `${palette.gold}55`,
              backgroundColor: `${palette.gold}20`,
              color: palette.gold,
            }}
          >
            Especialistas em Emissão de Vistos
          </span>
          <h1
            className="text-5xl sm:text-6xl font-extrabold mb-6 leading-tight"
            style={{ color: palette.pale }}
          >
            Seu visto aprovado,{" "}
            <span style={{ color: palette.gold }}>sem complicações</span>
          </h1>
          <p
            className="text-lg max-w-2xl mx-auto leading-relaxed"
            style={{ color: palette.subtle }}
          >
            Você envia os documentos, nós cuidamos de toda a emissão do seu
            visto — da análise inicial até a aprovação final — para que você
            foque no que realmente importa: aproveitar sua viagem.
          </p>
          <div className="mt-10 flex flex-wrap gap-4 justify-center">
            <button
              onClick={handleWhatsAppClick}
              className="px-8 py-3.5 rounded-xl font-semibold text-base transition-all duration-200 hover:opacity-90 shadow-lg"
              style={{ backgroundColor: palette.gold, color: palette.pale }}
            >
              Solicitar Meu Visto
            </button>
            <a
              href="#services"
              className="px-8 py-3.5 rounded-xl font-medium text-base transition-all duration-200 border"
              style={{ borderColor: `${palette.pale}40`, color: palette.pale }}
            >
              Ver Serviços
            </a>
          </div>
        </div>
      </section>

      {/* Destinations */}
      <section className="py-14 px-6" style={{ backgroundColor: palette.pale }}>
        <div className="max-w-4xl mx-auto text-center">
          <p
            className="text-sm uppercase tracking-widest mb-6 font-semibold"
            style={{ color: palette.gold }}
          >
            Destinos que atendemos
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {destinations.map((d, i) => (
              <span
                key={i}
                className="px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 border"
                style={{
                  borderColor: `${palette.navy}22`,
                  color: palette.navy,
                  backgroundColor: "white",
                }}
              >
                {d}
              </span>
            ))}
          </div>
        </div>
      </section>

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

      {/* About Section */}
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
              Processo seguro do início ao fim
            </h2>
            <p
              className="leading-relaxed mb-6"
              style={{ color: `${palette.navy}bb` }}
            >
              Sabemos que o processo de visto pode ser estressante. Nossa equipe
              especializada cuida de todas as etapas da emissão — da análise de
              documentos ao agendamento da entrevista — com precisão e
              agilidade.
            </p>
            <ul className="space-y-3">
              {[
                "Análise completa de elegibilidade",
                "Revisão minuciosa de documentos",
                "Comunicação direta com consulados",
                "Suporte até a aprovação final",
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
            {[
              "🔍 Análise",
              "📅 Agendamento",
              "📝 Formulários",
              "📡 Acompanhamento",
            ].map((item, i) => (
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
            ))}
          </div>
        </div>
      </section>

      {/* Services Cards */}
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
                  gridColumn: service.featured ? "span 1" : undefined,
                }}
              >
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
                    onClick={handleWhatsAppClick}
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

      {/* How It Works */}
      <section
        className="py-16 px-6"
        style={{ backgroundColor: palette.subtle }}
      >
        <div className="max-w-6xl mx-auto">
          <HowItWorks />
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
            Pronto para dar entrada no seu visto?
          </h2>
          <p className="mb-8 text-lg" style={{ color: palette.subtle }}>
            Fale com nossos especialistas e comece hoje mesmo o processo de
            emissão do seu visto.
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

      <WhatsAppAssistant ref={assistantRef} />

      <Footer />
    </div>
  );
};

export default Services;
