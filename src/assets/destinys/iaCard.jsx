import React, { useState } from "react";
import axios from "axios";

const API_KEY = "";

const IaCard = () => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [destination, setDestination] = useState([]);

  const handleSearch = async () => {
    if (!input.trim()) return;

    setLoading(true);
    setDestination(null);

    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content:
                "Você é um assistente de viagens que sugere destinos baseados nas preferências do usuário.",
            },
            {
              role: "user",
              content: `Sugira um destino de viagem baseado nesta preferência: ${input}. Dê o nome do local, uma breve descrição e o país onde fica.`,
            },
          ],
          max_tokens: 100,
        },
        {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      const responseText = response.data.choices[0].message.content;
      const [name, description, country] = responseText.split("\n");

      setDestination({
        name: name.replace("Nome: ", ""),
        description: description.replace("Descrição: ", ""),
        country: country.replace("País: ", ""),
      });
    } catch (error) {
      console.error("Erro ao buscar destino:", error);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">
        Ajuda para Escolher um Destino 🌍
      </h1>
      <p className="text-gray-600 mb-4 text-center">
        Informe suas preferências (ex: praia, frio, cidade histórica) e descubra
        um destino recomendado!
      </p>

      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Ex: Quero um destino de praia com clima quente"
          className="p-3 border rounded-md w-80 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Buscar
        </button>
      </div>

      {loading && <p className="text-gray-500">Buscando destino...</p>}

      {destination && (
        <div className="bg-white p-6 rounded-lg shadow-md max-w-md text-center">
          <h2 className="text-xl font-semibold">{destination.name}</h2>
          <p className="text-gray-600">{destination.description}</p>
          <p className="text-gray-500 italic mt-2">📍 {destination.country}</p>
        </div>
      )}
    </div>
  );
};

export default IaCard;
