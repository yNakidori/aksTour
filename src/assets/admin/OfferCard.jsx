import React, { useState, useEffect } from "react"; // Corrigido: Adicionado useEffect
import { db } from "../../firebase/firbase";
import {
  deleteDoc,
  updateDoc,
  getDocs,
  collection,
  doc,
} from "firebase/firestore"; // Corrigido: Adicionado getDocs, collection
import Swal from "sweetalert2"; // Certifique-se de que o SweetAlert2 está instalado

const OfferCard = ({ cards, setCards, selectedCards, setSelectedCards }) => {
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
  }, [setCards, setSelectedCards]); // Corrigido: Adicionado dependências

  const handleSelectCard = async (cardId) => {
    const isSelected = selectedCards.includes(cardId);
    const newSelection = isSelected
      ? selectedCards.filter((id) => id !== cardId)
      : [...selectedCards, cardId];

    if (newSelection.length > 3) {
      // Corrigido: Limite consistente com Admin.jsx
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

  return (
    <div>
      {/* Cards em carrossel ou grid à direita */}
      <div className="lg:w-2/3 w-full overflow-x-auto mt-20">
        <div className="flex gap-6">
          {cards.map((card) => (
            <div
              key={card.id}
              className={`min-w-[300px] backdrop-blur-md bg-black/30 border border-white/20 rounded-2xl shadow-lg p-4 transition-all duration-300 hover:shadow-2xl ${
                selectedCards.includes(card.id) ? "border-green-500/80" : ""
              }`}
            >
              <div className="relative h-40 rounded-xl overflow-hidden mb-4">
                <img
                  src={card.image}
                  alt={card.place}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105 rounded-xl"
                />
              </div>

              <div className="text-white">
                <h3 className="text-xl font-semibold">{card.place}</h3>
                <p className="text-green-400 font-medium text-lg">
                  {card.price}
                </p>

                <ul className="text-sm text-gray-200 mt-2 space-y-1">
                  {card.features.map((feature, index) => (
                    <li key={index}>• {feature}</li>
                  ))}
                </ul>

                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => handleSelectCard(card.id)}
                    className={`flex-1 py-2 rounded-xl text-white text-sm font-semibold transition-colors duration-200 ${
                      selectedCards.includes(card.id)
                        ? "bg-red-500/80 hover:bg-red-600/80"
                        : "bg-green-500/80 hover:bg-green-600/80"
                    }`}
                  >
                    {selectedCards.includes(card.id) ? "Remover" : "Adicionar"}
                  </button>
                  <button
                    onClick={() => handleDeleteCard(card.id)}
                    className="flex-1 py-2 rounded-xl bg-gray-600/60 text-white text-sm font-semibold hover:bg-gray-700/80 transition-colors duration-200"
                  >
                    Deletar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OfferCard;
