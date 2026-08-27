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

const palette = {
  navy: "#0E2C45",
  gold: "#B78E46",
  pale: "#F6FBF8",
  subtle: "#E6F0EC",
};

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
    return (
      <div className="text-center py-12">
        <div className="flex flex-col items-center space-y-4">
          <div
            className="animate-spin rounded-full h-12 w-12 border-b-2"
            style={{ borderColor: palette.gold }}
          ></div>
          <p className="font-medium" style={{ color: palette.navy }}>
            Carregando ofertas...
          </p>
        </div>
      </div>
    );
  }

  if (cards.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-lg font-medium" style={{ color: palette.navy }}>
          Nenhuma oferta disponível no momento.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cards.map((card) => {
        const whatsappNumber = "5511957700305";
        const whatsappLink = `https://wa.me/${whatsappNumber}?text=Olá! Gostaria de saber sobre o pacote de ${card.destination}`;
        const handleWhatsAppClick = () => {
          window.open(whatsappLink, "_blank");
        };

        return (
          <div
            key={card.id}
            className="flex flex-col rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 min-h-[520px] max-h-[520px]"
            style={{
              backgroundColor: "white",
              border: `1px solid ${palette.navy}15`,
              boxShadow: "0 4px 20px rgba(14,44,69,0.06)",
            }}
          >
            <div className="relative h-48 w-full overflow-hidden">
              <img
                src={card.image}
                alt={card.destination}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
              <div
                className="absolute top-3 right-3 text-white px-4 py-1.5 rounded-full text-xs font-semibold shadow-lg"
                style={{ backgroundColor: palette.gold }}
              >
                {card.price}
              </div>
            </div>
            <div className="flex-1 flex flex-col p-6 overflow-auto">
              <div className="mb-2">
                <h2
                  className="text-xl font-bold flex items-center gap-2"
                  style={{ color: palette.navy }}
                >
                  <FaMapMarkerAlt style={{ color: palette.gold }} />
                  {card.destination}
                </h2>
                {card.accommodation && (
                  <div
                    className="text-base font-semibold ml-7 mb-1"
                    style={{ color: palette.gold }}
                  >
                    {card.accommodation}
                  </div>
                )}
              </div>
              <ul className="mb-4 space-y-2 max-h-20 overflow-y-auto pr-1">
                {card.features?.map((feature, i) => (
                  <li
                    key={i}
                    className="flex items-center"
                    style={{ color: `${palette.navy}99` }}
                  >
                    <span
                      className="w-2 h-2 rounded-full inline-block mr-2"
                      style={{ backgroundColor: palette.gold }}
                    ></span>
                    {feature}
                  </li>
                ))}
              </ul>
              <div
                className="mb-4 text-sm space-y-1 p-3 rounded-lg"
                style={{
                  backgroundColor: `${palette.gold}15`,
                  color: palette.navy,
                }}
              >
                <div className="flex items-center gap-2">
                  <FaSun style={{ color: palette.gold }} />
                  <span className="font-semibold">Dias:</span>
                  {card.customFields?.days || 0}
                </div>
                <div className="flex items-center gap-2">
                  <FaMoon style={{ color: palette.gold }} />
                  <span className="font-semibold">Noites:</span>
                  {card.customFields?.nights || 0}
                </div>
                <div className="flex items-center gap-2">
                  <FaUserFriends style={{ color: palette.gold }} />
                  <span className="font-semibold">Pessoas:</span>
                  {card.customFields?.people || 0}
                </div>
                <div className="flex items-center gap-2">
                  <FaSuitcase style={{ color: palette.gold }} />
                  <span className="font-semibold">Malas:</span>
                  {card.customFields?.luggage || 0}
                </div>
              </div>
              <div className="mt-auto">
                <button
                  onClick={handleWhatsAppClick}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-lg shadow transition-all duration-200 hover:opacity-90"
                  style={{
                    backgroundColor: palette.gold,
                    color: palette.pale,
                  }}
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
