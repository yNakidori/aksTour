import React, { useState, useEffect, useRef } from "react";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase/firbase";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@mui/icons-material";

const InternationalCard = ({ isAdmin = false }) => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef(null);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const querySnapshot = await getDocs(
          collection(db, "internationalOffers")
        );
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

  const handleDelete = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir este pacote?")) {
      try {
        await deleteDoc(doc(db, "internationalOffers", id));
        setCards(cards.filter((card) => card.id !== id));
      } catch (error) {
        console.error("Erro ao excluir:", error);
      }
    }
  };

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  if (loading) {
    return <p className="text-center">Carregando...</p>;
  }

  if (cards.length === 0) {
    return <p className="text-center">Nenhuma oferta disponível no momento.</p>;
  }

  return (
    <div className="relative w-full max-w-5xl mx-auto">
      <button
        onClick={scrollLeft}
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-gray-900 text-white p-3 rounded-full shadow-lg hover:bg-gray-700 transition z-10"
      >
        <ArrowLeftOutlined />
      </button>

      <div
        ref={containerRef}
        className="flex gap-6 p-4 overflow-hidden scroll-smooth no-scrollbar"
      >
        {cards.map((card) => (
          <div
            key={card.id}
            className="relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 w-72 shrink-0"
          >
            <img
              src={card.Image}
              alt={card.destiny}
              className="w-full h-52 object-cover"
            />

            {/* Renderiza o botão de excluir apenas se for admin */}
            {isAdmin && (
              <button
                onClick={() => handleDelete(card.id)}
                className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full text-xs hover:bg-red-700 transition"
              >
                ❌
              </button>
            )}

            <span className="absolute top-2 left-2 bg-orange-500 text-white text-sm font-semibold px-3 py-1 rounded-lg">
              Pacote
            </span>

            <div className="p-4">
              <h2 className="text-lg font-bold text-gray-800">
                {card.destiny}
              </h2>
              <p className="text-gray-600 flex items-center gap-1 mt-1">
                ✈️ <span>{card.date}</span>
              </p>
              <p className="text-gray-500 text-sm mt-2">Pacotes a partir de</p>
              <p className="text-2xl font-bold text-gray-800">
                R$ {card.price}
              </p>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={scrollRight}
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-gray-900 text-white p-3 rounded-full shadow-lg hover:bg-gray-700 transition z-10"
      >
        <ArrowRightOutlined />
      </button>
    </div>
  );
};

export default InternationalCard;
