import React, { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../firebase/firbase";
import { getStorage, ref as storageRef, deleteObject } from "firebase/storage";
import { TextField } from "@mui/material";
import { FcFullTrash, FcSupport } from "react-icons/fc";
import Swal from "sweetalert2";

const InternationalCard = ({ isAdmin = false, filterType = "all" }) => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingCard, setEditingCard] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "internationalOffers"));
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

  const deleteImageFromStorage = async (imageUrl) => {
    try {
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
      const imageRef = storageRef(getStorage(), fullPath);
      await deleteObject(imageRef);
    } catch (error) {
      console.error("Erro ao excluir imagem do Firebase Storage:", error);
    }
  };

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
        if (cardToDelete?.Image) {
          await deleteImageFromStorage(cardToDelete.Image);
        }
        await deleteDoc(doc(db, "internationalOffers", id));
        setCards(cards.filter((card) => card.id !== id));
      } catch (error) {
        console.error("Erro ao excluir:", error);
      }
    }
  };

  const handleEdit = (card) => {
    setEditingCard(card);
    setEditModalOpen(true);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadingImage(true);
      try {
        const storageReference = ref(storage, `internationalOffers/${file.name}`);
        await uploadBytes(storageReference, file);
        const url = await getDownloadURL(storageReference);
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

  const saveEdit = async () => {
    if (editingCard) {
      try {
        await updateDoc(doc(db, "internationalOffers", editingCard.id), {
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

  const filteredCards = cards.filter((card) => {
    if (filterType === "package") return card.package;
    if (filterType === "ticket") return card.ticket;
    return true;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando ofertas...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto">
      {/* Grid responsivo para melhor disposição dos cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4">
        {filteredCards.map((card) => (
          <div
            key={card.id}
            className="relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl hover:scale-105 transition-all duration-300 group"
          >
            <div className="relative overflow-hidden">
              <img
                src={card.Image}
                alt={card.destiny}
                className="w-full h-52 object-cover group-hover:scale-110 transition-transform duration-300"
              />
              
              {/* Overlay gradient para melhor legibilidade */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>

              {/* Botão de excluir */}
              {isAdmin && (
                <button
                  onClick={() => handleDelete(card.id)}
                  className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm text-red-600 p-2 rounded-full text-sm hover:bg-red-100 transition-all duration-200 flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100"
                  title="Excluir oferta"
                >
                  <FcFullTrash className="w-5 h-5" />
                </button>
              )}

              {/* Botão de editar */}
              {isAdmin && (
                <button
                  onClick={() => handleEdit(card)}
                  className="absolute top-2 right-12 bg-white/90 backdrop-blur-sm text-blue-600 p-2 rounded-full text-sm hover:bg-blue-100 transition-all duration-200 flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100"
                  title="Editar oferta"
                >
                  <FcSupport className="w-5 h-5" />
                </button>
              )}

              {/* Tag de tipo */}
              {card.package && (
                <span
                  style={{ backgroundColor: "#337bff" }}
                  className="absolute top-2 left-2 text-white text-sm font-semibold px-3 py-1 rounded-lg shadow-lg"
                >
                  Pacote
                </span>
              )}
              {!card.package && card.ticket && (
                <span
                  style={{ backgroundColor: "#22c55e" }}
                  className="absolute top-2 left-2 text-white text-sm font-semibold px-3 py-1 rounded-lg shadow-lg"
                >
                  Passagem
                </span>
              )}
            </div>

            <div className="p-5">
              <h2 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">
                {card.destiny}
              </h2>
              <p className="text-gray-600 flex items-center gap-2 mt-1 mb-3">
                <span className="text-blue-500">✈️</span> 
                <span className="text-sm">{card.date}</span>
              </p>
              <div className="border-t border-gray-100 pt-3">
                <p className="text-gray-500 text-sm mb-1">
                  {card.package ? "Pacotes a partir de" : "Passagens a partir de"}
                </p>
                <p className="text-2xl font-bold text-blue-600">
                  R$ {card.price}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Indicador de cards vazios com melhor visual */}
      {filteredCards.length === 0 && (
        <div className="text-center py-12">
          <div className="bg-gray-50 rounded-2xl p-8 max-w-md mx-auto">
            <div className="text-gray-400 text-6xl mb-4">🌍</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Nenhuma oferta internacional disponível
            </h3>
            <p className="text-gray-500">
              Aguarde novas ofertas ou adicione uma nova oferta internacional.
            </p>
          </div>
        </div>
      )}

      {/* Modal de edição */}
      {editModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Editar Oferta</h2>

            {/* Preview da imagem atual */}
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Imagem Atual
              </label>
              <img
                src={editingCard?.Image}
                alt={editingCard?.destiny}
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
              id="destiny"
              label="Destino"
              type="text"
              value={editingCard?.destiny || ""}
              variant="standard"
              fullWidth
              onChange={(e) =>
                setEditingCard({ ...editingCard, destiny: e.target.value })
              }
              placeholder="Destino"
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
              value={editingCard?.date || ""}
              onChange={(e) =>
                setEditingCard({ ...editingCard, date: e.target.value })
              }
              style={{ marginBottom: "16px" }}
            />

            <TextField
              className="mt-4"
              type="text"
              value={editingCard?.price || ""}
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

export default InternationalCard;