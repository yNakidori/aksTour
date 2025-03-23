import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../firebase/firbase";

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
  const [featureOptions] = useState([
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
  ]);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, image: file }));
    if (file) {
      const storageRef = ref(storage, `pricingCards/${file.name}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      setFormData((prev) => ({ ...prev, imageUrl: url }));
    }
  };

  const handleFeatureToggle = (feature) => {
    setFormData((prev) => {
      const features = prev.features.includes(feature)
        ? prev.features.filter((f) => f !== feature)
        : [...prev.features, feature];
      return { ...prev, features };
    });
  };

  const handleCustomFieldChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      customFields: {
        ...prev.customFields,
        [field]: value,
      },
    }));
  };

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
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Adicionar Novo Card
      </h2>
      {success && <p className="text-green-600 mb-4">{success}</p>}
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
        {/* Upload de imagem */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Upload de Imagem
          </label>
          <input
            type="file"
            onChange={handleImageUpload}
            className="w-full border rounded-lg p-2"
          />
        </div>

        {/* Campos personalizados */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Quantidade de Dias
          </label>
          <input
            type="number"
            value={formData.customFields.days}
            onChange={(e) => handleCustomFieldChange("days", e.target.value)}
            className="w-full border rounded-lg p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Quantidade de Pessoas
          </label>
          <input
            type="number"
            value={formData.customFields.people}
            onChange={(e) => handleCustomFieldChange("people", e.target.value)}
            className="w-full border rounded-lg p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Quantidade de Malas
          </label>
          <input
            type="number"
            value={formData.customFields.luggage}
            onChange={(e) => handleCustomFieldChange("luggage", e.target.value)}
            className="w-full border rounded-lg p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Quantidade de Noites
          </label>
          <input
            type="number"
            value={formData.customFields.nights}
            onChange={(e) => handleCustomFieldChange("nights", e.target.value)}
            className="w-full border rounded-lg p-2"
          />
        </div>

        {/* Botão para abrir o modal de features */}
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          Selecionar Features
        </button>
        <ul className="mt-2 space-y-1">
          {formData.features.map((feature, i) => (
            <li key={i} className="text-green-600">
              {feature}
            </li>
          ))}
        </ul>

        {/* Botão de submissão */}
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors duration-200"
        >
          Criar Card
        </button>
      </form>

      {/* Modal para selecionar features */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Selecione Features
            </h3>
            <ul className="space-y-2">
              {featureOptions.map((option, i) => (
                <li key={i} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`feature-${i}`}
                    value={option}
                    onChange={() => handleFeatureToggle(option)}
                    checked={formData.features.includes(option)}
                    className="mr-2"
                  />
                  <label htmlFor={`feature-${i}`} className="text-gray-700">
                    {option}
                  </label>
                </li>
              ))}
            </ul>
            <button
              onClick={() => setModalOpen(false)}
              className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              Confirmar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateCard;
