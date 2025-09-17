import React, { useState, useEffect, useRef } from "react";
import { collection, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../firebase/firbase";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@mui/icons-material";
import { FcFullTrash, FcSupport } from "react-icons/fc";
import { TextField } from "@mui/material";
import Swal from "sweetalert2";

const EventTicketCard = ({ isAdmin = false }) => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingCard, setEditingCard] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
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

  // Função para iniciar a edição de um evento
  const handleEdit = (card) => {
    setEditingCard(card);
    setEditModalOpen(true);
    console.log("Editando:", card);
  };

  // Função para fazer upload da nova imagem
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadingImage(true);
      try {
        const storageRef = ref(storage, `events/${file.name}`);
        await uploadBytes(storageRef, file);
        const url = await getDownloadURL(storageRef);
        setEditingCard({ ...editingCard, Image: url });
        setUploadingImage(false);
      } catch (error) {
        console.error("Erro ao fazer upload da imagem:", error);
        setUploadingImage(false);
        Swal.fire({
          icon: "error",
          title: "Erro",
          text: "Não foi possível fazer upload da imagem.",
          confirmButtonText: "OK",
        });
      }
    }
  };

  // Função para salvar as alterações de um evento
  const saveEdit = async () => {
    if (editingCard) {
      try {
        await updateDoc(doc(db, "events", editingCard.id), {
          title: editingCard.title,
          date: editingCard.date,
          location: editingCard.location,
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
        console.log("Evento editado:", editingCard);
        Swal.fire({
          icon: "success",
          title: "Sucesso",
          text: "O evento foi editado com sucesso.",
          confirmButtonText: "OK",
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Erro",
          text: "Não foi possível editar o evento.",
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
              <>
                <button
                  className="absolute top-2 right-2 text-red-500 hover:scale-110 transition-transform"
                  onClick={() => handleDelete(id)}
                  title="Excluir evento"
                >
                  <FcFullTrash size={24} />
                </button>
                <button
                  className="absolute top-2 right-10 bg-white text-blue-500 hover:scale-110 transition-transform p-1 rounded-full shadow-md"
                  onClick={() => handleEdit({ id, Image, title, date, location, price })}
                  title="Editar evento"
                >
                  <FcSupport size={20} />
                </button>
              </>
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

      {/* Modal de edição */}
      {editModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Editar Evento</h2>

            {/* Preview da imagem atual */}
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Imagem Atual
              </label>
              <img
                src={editingCard.Image}
                alt={editingCard.title}
                className="w-full h-32 object-cover rounded-lg border"
              />
            </div>

            {/* Upload de nova imagem */}
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Alterar Imagem
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={uploadingImage}
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring focus:ring-blue-200"
              />
              {uploadingImage && (
                <p className="text-blue-600 text-sm mt-1">Fazendo upload...</p>
              )}
            </div>

            <TextField
              id="title"
              label="Título"
              type="text"
              value={editingCard.title}
              variant="standard"
              fullWidth
              onChange={(e) =>
                setEditingCard({ ...editingCard, title: e.target.value })
              }
              placeholder="Título do evento"
              style={{ marginBottom: "16px" }}
            />

            <TextField
              className="mt-4"
              id="date"
              label="Data"
              type="date"
              variant="standard"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={editingCard.date}
              onChange={(e) =>
                setEditingCard({ ...editingCard, date: e.target.value })
              }
              style={{ marginBottom: "16px" }}
            />

            <TextField
              className="mt-4"
              id="location"
              label="Local"
              type="text"
              value={editingCard.location}
              variant="standard"
              fullWidth
              onChange={(e) =>
                setEditingCard({ ...editingCard, location: e.target.value })
              }
              placeholder="Local do evento"
              style={{ marginBottom: "16px" }}
            />

            <TextField
              className="mt-4"
              id="price"
              label="Preço"
              type="text"
              value={editingCard.price}
              variant="standard"
              fullWidth
              onChange={(e) => {
                setEditingCard({ ...editingCard, price: e.target.value });
              }}
              style={{ marginBottom: "16px" }}
              placeholder="Preço"
            />

            <div className="flex gap-2 mt-4">
              <button
                onClick={saveEdit}
                disabled={uploadingImage}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition disabled:bg-blue-300"
              >
                Salvar
              </button>
              <button
                onClick={() => setEditModalOpen(false)}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventTicketCard;
