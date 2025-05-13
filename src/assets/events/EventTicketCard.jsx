import React, { useState, useEffect, useRef } from "react";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase/firbase";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@mui/icons-material";
import { FcFullTrash } from "react-icons/fc";
import Swal from "sweetalert2";

const EventTicketCard = ({ isAdmin = false }) => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef(null);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "events"));
        const cardData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCards(cardData);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCards();
  }, []);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      icon: "warning",
      title: "Tem certeza?",
      text: "Você não poderá reverter isso!",
      showCancelButton: true,
      confirmButtonText: "Sim, deletar!",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        await deleteDoc(doc(db, "events", id));
        setCards((prev) => prev.filter((card) => card.id !== id));
      } catch (error) {
        console.error("Erro ao excluir: ", error);
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

  if (loading) return <p className="text-center">Carregando...</p>;
  if (cards.length === 0)
    return <p className="text-center">Nenhum evento disponível no momento.</p>;

  return (
    <div className="relative">
      <button
        onClick={scrollLeft}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10"
      >
        <ArrowLeftOutlined />
      </button>
      <div ref={containerRef} className="flex gap-4 overflow-x-auto px-6 py-4">
        {cards.map(({ id, Image, title, date, location, price }) => (
          <div
            key={id}
            className="relative w-80 bg-white shadow-xl border rounded-xl overflow-hidden ticket-shape shrink-0"
          >
            <img src={Image} alt={title} className="w-full h-40 object-cover" />
            <div className="p-4 space-y-2">
              <h3 className="text-lg font-bold">{title}</h3>
              <p className="text-sm text-gray-500">📍 {location}</p>
              <p className="text-sm text-gray-500">📅 {date}</p>
              <p className="text-sm font-semibold text-green-600">R$ {price}</p>
            </div>
            {isAdmin && (
              <button
                className="absolute top-2 right-2 text-red-500 hover:scale-110 transition-transform"
                onClick={() => handleDelete(id)}
              >
                <FcFullTrash size={24} />
              </button>
            )}
          </div>
        ))}
      </div>
      <button
        onClick={scrollRight}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10"
      >
        <ArrowRightOutlined />
      </button>
    </div>
  );
};

export default EventTicketCard;
