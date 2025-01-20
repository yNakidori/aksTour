import React from "react";
import Featured from "./assets/homepage/featured";
import Navbar from "./assets/navbar";
import Footer from "./assets/footer";
import CompareServices from "./assets/compareServices";

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
    <div className="min-h-screen flex flex-col bg-sky-600">
      <Navbar />
      <div className="flex-grow">
        {/* Título da seção */}
        <h1 className="text-4xl text-center font-bold mt-10 text-gray-800">
          Serviços
        </h1>
        <p className="text-center text-gray-50 mt-2">
          Explore os serviços que oferecemos para tornar sua viagem
          inesquecível.
        </p>

        {/* Cards de serviços */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <div
              key={index}
              className="border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow bg-white text-center"
            >
              <div className="text-6xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {service.title}
              </h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>

        {/* Cards de serviços */}
        <div className="bg-orange-200 py-12">
          <Featured />
        </div>

        {/* Comparação de Serviços */}
        <div className="bg-gray-100 py-12">
          <h2 className="text-3xl text-center font-bold text-gray-800 mb-6">
            Compare Nossos Serviços
          </h2>
          <p className="text-center text-gray-600 mb-8">
            Veja como nos destacamos em relação às outras agências.
          </p>
          <div className="max-w-6xl mx-auto px-6 ">
            <CompareServices />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Services;
