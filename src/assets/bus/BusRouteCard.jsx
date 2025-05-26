import React, { useState, useEffect, useRef } from "react";
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { getStorage, ref, deleteObject } from "firebase/storage";
import { db } from "../../firebase/firbase";
import Swal from "sweetalert2";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@mui/icons-material";

const BusRouteCard = ({ isAdmin = false }) => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingCard, setEditingCard] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const scrollContainerRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    mainImageUrl: "",
    departure: "",
    arrival: "",
    price: "",
  });

  const handleWhatsAppClick = (routeName) => {
    const whatsappNumber = "5511957700305";
    const message = `Olá! Gostaria de conhecer essa oferta para ${routeName}`;
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappLink, "_blank");
  };

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "buses"));
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
        const cardToDelete = cards.find((card) => card.id === id);
        if (cardToDelete?.mainImageUrl) {
          await deleteImageFromStorage(cardToDelete.mainImageUrl);
        }

        await deleteDoc(doc(db, "buses", id));
        setCards((prev) => prev.filter((card) => card.id !== id));
      } catch (error) {
        console.error("Erro ao excluir: ", error);
      }
    }
  };

  const deleteImageFromStorage = async (imageUrl) => {
    try {
      const storage = getStorage();
      // Exemplo de URL: https://firebasestorage.googleapis.com/v0/b/SEU-PROJETO.appspot.com/o/pasta%2Farquivo.jpg?alt=media&token=...
      const url = new URL(imageUrl);
      const decodedPath = decodeURIComponent(url.pathname);
      const pathStart = decodedPath.indexOf("/o/") + 3;
      const pathEnd =
        decodedPath.indexOf("?alt=") !== -1
          ? decodedPath.indexOf("?alt=")
          : decodedPath.length;
      if (pathStart < 3 || pathEnd <= pathStart) {
        console.error("Caminho da imagem inválido:", imageUrl);
        return;
      }
      const fullPath = decodedPath.substring(pathStart, pathEnd);
      console.log("Removendo imagem do Storage:", fullPath);

      const imageRef = ref(storage, fullPath);
      await deleteObject(imageRef);
      console.log("Imagem excluída com sucesso do Storage");
    } catch (error) {
      console.error("Erro ao excluir imagem do Firebase Storage:", error);
    }
  };

  const handleEdit = (card) => {
    setEditingCard(card);
    setFormData({ ...card }); // popula o formulário com os dados do card
    setEditModalOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const saveEdit = async () => {
    if (editingCard) {
      try {
        await updateDoc(doc(db, "buses", editingCard.id), formData);

        setCards((prevCards) =>
          prevCards.map((card) =>
            card.id === editingCard.id ? { ...card, ...formData } : card
          )
        );

        setEditModalOpen(false);
        setEditingCard(null);
        Swal.fire({
          icon: "success",
          title: "Sucesso!",
          text: "Card editado com sucesso!",
          showConfirmButton: false,
          timer: 1500,
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Erro!",
          text: "Erro ao editar o card.",
          showConfirmButton: false,
          timer: 1500,
        });
        console.error("Erro ao editar card:", error);
      }
    }
  };

  const scrollLeft = () => {
    scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  if (loading) return <div>Carregando...</div>;
  if (cards.length === 0)
    return <div>Nenhuma oferta rodoviária encontrada.</div>;

  return (
    <div>
      <div className="relative">
        {/* Botão de Scroll para Esquerda */}
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full shadow-md ml-2 p-2 hover:bg-gray-100"
        >
          <ArrowLeftOutlined />
        </button>

        {/* Contêiner de Scroll com Cards */}
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto space-x-4 ml-10 p-4 scrollbar-hide scroll-smooth"
        >
          {cards.map((card) => (
            <div
              key={card.id}
              className="bg-white shadow-md rounded-lg p-4 w-64 flex-shrink-0"
            >
              <img
                src={card.mainImageUrl}
                alt={card.name}
                className="w-full h-32 object-cover rounded-t-lg"
              />
              <h3 className="text-lg font-semibold mt-2">{card.name}</h3>
              <p className="text-gray-600">Partida: {card.departure}</p>
              <p className="text-gray-600">Chegada: {card.arrival}</p>
              <p className="text-gray-800 font-bold">Preço: R$ {card.price}</p>
              {isAdmin ? (
                <>
                  <button
                    onClick={() => handleEdit(card)}
                    className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(card.id)}
                    className="mt-2 ml-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Deletar
                  </button>
                </>
              ) : (
                <button
                  onClick={() => handleWhatsAppClick(card.name)}
                  className="mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  <i className="fab fa-whatsapp mr-2"></i>
                  Quero conhecer essa oferta
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Botão de Scroll para Direita */}
        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full shadow-md mr-2 p-2 hover:bg-gray-100"
        >
          <ArrowRightOutlined />
        </button>
      </div>

      {/* Modal de edição */}
      {editModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Editar Oferta</h2>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Nome"
              className="w-full border mb-2 px-3 py-2 rounded"
            />
            <input
              type="text"
              name="mainImageUrl"
              value={formData.mainImageUrl}
              disabled
              onChange={handleChange}
              placeholder="URL da Imagem"
              className="w-full border mb-2 px-3 py-2 rounded"
            />
            <input
              type="text"
              name="departure"
              value={formData.departure}
              onChange={handleChange}
              placeholder="Partida"
              className="w-full border mb-2 px-3 py-2 rounded"
            />
            <input
              type="text"
              name="arrival"
              value={formData.arrival}
              onChange={handleChange}
              placeholder="Chegada"
              className="w-full border mb-2 px-3 py-2 rounded"
            />
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Preço"
              className="w-full border mb-4 px-3 py-2 rounded"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setEditModalOpen(false)}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancelar
              </button>
              <button
                onClick={saveEdit}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BusRouteCard;
