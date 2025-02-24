import React, { useEffect, useState } from "react";
import Footer from "./assets/footer";
import Navbar from "./assets/navbar";
import CreateCard from "./assets/admin/CreateCard";
import NationalCard from "./assets/destinys/nationalCard";
import {
  collection,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "./firebase/firbase";
import Swal from "sweetalert2";

const API_KEY = "ZhQzWiPCEQ7WZBr8VoPrwy6QRdNP7pvuRXydUyZd4w5kRBC6MnkVmb8f";
const QUERY = "turismo"; // Termo de busca para imagens relacionadas

const Admin = () => {
  const [cards, setCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [backgroundImage, setBackgroundImage] = useState("");

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

    const fetchBackgroundImage = async () => {
      try {
        const response = await fetch(
          `https://api.pexels.com/v1/search?query=${QUERY}&per_page=1`,
          {
            headers: { Authorization: API_KEY },
          }
        );
        const data = await response.json();
        if (data.photos.length > 0) {
          setBackgroundImage(data.photos[0].src.landscape);
        }
      } catch (error) {
        console.error("Erro ao buscar imagem do Pexels:", error);
      }
    };

    fetchCards();
    fetchBackgroundImage();
  }, []);

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
      title: "Realmente deseja deletar este card?",
      showCancelButton: true,
      confirmButtonText: "Sim",
      cancelButtonText: "Cancelar",
    });

    if (confirmDelete.isConfirmed) {
      try {
        await deleteDoc(doc(db, "pricingCards", cardId));
        setCards((prevCards) => prevCards.filter((card) => card.id !== cardId));
        setSelectedCards((prevSelected) =>
          prevSelected.filter((id) => id !== cardId)
        );
        Swal.fire({ icon: "success", title: "Card deletado com sucesso!" });
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
      <div
        className="min-h-screen p-6 bg-orange-100"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Navbar />
        <div className="mb-6 mt-20">
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
        <div className="mt-6 bg-slate-50 bg-opacity-80 rounded-2xl">
          <div className="p-6">
            <NationalCard />
          </div>
        </div>
        <div className="mt-6 bg-slate-50 bg-opacity-80 rounded-2xl">
          <div className="p-6">
            <NationalCard />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Admin;
