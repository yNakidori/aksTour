import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firbase";

const NationalCard = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "nationalOffers"));
        const cardData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setCards(cardData);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
        setLoading(false);
      }
    };

    fetchCards();
  }, []);

  if (loading) {
    return <p className="text-center">Carregando...</p>;
  }

  if (cards.length === 0) {
    return <p className="text-center">Nenhuma oferta disponível no momento.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {cards.map((card) => (
        <div
          key={card.id}
          className="border border-gray-300 shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
        >
          <img
            src={card.Image}
            alt={card.destiny}
            className="w-full h-48 object-cover"
          />
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-800">{card.destiny}</h2>
            <p className="text-gray-600 flex items-center gap-1 mt-1">
              <span>✈️</span> {card.date}
            </p>
            <p className="text-gray-500 text-sm mt-3">Pacotes a partir de</p>
            <p className="text-2xl font-bold">R$ {card.price}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NationalCard;
