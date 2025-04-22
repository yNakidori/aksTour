import React, { useEffect, useState } from "react";
import Footer from "./assets/footer";
import Navbar from "./assets/navbar";
import CreateCard from "./assets/admin/CreateCard";
import CreateNationalOffer from "./assets/admin/CreateNationalOffer";
import CreateInternationalOffer from "./assets/admin/CreateInternationalOffer";
import NationalCard from "./assets/destinys/nationalCard";
import InternationalCard from "./assets/destinys/internationalCard";
import OfferCard from "./assets/admin/OfferCard"; // Importando o novo componente
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase/firbase";
import { FolderPlusIcon } from "@heroicons/react/20/solid";

const Admin = () => {
  const [cards, setCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
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

  return (
    <div>
      <Navbar />
      <div className="min-h-screen p-6" style={{ backgroundColor: "#282b30" }}>
        <div className="flex flex-col lg:flex-row gap-6 mt-28 bg-slate-400 bg-opacity-30 rounded-2xl">
          {/* Formulário à esquerda */}
          <div className="lg:w-1/3 w-full mb-10 lg:mb-0 bg-slate-50 bg-opacity-80 rounded-2xl p-6">
            <CreateCard />
          </div>
          {/* Cards em carrossel ou grid à direita */}
          <div className="lg:w-2/3 w-full overflow-x-auto mt-20">
            <OfferCard
              cards={cards}
              selectedCards={selectedCards}
              setCards={setCards}
              setSelectedCards={setSelectedCards}
            />
          </div>
        </div>

        {/* Ofertas Nacionais */}
        <div className="flex flex-col lg:flex-row gap-6 mt-28 bg-slate-400 bg-opacity-30 rounded-2xl">
          <div className="lg:w-1/3 w-full mb-10 lg:mb-0 bg-slate-50 bg-opacity-80 rounded-2xl p-6">
            <CreateNationalOffer />
          </div>
          <div className="lg:w-2/3 w-full overflow-x-auto mt-20">
            <NationalCard isAdmin={true} />
          </div>
        </div>

        {/* Ofertas internacionais */}
        <div className="flex flex-col lg:flex-row gap-6 mt-28 bg-slate-400 bg-opacity-30 rounded-2xl">
          <div className="lg:w-1/3 w-full mb-10 lg:mb-0 bg-slate-50 bg-opacity-80 rounded-2xl p-6">
            <CreateInternationalOffer />
          </div>
          <div className="lg:w-2/3 w-full overflow-x-auto mt-20">
            <InternationalCard isAdmin={true} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Admin;
