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
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [featureOptions] = useState([
    "3 Noites",
    "Café da manhã incluso",
    "Tour Local",
    "Wi-Fi Livre",
    "Jantar incluso",
    "Transfer do aeroporto ao hotel",
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
      if (features.length > 3) return prev; // Limita a seleção a 3 opções
      return { ...prev, features };
    });
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
        contry: formData.country,
        place: formData.place,
        price: formData.price,
        features: formData.features,
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
        <div className="mb-4">
          <label
            className="block text-gray-700 font-semibold mb-2"
            htmlFor="image"
          >
            Upload de Imagem
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          />
          {formData.imageUrl && (
            <img
              src={formData.imageUrl}
              alt="Preview"
              className="mt-4 h-32 w-32 object-cover mx-auto"
            />
          )}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-semibold mb-2"
            htmlFor="country"
          >
            País
          </label>
          <input
            type="text"
            id="country"
            name="country"
            value={formData.country}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, country: e.target.value }))
            }
            className="w-full p-2 border border-gray-300 rounded-lg"
            placeholder="Local (ex: França)"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-semibold mb-2"
            htmlFor="place"
          >
            Local
          </label>
          <input
            type="text"
            id="place"
            name="place"
            value={formData.place}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, place: e.target.value }))
            }
            className="w-full p-2 border border-gray-300 rounded-lg"
            placeholder="Local (ex: Paris)"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-semibold mb-2"
            htmlFor="price"
          >
            Preço
          </label>
          <input
            type="text"
            id="price"
            name="price"
            value={formData.price}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, price: e.target.value }))
            }
            className="w-full p-2 border border-gray-300 rounded-lg"
            placeholder="Preço (ex: R$499)"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Features
          </label>
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
        </div>
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors duration-200"
        >
          Criar Card
        </button>
      </form>

      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Selecione até 3 Features
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
