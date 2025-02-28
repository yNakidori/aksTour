import React from "react";

const Services = () => {
  const servicesData = [
    {
      id: 1,
      title: "Incontaveis Destinos",
      description: "As melhores opções",
      text: "Encontre o lugar certo para suas próximas férias",
    },
    {
      id: 2,
      title: "Pacotes Exclusivos",
      description: "Saindo de São Paulo",
      text: "Confira as melhores ofertas de pacotes nacionais e internacionais",
    },
    {
      id: 3,
      title: "Dicas de viagem",
      description: "Acompanhe nossas redes",
      text: "Dicas e informações para você aproveitar ao máximo sua viagem",
    },
  ];

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {servicesData.map((service) => (
          <div
            key={service.id}
            className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
          >
            <h2 className="text-2xl font-bold text-blue-600 mb-2">
              {service.title}
            </h2>
            <p className="text-lg text-yellow-400 mb-4">
              {service.description}
            </p>
            <p className="text-gray-700">{service.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
