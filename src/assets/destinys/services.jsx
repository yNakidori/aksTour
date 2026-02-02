import React from "react";
import { Briefcase, MapPin, Globe } from "lucide-react";

const Services = () => {
  const servicesData = [
    {
      id: 1,
      title: "Incontáveis Destinos",
      description: "As melhores opções",
      text: "Encontre o lugar certo para suas próximas férias",
      icon: <Briefcase className="text-blue-600 w-12 h-12" />,
    },
    {
      id: 2,
      title: "Pacotes Exclusivos",
      description: "Saindo de São Paulo",
      text: "Confira as melhores ofertas de pacotes nacionais e internacionais",
      icon: <MapPin className="text-blue-600 w-12 h-12" />,
    },
    {
      id: 3,
      title: "Dicas de viagem",
      description: "Acompanhe nossas redes",
      text: "Dicas e informações para você aproveitar ao máximo sua viagem",
      icon: <Globe className="text-blue-600 w-12 h-12" />,
    },
  ];

  return (
    <div className="w-full">
      {/* Mobile: Carrossel horizontal */}
      <div className="md:hidden flex overflow-x-auto gap-4 px-2 pb-4 snap-x snap-mandatory scrollbar-hide">
        {servicesData.map((service) => (
          <div
            key={service.id}
            className="flex-shrink-0 w-[85vw] snap-center border-2 border-blue-600 rounded-xl p-5 text-center bg-white shadow-lg active:scale-95 transition-transform duration-200"
          >
            <div className="flex justify-center mb-3">{service.icon}</div>
            <h2 className="text-lg font-bold text-blue-600 mb-2">
              {service.title}
            </h2>
            <p className="text-base text-yellow-400 font-semibold mb-2">
              {service.description}
            </p>
            <p className="text-sm text-gray-600">{service.text}</p>
          </div>
        ))}
      </div>

      {/* Indicador para mobile */}
      <div className="md:hidden flex justify-center items-center gap-2 mt-2">
        <span className="text-xs text-white bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full">
          Deslize para ver mais →
        </span>
      </div>

      {/* Desktop: Grid tradicional */}
      <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-8 bg-white p-8 rounded-lg shadow-lg">
        {servicesData.map((service) => (
          <div
            key={service.id}
            className="border-2 border-blue-600 rounded-lg p-6 text-center hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex justify-center mb-4">{service.icon}</div>
            <h2 className="text-xl font-bold text-blue-600 mb-2">
              {service.title}
            </h2>
            <p className="text-lg text-yellow-400 font-semibold mb-2">
              {service.description}
            </p>
            <p className="text-gray-600">{service.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
