import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firbase";

const PricingCards = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "pricingCards"));
        const cardData = querySnapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          .filter((card) => card.active); // Filtrar apenas os cards com active = true

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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 bg-blue-50 gap-6 p-6">
      {cards.map((card) => {
        const whatsappNumber = "5511957700305";
        const whatsappLink = `https://wa.me/${whatsappNumber}?text=Olá! Gostaria de saber sobre o pacote de ${card.place}`;
        const handleWhatsAppClick = () => {
          window.open(whatsappLink, "_blank");
        };

        return (
          <div
            key={card.id}
            className="border border-gray-300 shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <img
              src={card.image}
              alt={card.place}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-800">{card.contry}</h2>
              <h3 className="text-xl font-bold text-gray-800">{card.place}</h3>
              <ul className="mb-4 space-y-2">
                {card.features?.map((feature, i) => (
                  <li key={i} className="text-gray-700 flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full inline-block mr-2"></span>
                    {feature}
                  </li>
                ))}
              </ul>
              {/* Campos personalizados */}
              <div className="mb-4 text-gray-700 text-sm space-y-1">
                <div>
                  <span className="font-semibold">Dias:</span>{" "}
                  {card.customFields?.days || 0}
                </div>
                <div>
                  <span className="font-semibold">Noites:</span>{" "}
                  {card.customFields?.nights || 0}
                </div>
                <div>
                  <span className="font-semibold">Pessoas:</span>{" "}
                  {card.customFields?.people || 0}
                </div>
                <div>
                  <span className="font-semibold">Malas:</span>{" "}
                  {card.customFields?.luggage || 0}
                </div>
              </div>
              <button
                onClick={handleWhatsAppClick}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Agende agora
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PricingCards;
