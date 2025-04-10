import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase/firbase";
import ImageUpload from "./ImageUpload";
import CustomFields from "./CustomFields";
import FeatureModal from "./FeatureModal";
import FeedbackMessage from "./FeedbackMessage";

const CreateCard = () => {
  const [formData, setFormData] = useState({
    image: null,
    imageUrl: "",
    country: "",
    place: "",
    price: "",
    features: [],
    customFields: {
      days: "",
      people: "",
      luggage: "",
      nights: "",
    },
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!formData.imageUrl)
        throw new Error("Faça o upload da imagem primeiro!");
      if (formData.features.length === 0)
        throw new Error("Selecione pelo menos uma feature.");

      await addDoc(collection(db, "pricingCards"), {
        image: formData.imageUrl,
        country: formData.country,
        place: formData.place,
        price: formData.price,
        features: formData.features,
        customFields: formData.customFields,
        isFeatured: false,
      });

      setSuccess("Card criado com sucesso!");
      setFormData({
        image: null,
        imageUrl: "",
        country: "",
        place: "",
        price: "",
        features: [],
        customFields: {
          days: "",
          people: "",
          luggage: "",
          nights: "",
        },
      });
    } catch (err) {
      setError(err.message || "Erro ao criar o card.");
    }
  };

  return (
    <div className="mt-20 ">
      <div className="p-8  bg-gray-50 rounded-lg shadow-lg max-w-lg mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Adicionar Novo Card
        </h2>
        <FeedbackMessage success={success} error={error} />
        <form onSubmit={handleSubmit} className="space-y-6">
          <ImageUpload formData={formData} setFormData={setFormData} />
          <CustomFields formData={formData} setFormData={setFormData} />
          <div>
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center"
            >
              <span className="material-icons mr-2">add</span>
              Selecionar Features
            </button>
            <ul className="mt-2 space-y-1">
              {formData.features.map((feature, i) => (
                <li key={i} className="text-green-600">
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center justify-center"
          >
            <span className="material-icons mr-2">check</span>
            Criar Card
          </button>
        </form>
        {modalOpen && (
          <FeatureModal
            featureOptions={[
              "Café da manhã",
              "Aéreo",
              "Wi-Fi",
              "Transferer do aeroporto ao hotel",
              "Pensão completa",
              "Ida e volta",
              "Carro Econômico / Carro Médio",
              "Rodoviário",
              "Guia de Turismo Local",
              "Seguro viagem",
              "Finais de semana",
              "Kit lanche",
              "Passeios para todas as idades",
              "Van executiva",
              "Passeio de barco",
              "Compras",
              "City tour",
              "Degustação",
              "01 noite de hospedagem",
              "Passeio de Balão",
              "Festa das Flores",
              "Música",
              "Off Road",
              "Passeio ecológico",
              "Refeições inclusas conforme roteiro",
              "Caminhada em Trilhas",
            ]}
            formData={formData}
            setFormData={setFormData}
            setModalOpen={setModalOpen}
          />
        )}
      </div>
    </div>
  );
};

export default CreateCard;
