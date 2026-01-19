import React, { useState } from "react";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/firbase";
import ImageUpload from "./ImageUpload";
import CustomFields from "./CustomFields";
import FeatureModal from "./FeatureModal";
import FeedbackMessage from "./FeedbackMessage";
import TextField from "@mui/material/TextField";

const initialForm = {
  image: null,
  imageUrl: "",
  destination: "",
  accommodation: "",
  price: "",
  features: [],
  customFields: {
    days: "",
    people: "",
    luggage: "",
    nights: "",
  },
};

const CreateCard = () => {
  const [formData, setFormData] = useState(initialForm);
  const [modalOpen, setModalOpen] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [editingCard, setEditingCard] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!formData.imageUrl)
        throw new Error("Faça o upload da imagem primeiro!");
      if (formData.features.length === 0)
        throw new Error("Selecione pelo menos uma feature.");

      if (editingCard) {
        // Edição
        await updateDoc(doc(db, "pricingCards", editingCard.id), {
          image: formData.imageUrl,
          destination: formData.destination,
          accommodation: formData.accommodation,
          price: formData.price,
          features: formData.features,
          customFields: formData.customFields,
          isFeatured: editingCard.isFeatured || false,
        });
        setSuccess("Card atualizado com sucesso!");
      } else {
        // Criação
        await addDoc(collection(db, "pricingCards"), {
          image: formData.imageUrl,
          destination: formData.destination,
          accommodation: formData.accommodation,
          price: formData.price,
          features: formData.features,
          customFields: formData.customFields,
          isFeatured: false,
        });
        setSuccess("Card criado com sucesso!");
      }

      setFormData(initialForm);
      setEditingCard(null);
    } catch (err) {
      setError(err.message || "Erro ao salvar o card.");
    }
  };

  // Função de edição pode ser adicionada ao fluxo onde for necessário.

  return (
    <div className="mt-20">
      <div className="p-8 bg-gray-50 rounded-lg shadow-lg max-w-lg mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          {editingCard ? "Editar Pacote" : "Adicionar Novo Pacote"}
        </h2>
        <FeedbackMessage success={success} error={error} />
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <TextField
              label="Destino"
              id="destination"
              value={formData.destination}
              onChange={(e) =>
                setFormData({ ...formData, destination: e.target.value })
              }
              required
              variant="standard"
              fullWidth
            />
          </div>
          <div>
            <TextField
              label="Hospedagem"
              id="accommodation"
              value={formData.accommodation}
              onChange={(e) =>
                setFormData({ ...formData, accommodation: e.target.value })
              }
              required
              variant="standard"
              fullWidth
            />
          </div>
          <ImageUpload formData={formData} setFormData={setFormData} />
          <CustomFields formData={formData} setFormData={setFormData} />
          <div>
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center"
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
          </div>
          <TextField
            label="Preço"
            value={formData.price}
            onChange={(e) =>
              setFormData({ ...formData, price: e.target.value })
            }
            variant="standard"
            fullWidth
          />
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center justify-center"
          >
            {editingCard ? "Salvar Alterações" : "Criar Pacote"}
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
            selectedFeatures={formData.features}
          />
        )}
      </div>
    </div>
  );
};

export default CreateCard;
