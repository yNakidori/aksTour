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
    <div className="container mx-auto px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 bg-white p-8 rounded-lg shadow-lg">
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
