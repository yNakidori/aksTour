import React from "react";
import Featured from "./assets/homepage/featured";
import Navbar from "./assets/navbar";
import Footer from "./assets/footer";
import HowItWorks from "./assets/services/HowItWorks";
import Whats from "./assets/whats.json";
import Lottie from "react-lottie";

const services = [
  {
    title: "Pacotes de Viagem Personalizados",
    description:
      "Transformamos seus sonhos em itinerários únicos. Seja uma lua de mel romântica ou uma aventura em família, criamos experiências sob medida que se encaixam no seu estilo e no seu orçamento.",
    icon: "🌍",
  },
  {
    title: "Reserva de Hotéis",
    description:
      "Conforto e praticidade em cada destino. Conte com nossa curadoria para garantir as melhores acomodações com preços acessíveis e localização privilegiada.",
    icon: "🏨",
  },
  {
    title: "Passeios Guiados",
    description:
      "Explore cada canto com quem realmente conhece. Nossos guias apaixonados oferecem roteiros culturais, históricos e naturais, com segurança e muita informação.",
    icon: "🗺️",
  },
  {
    title: "Seguro Viagem",
    description:
      "Viaje com tranquilidade e segurança. Nossos seguros oferecem cobertura completa contra imprevistos, garantindo suporte onde quer que você esteja.",
    icon: "🛡️",
  },
  {
    title: "Emissão de Visto",
    description:
      "Cuidamos de todo o processo de solicitação de visto com agilidade e precisão. Você fornece os documentos, e nós lidamos com a burocracia — simples, seguro e sem complicações.",
    icon: "📄",
  },
];

const Services = () => {
  const defaultOptions = {
    Loop: true,
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
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <div className="flex-grow">
        {/* Cabeçalho */}
        <section className="py-20 px-6 bg-gradient-to-b from-blue-100 via-white to-white">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-5xl font-bold text-blue-800 mb-6">
              Soluções de Viagem
            </h1>
            <p className="text-gray-700 text-lg">
              Nós cuidamos de cada detalhe para que você possa aproveitar sua
              viagem com tranquilidade. Descubra os serviços exclusivos que
              oferecemos para tornar sua experiência única.
            </p>
          </div>
        </section>

        {/* Seção especial sobre Emissão de Visto */}
        <section className="py-20 bg-blue-50">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold text-yellow-400 mb-6">
              Emissão de Visto sem Complicações
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              Sabemos que o processo de obtenção de visto pode ser estressante e
              confuso. Por isso, oferecemos um serviço completo e descomplicado
              de <strong>emissão de vistos</strong>. Nossa equipe especializada
              cuida de todas as etapas: desde a análise dos documentos até o
              agendamento da entrevista. Com a gente, você evita erros,
              economiza tempo e garante mais tranquilidade para focar no que
              realmente importa:
              <em> sua viagem</em>.
            </p>
            <p className="mt-6 text-green-800 font-medium text-md">
              Atendemos vistos para os EUA, Canadá, Europa, Japão e outros
              destinos.
            </p>
          </div>
        </section>

        {/* Cards de Serviços */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {services.map((service, index) => (
              <div
                key={index}
                className="relative bg-gray-50 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 p-8 text-center border border-gray-200"
              >
                <div className="flex items-center justify-center mb-6">
                  <div className="w-20 h-20 bg-green-600 text-white rounded-full flex items-center justify-center text-4xl shadow-md">
                    {service.icon}
                  </div>
                </div>
                <h3 className="text-2xl font-semibold text-green-800 mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Como Funciona */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-6">
            <HowItWorks />
          </div>
        </section>
      </div>

      {/* Destaques */}
      <section className="bg-yellow-50 py-16">
        <Featured />
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

export default Services;
