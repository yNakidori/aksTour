import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firbase";
import {
  FaMapMarkerAlt,
  FaSuitcase,
  FaUserFriends,
  FaMoon,
  FaSun,
  FaWhatsapp,
} from "react-icons/fa";

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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 bg-gradient-to-br from-blue-100 to-blue-200 gap-8 p-8">
      {cards.map((card) => {
        const whatsappNumber = "5511957700305";
        const whatsappLink = `https://wa.me/${whatsappNumber}?text=Olá! Gostaria de saber sobre o pacote de ${card.destination}`;
        const handleWhatsAppClick = () => {
          window.open(whatsappLink, "_blank");
        };

        return (
          <div
            key={card.id}
            className="flex flex-col border border-blue-200 shadow-xl rounded-2xl overflow-hidden bg-white/90 hover:shadow-2xl transition-shadow duration-300 min-h-[520px] max-h-[520px]"
          >
            <div className="relative h-48 w-full overflow-hidden">
              <img
                src={card.image}
                alt={card.destination}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
              <div className="absolute top-2 right-2 bg-blue-600/80 text-white px-3 py-1 rounded-full text-xs font-semibold shadow">
                {card.price}
              </div>
            </div>
            <div className="flex-1 flex flex-col p-6 overflow-auto">
              <div className="mb-2">
                <h2 className="text-xl font-bold text-blue-900 flex items-center gap-2">
                  <FaMapMarkerAlt className="text-blue-500" />
                  {card.destination}
                </h2>
                {card.accommodation && (
                  <div className="text-base font-semibold text-blue-500 ml-7 mb-1">
                    {card.accommodation}
                  </div>
                )}
              </div>
              <ul className="mb-4 space-y-2 max-h-20 overflow-y-auto pr-1">
                {card.features?.map((feature, i) => (
                  <li key={i} className="text-gray-700 flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full inline-block mr-2"></span>
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="mb-4 text-gray-700 text-sm space-y-1">
                <div className="flex items-center gap-2">
                  <FaSun className="text-yellow-400" />
                  <span className="font-semibold">Dias:</span>
                  {card.customFields?.days || 0}
                </div>
                <div className="flex items-center gap-2">
                  <FaMoon className="text-indigo-400" />
                  <span className="font-semibold">Noites:</span>
                  {card.customFields?.nights || 0}
                </div>
                <div className="flex items-center gap-2">
                  <FaUserFriends className="text-blue-400" />
                  <span className="font-semibold">Pessoas:</span>
                  {card.customFields?.people || 0}
                </div>
                <div className="flex items-center gap-2">
                  <FaSuitcase className="text-pink-400" />
                  <span className="font-semibold">Malas:</span>
                  {card.customFields?.luggage || 0}
                </div>
              </div>
              <div className="mt-auto">
                <button
                  onClick={handleWhatsAppClick}
                  className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white py-2 rounded-xl font-semibold text-lg shadow transition-colors duration-200"
                >
                  <FaWhatsapp className="text-2xl" />
                  Agende agora
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PricingCards;
