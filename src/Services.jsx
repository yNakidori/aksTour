import React from "react";
import Featured from "./assets/homepage/featured";
import Navbar from "./assets/navbar";
import Footer from "./assets/footer";
import HowItWorks from "./assets/services/HowItWorks";

const services = [
  {
    title: "Pacotes de Viagem Personalizados",
    description:
      "Oferecemos pacotes de viagem sob medida para atender suas preferências e orçamento.",
    icon: "🌍",
  },
  {
    title: "Reserva de Hotéis",
    description:
      "Encontre os melhores hotéis com preços acessíveis para uma estadia confortável.",
    icon: "🏨",
  },
  {
    title: "Passeios Guiados",
    description:
      "Explore destinos incríveis com guias experientes e apaixonados.",
    icon: "🗺️",
  },
  {
    title: "Seguro Viagem",
    description:
      "Viaje com tranquilidade com nosso seguro viagem que cobre imprevistos.",
    icon: "🛡️",
  },
];

const Services = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <div className="flex-grow">
        {/* Cabeçalho da Seção */}
        <section className="py-16 px-6 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl font-bold text-green-900 mb-4">
              Soluções de Viagem
            </h1>
            <p className="text-gray-700 text-lg max-w-2xl">
              Nós cuidamos de cada detalhe para que você possa aproveitar sua
              viagem com tranquilidade. Descubra os serviços exclusivos que
              oferecemos para tornar sua experiência única.
            </p>
          </div>
        </section>

        {/* Cards de Serviços */}
        <section className="py-12 bg-white">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto px-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow bg-gray-100"
              >
                <div className="bg-green-700 text-white text-5xl p-6 text-center">
                  {service.icon}
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-semibold text-green-900 mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-700 text-sm mb-4">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Como Funciona */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-6xl mx-auto px-6">
            <HowItWorks />
          </div>
        </section>
      </div>

      {/* Destaques */}
      <section className="bg-orange-100 py-12">
        <Featured />
      </section>

      <Footer />
    </div>
  );
};

export default Services;
