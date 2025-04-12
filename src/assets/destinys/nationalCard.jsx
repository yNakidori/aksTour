import React, { useState, useEffect, useRef } from "react";
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase/firbase";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@mui/icons-material";
import { HiOutlineXCircle } from "react-icons/hi";
import Swal from "sweetalert2";

const NationalCard = ({ isAdmin = false }) => {
  // Recebe a prop isAdmin
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingCard, setEditingCard] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const containerRef = useRef(null);

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

  const handleDelete = async (id) => {
    const handleDelete = await Swal.fire({
      icon: "warning",
      title: "Tem certeza?",
      text: "Você não poderá reverter isso!",
      showCancelButton: true,
      confirmButtonText: "Sim, deletar!",
      cancelButtonText: "Cancelar",
    });

    if (handleDelete.isConfirmed) {
      // Verifica se o usuário confirmou a exclusão
      try {
        await deleteDoc(doc(db, "nationalOffers", id));
        setCards(cards.filter((card) => card.id !== id));
      } catch (error) {
        console.error("Erro ao excluir:", error);
      }
    }
  };

  const handleEdit = (card) => {
    // Edição
    setEditingCard(card);
    setEditModalOpen(true);
    console.log("Editando:", card);
  };

  const saveEdit = async () => {
    if (editingCard) {
      try {
        await updateDoc(doc(db, "nationalOffers", editingCard.id), {
          destiny: editingCard.destiny,
          date: editingCard.date,
          price: editingCard.price,
          Image: editingCard.Image,
        });

        setCards((prevCards) =>
          prevCards.map((card) =>
            card.id === editingCard.id ? editingCard : card
          )
        );

        setEditModalOpen(false);
        setEditingCard(null);
        console.log("Card editado:", editingCard);
        Swal.fire({
          icon: "success",
          title: "Sucesso",
          text: "O cartão foi editado com sucesso.",
          confirmButtonText: "OK",
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Erro",
          text: "Não foi possível editar o cartão.",
          confirmButtonText: "OK",
        });
        console.error("Erro ao editar:", error);
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
                className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full text-sm hover:bg-red-700 transition flex items-center justify-center shadow-md"
                title="Excluir oferta"
              >
                <HiOutlineXCircle className="w-4 h-4" />
              </button>
            )}

            <span
              style={{ backgroundColor: "#337bff" }}
              className="absolute top-2 left-2  text-white text-sm font-semibold px-3 py-1 rounded-lg"
            >
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

              {/* Renderiza o botão de editar apenas se for admin */}
              {isAdmin && (
                <button
                  onClick={() => handleEdit(card)}
                  className="absolute top-2 right-12 bg-blue-600 text-white p-1 rounded-full text-xs hover:bg-blue-700 transition"
                >
                  ✏️ <span className="font-poppins">EDITAR</span>
                </button>
              )}
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

      {/* Modal de edição */}
      {editModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Editar Oferta</h2>
            <input
              type="text"
              value={editingCard.destiny}
              onChange={(e) =>
                setEditingCard({ ...editingCard, destiny: e.target.value })
              }
              placeholder="Destino"
              className="w-full p-2 border border-gray-300 rounded mb-4"
            />
            <input
              type="text"
              value={editingCard.date}
              onChange={(e) =>
                setEditingCard({ ...editingCard, date: e.target.value })
              }
              placeholder="Data"
              className="w-full p-2 border border-gray-300 rounded mb-4"
            />
            <input
              type="text"
              value={editingCard.price}
              onChange={(e) =>
                setEditingCard({ ...editingCard, price: e.target.value })
              }
              placeholder="Preço"
              className="w-full p-2 border border-gray-300 rounded mb-4"
            />
            <button
              onClick={saveEdit}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Salvar
            </button>
            <button
              onClick={() => setEditModalOpen(false)}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition ml-2"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NationalCard;
