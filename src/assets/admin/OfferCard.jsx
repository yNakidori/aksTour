import React, { useEffect, useState } from "react";
import { Modal, Box, TextField, Button } from "@mui/material";
import { db } from "../../firebase/firbase";
import {
  deleteDoc,
  updateDoc,
  getDocs,
  collection,
  doc,
} from "firebase/firestore";
import { getStorage, ref, deleteObject } from "firebase/storage";
import Swal from "sweetalert2";
import {
  FaMapMarkerAlt,
  FaSuitcase,
  FaUserFriends,
  FaMoon,
  FaSun,
} from "react-icons/fa";

const OfferCard = ({
  cards,
  setCards,
  selectedCards,
  setSelectedCards,
  onEdit,
}) => {
  // Estado para modal de edição
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editCard, setEditCard] = useState(null);
  const [editForm, setEditForm] = useState({
    destination: "",
    accommodation: "",
    price: "",
    features: [],
    customFields: {
      days: "",
      nights: "",
      people: "",
      luggage: "",
    },
  });

  useEffect(() => {
    const fetchCards = async () => {
      const snapshot = await getDocs(collection(db, "pricingCards"));
      const fetchedCards = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCards(fetchedCards);
      setSelectedCards(
        fetchedCards.filter((card) => card.active).map((card) => card.id)
      );
    };

    fetchCards();
  }, [setCards, setSelectedCards]);

  const handleSelectCard = async (cardId) => {
    const isSelected = selectedCards.includes(cardId);
    const newSelection = isSelected
      ? selectedCards.filter((id) => id !== cardId)
      : [...selectedCards, cardId];

    if (newSelection.length > 3) {
      Swal.fire({
        icon: "info",
        title: "Oops...",
        text: "Você só pode selecionar até 3 cards para a Página Inicial.",
      });
      return;
    }

    setSelectedCards(newSelection);
    await updateDoc(doc(db, "pricingCards", cardId), { active: !isSelected });
  };

  const handleDeleteCard = async (cardId) => {
    const confirmDelete = await Swal.fire({
      icon: "warning",
      title: "Tem certeza?",
      text: "Você não poderá reverter isso!",
      showCancelButton: true,
      confirmButtonText: "Sim, deletar!",
      cancelButtonText: "Cancelar",
    });

    if (confirmDelete.isConfirmed) {
      try {
        // Busca o card para pegar a URL da imagem
        const cardToDelete = cards.find((card) => card.id === cardId);
        if (cardToDelete?.image) {
          await deleteImageFromStorage(cardToDelete.image);
        }
        await deleteDoc(doc(db, "pricingCards", cardId));
        setCards((prevCards) => prevCards.filter((card) => card.id !== cardId));
        setSelectedCards((prevSelected) =>
          prevSelected.filter((id) => id !== cardId)
        );
        Swal.fire("Deletado!", "Seu card foi deletado com sucesso.", "success");
      } catch (error) {
        console.error("Erro ao deletar card:", error);
        Swal.fire({
          icon: "error",
          title: "Erro ao deletar card",
          text: error.message,
        });
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

  // Abrir modal e preencher dados
  const handleOpenEditModal = (card) => {
    setEditCard(card);
    setEditForm({
      destination: card.destination || "",
      accommodation: card.accommodation || "",
      price: card.price || "",
      features: card.features || [],
      customFields: {
        days: card.customFields?.days || "",
        nights: card.customFields?.nights || "",
        people: card.customFields?.people || "",
        luggage: card.customFields?.luggage || "",
      },
    });
    setEditModalOpen(true);
  };

  // Salvar edição
  const handleSaveEdit = async () => {
    try {
      await updateDoc(doc(db, "pricingCards", editCard.id), {
        destination: editForm.destination,
        accommodation: editForm.accommodation,
        price: editForm.price,
        features: editForm.features,
        customFields: editForm.customFields,
      });
      setCards((prev) =>
        prev.map((c) =>
          c.id === editCard.id
            ? {
                ...c,
                ...editForm,
                customFields: { ...editForm.customFields },
              }
            : c
        )
      );
      setEditModalOpen(false);
      setEditCard(null);
      Swal.fire({
        icon: "success",
        title: "Editado!",
        text: "Card editado com sucesso.",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Erro!",
        text: "Não foi possível editar o card.",
      });
    }
  };

  // Atualizar campos do formulário
  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    if (["days", "nights", "people", "luggage"].includes(name)) {
      setEditForm((prev) => ({
        ...prev,
        customFields: { ...prev.customFields, [name]: value },
      }));
    } else {
      setEditForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Atualizar features (simples, pode ser melhorado com um modal de seleção)
  const handleFeaturesChange = (e) => {
    setEditForm((prev) => ({
      ...prev,
      features: e.target.value.split(",").map((f) => f.trim()),
    }));
  };

  return (
    <div className="w-full mt-20 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card) => (
          <div
            key={card.id}
            className={`flex flex-col h-full backdrop-blur-md bg-black/30 border border-white/20 rounded-2xl shadow-lg p-4 transition-all duration-300 hover:shadow-2xl ${
              selectedCards.includes(card.id) ? "border-green-500/80" : ""
            }`}
          >
            {/* IMAGEM */}
            <div className="relative h-40 rounded-xl overflow-hidden mb-4">
              <img
                src={card.image}
                alt={card.place}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105 rounded-xl"
              />
            </div>

            {/* TÍTULO, HOSPEDAGEM E PREÇO */}
            <div className="text-white mb-2">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <FaMapMarkerAlt className="text-red-400" />
                {card.destination}
              </h3>
              {card.accommodation && (
                <div className="text-base font-semibold text-blue-300 ml-7 mb-1">
                  {card.accommodation}
                </div>
              )}
              <p className="text-green-400 text-lg font-semibold mt-1">
                {card.price}
              </p>
            </div>

            {/* BENEFÍCIOS */}
            <div className="text-gray-200 text-sm mt-2">
              <h4 className="font-semibold mb-1">Inclui:</h4>
              <ul className="list-disc list-inside space-y-1 max-h-28 overflow-y-auto pr-1">
                {card.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>

            {/* DETALHES */}
            <div className="text-gray-300 text-sm mt-4">
              <h4 className="font-semibold mb-1">Detalhes:</h4>
              <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-sm">
                <div className="flex items-center gap-2">
                  <FaSun className="text-yellow-300" />
                  <span>{card.customFields?.days || 0} dias</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaMoon className="text-indigo-300" />
                  <span>{card.customFields?.nights || 0} noites</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaUserFriends className="text-blue-300" />
                  <span>{card.customFields?.people || 0} pessoas</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaSuitcase className="text-pink-300" />
                  <span>{card.customFields?.luggage || 0} malas</span>
                </div>
              </div>
            </div>

            {/* AÇÕES */}
            <div className="mt-auto pt-4 flex flex-col gap-2">
              <button
                onClick={() => handleSelectCard(card.id)}
                className={`py-2 rounded-xl text-white text-sm font-semibold transition-colors duration-200 ${
                  selectedCards.includes(card.id)
                    ? "bg-red-500/80 hover:bg-red-600/80"
                    : "bg-green-500/80 hover:bg-green-600/80"
                }`}
              >
                {selectedCards.includes(card.id)
                  ? "Remover da Página Inicial"
                  : "Adicionar à Página Inicial"}
              </button>

              <button
                onClick={() => handleOpenEditModal(card)}
                className="py-2 rounded-xl bg-yellow-500/80 text-white text-sm font-semibold hover:bg-yellow-600/80 transition-colors duration-200"
              >
                Editar Card
              </button>

              <button
                onClick={() => handleDeleteCard(card.id)}
                className="py-2 rounded-xl bg-gray-600/60 text-white text-sm font-semibold hover:bg-gray-700/80 transition-colors duration-200"
              >
                Deletar Card
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL DE EDIÇÃO */}
      <Modal open={editModalOpen} onClose={() => setEditModalOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            minWidth: 320,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <h2 className="text-xl font-bold mb-2">Editar Pacote</h2>
          <TextField
            label="Destino"
            name="destination"
            value={editForm.destination}
            onChange={handleEditFormChange}
            fullWidth
          />
          <TextField
            label="Hospedagem"
            name="accommodation"
            value={editForm.accommodation}
            onChange={handleEditFormChange}
            fullWidth
          />
          <TextField
            label="Preço"
            name="price"
            value={editForm.price}
            onChange={handleEditFormChange}
            fullWidth
          />
          <TextField
            label="Features (separadas por vírgula)"
            name="features"
            value={editForm.features.join(", ")}
            onChange={handleFeaturesChange}
            fullWidth
          />
          <TextField
            label="Dias"
            name="days"
            type="number"
            value={editForm.customFields.days}
            onChange={handleEditFormChange}
            fullWidth
          />
          <TextField
            label="Noites"
            name="nights"
            type="number"
            value={editForm.customFields.nights}
            onChange={handleEditFormChange}
            fullWidth
          />
          <TextField
            label="Pessoas"
            name="people"
            type="number"
            value={editForm.customFields.people}
            onChange={handleEditFormChange}
            fullWidth
          />
          <TextField
            label="Malas"
            name="luggage"
            type="number"
            value={editForm.customFields.luggage}
            onChange={handleEditFormChange}
            fullWidth
          />
          <Box display="flex" justifyContent="flex-end" gap={1} mt={2}>
            <Button onClick={() => setEditModalOpen(false)}>Cancelar</Button>
            <Button variant="contained" onClick={handleSaveEdit}>
              Salvar
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default OfferCard;
