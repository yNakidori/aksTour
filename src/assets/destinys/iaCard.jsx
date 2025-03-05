import React, { useState } from "react";
import axios from "axios";

const IaCard = () => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [destination, setDestination] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    if (!input.trim()) return;

    setLoading(true);
    setDestination(null);
    setError(null);

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
              content: `Sugira um destino de viagem baseado nesta preferência: ${input}. 
                Dê o nome do local, uma breve descrição, o país onde fica e uma estimativa de valor para visitar o local.
                Formate a resposta no seguinte padrão: Nome: [nome] | Descrição: [descrição] | País: [país] | Estimativa de valor: [valor]`,
            },
          ],
          max_tokens: 200,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      const responseText = response.data.choices[0]?.message?.content || "";
      const regex =
        /Nome: (.*?) \| Descrição: (.*?) \| País: (.*?) \| Estimativa de valor: (.*)/;
      const match = responseText.match(regex);

      if (match) {
        setDestination({
          name: match[1],
          description: match[2],
          country: match[3],
          price: match[4],
        });
      } else {
        setError(
          "Não foi possível entender a resposta da IA. Tente novamente!"
        );
      }
    } catch (error) {
      console.error("Erro ao buscar destino:", error);
      setError(
        "Ocorreu um erro ao buscar o destino. Tente novamente mais tarde."
      );
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-lg text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-3">
          Escolha Seu Próximo Destino ✈️
        </h1>
        <p className="text-gray-600 mb-6">
          Informe suas preferências (ex: praia, frio, cidade histórica) e
          descubra um destino incrível!
        </p>

        <div className="flex items-center bg-gray-100 rounded-lg p-2 shadow-sm mb-4">
          <input
            type="text"
            placeholder="Ex: Quero um destino de montanha com neve"
            className="flex-grow bg-transparent p-3 text-gray-700 outline-none"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>

        <button
          onClick={handleSearch}
          className="w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-lg shadow-md hover:opacity-90 transition duration-300"
          disabled={loading}
        >
          {loading ? "Buscando..." : "Buscar"}
        </button>

        {loading && (
          <p className="text-gray-500 mt-4 animate-pulse">
            🔎 Procurando o melhor destino...
          </p>
        )}

        {error && <p className="text-red-500 mt-4">{error}</p>}

        {destination && (
          <div className="mt-6 bg-blue-50 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-blue-700">
              {destination.name}
            </h2>
            <p className="text-gray-600 mt-2">{destination.description}</p>
            <p className="text-gray-500 italic mt-3">
              📍 {destination.country}
            </p>
            <p className="text-blue-700 font-bold mt-3">
              💰 {destination.price}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default IaCard;
