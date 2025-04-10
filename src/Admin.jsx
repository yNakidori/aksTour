import React, { useEffect, useState } from "react";
import Footer from "./assets/footer";
import Navbar from "./assets/navbar";
import CreateCard from "./assets/admin/CreateCard";
import CreateNationalOffer from "./assets/admin/CreateNationalOffer";
import CreateInternationalOffer from "./assets/admin/CreateInternationalOffer";
import NationalCard from "./assets/destinys/nationalCard";
import InternationalCard from "./assets/destinys/internationalCard";
import {
  collection,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "./firebase/firbase";
import { FolderPlusIcon } from "@heroicons/react/20/solid";
import { FaPlus, FaTrash, FaMinus } from "react-icons/fa";
import Swal from "sweetalert2";

const Admin = () => {
  const [cards, setCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [nationalOffers, setNationalOffers] = useState([]);
  const [internationalOffers, setInternationalOffers] = useState([]);
  const [showCreateNationalOffer, setShowCreateNationalOffer] = useState(false);
  const [showCreateInternationalOffer, setShowCreateInternationalOffer] =
    useState(false);

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

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setShowCreateNationalOffer(false);
      setShowCreateInternationalOffer(false);
    }
  };

  return (
    <div>
      <div className="min-h-screen p-6" style={{ backgroundColor: "#282b30" }}>
        <Navbar />
        <div className="flex flex-col lg:flex-row gap-6 mt-28 bg-slate-400 bg-opacity-30">
          {/* Formulário à esquerda */}
          <div className="lg:w-1/3 w-full mb-10 lg:mb-0 bg-slate-50 bg-opacity-80 rounded-2xl p-6">
            <CreateCard />
          </div>

          {/* Cards em carrossel ou grid à direita */}
          <div className="lg:w-2/3 w-full overflow-x-auto mt-20">
            <div className="flex gap-6">
              {cards.map((card) => (
                <div
                  key={card.id}
                  className={`min-w-[300px] backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl shadow-lg p-4 transition-all duration-300 hover:shadow-2xl ${
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
                        {selectedCards.includes(card.id)
                          ? "Remover"
                          : "Adicionar"}
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

        <div className="mt-6 bg-slate-50 bg-opacity-80 rounded-2xl">
          <div className="p-6">
            <FolderPlusIcon
              style={{ height: "5vh", marginBottom: "3vh", cursor: "pointer" }}
              onClick={() =>
                setShowCreateNationalOffer(!showCreateNationalOffer)
              }
            />
            <p>Ofertas Nacionais</p>
            <div className="mt-6 bg-slate-50 bg-opacity-80 rounded-2xl">
              <div className="p-6">
                <NationalCard isAdmin={true} />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 bg-slate-50 bg-opacity-80 rounded-2xl">
          <div className="p-6">
            <FolderPlusIcon
              style={{ height: "5vh", marginBottom: "3vh", cursor: "pointer" }}
              onClick={() =>
                setShowCreateInternationalOffer(!showCreateInternationalOffer)
              }
            />
            <p>Ofertas Internacionais</p>
            <div className="mt-6 bg-slate-50 bg-opacity-80 rounded-2xl">
              <div className="p-6">
                <InternationalCard isAdmin={true} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      {showCreateNationalOffer && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50"
          onClick={handleOverlayClick}
        >
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div
            className="bg-white rounded-lg shadow-lg p-6 z-10 max-w-md mx-auto relative"
            onClick={(e) => e.stopPropagation()} // Impede que o clique dentro do formulário feche o modal
          >
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={() => setShowCreateNationalOffer(false)}
            >
              &times;
            </button>
            <CreateNationalOffer />
          </div>
        </div>
      )}
      {showCreateInternationalOffer && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50"
          onClick={handleOverlayClick}
        >
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div
            className="bg-white rounded-lg shadow-lg p-6 z-10 max-w-md mx-auto relative"
            onClick={(e) => e.stopPropagation()} // Impede que o clique dentro do formulário feche o modal
          >
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={() => setShowCreateInternationalOffer(false)}
            >
              &times;
            </button>
            <CreateInternationalOffer />
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
