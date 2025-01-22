import React, { useEffect, useState } from "react";
import Footer from "./assets/footer";
import Navbar from "./assets/navbar";
import CreateCard from "./assets/admin/CreateCard";
import {
  collection,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "./firebase/firbase";

const Admin = () => {
  const [cards, setCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);

  useEffect(() => {
    const fetchCards = async () => {
      const snapshot = await getDocs(collection(db, "pricingCards"));
      const fetchedCards = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCards(fetchedCards);

      const activeCards = fetchedCards.filter((card) => card.active);
      setSelectedCards(activeCards.map((card) => card.id));
    };

    fetchCards();
  }, []);

  const handleSelectCard = async (cardId) => {
    const isSelected = selectedCards.includes(cardId);

    // Atualiza o estado local
    const newSelection = isSelected
      ? selectedCards.filter((id) => id !== cardId)
      : [...selectedCards, cardId];

    if (newSelection.length > 3) {
      alert("Você só pode selecionar até 3 opções");
      return;
    }

    setSelectedCards(newSelection);

    // Atualiza o documento no Firestore
    const cardRef = doc(db, "pricingCards", cardId);
    await updateDoc(cardRef, { active: !isSelected });
  };

  const handleDeleteCard = async (cardId) => {
    const confirmDelete = window.confirm(
      "Tem certeza de que deseja deletar este card?"
    );
    if (confirmDelete) {
      try {
        // Remove o documento do Firestore
        await deleteDoc(doc(db, "pricingCards", cardId));
        // Atualiza a lista localmente
        setCards((prevCards) => prevCards.filter((card) => card.id !== cardId));
        setSelectedCards((prevSelected) =>
          prevSelected.filter((id) => id !== cardId)
        );
        alert("Card deletado com sucesso!");
      } catch (error) {
        console.error("Erro ao deletar card:", error);
      }
    }
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen p-6 bg-orange-100">
        <div className="mb-6">
          <CreateCard />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card) => (
            <div
              key={card.id}
              className={`p-4 rounded-lg shadow-lg ${
                selectedCards.includes(card.id)
                  ? "border-4 border-green-500"
                  : ""
              } bg-white`}
            >
              <img
                src={card.image}
                alt={card.place}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <h3 className="text-lg font-semibold">{card.place}</h3>
              <p className="text-gray-700">{card.price}</p>
              <ul className="text-gray-600 mt-2">
                {card.features.map((feature, index) => (
                  <li key={index}>• {feature}</li>
                ))}
              </ul>
              <div className="mt-4 flex space-x-2">
                <button
                  onClick={() => handleSelectCard(card.id)}
                  className={`flex-1 py-2 rounded-lg text-white ${
                    selectedCards.includes(card.id)
                      ? "bg-red-600 hover:bg-red-700"
                      : "bg-green-600 hover:bg-green-700"
                  }`}
                >
                  {selectedCards.includes(card.id)
                    ? "Remover da Página Inicial"
                    : "Adicionar à Página Inicial"}
                </button>
                <button
                  onClick={() => handleDeleteCard(card.id)}
                  className="flex-1 py-2 rounded-lg bg-gray-600 text-white hover:bg-gray-700"
                >
                  Deletar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Admin;
