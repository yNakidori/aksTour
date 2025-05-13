import React, { useEffect, useState } from "react";
import Footer from "./assets/footer";
import Navbar from "./assets/navbar";
import { Tabs, TabList, Tab, TabPanel, tabClasses } from "@mui/joy";
import CreateCard from "./assets/admin/CreateCard";
import CreateNationalOffer from "./assets/admin/CreateNationalOffer";
import CreateInternationalOffer from "./assets/admin/CreateInternationalOffer";
import CreateEventsForm from "./assets/admin/CreateEventsForm";
import NationalCard from "./assets/destinys/nationalCard";
import InternationalCard from "./assets/destinys/internationalCard";
import OfferCard from "./assets/admin/OfferCard";
import EventTicketCard from "./assets/events/EventTicketCard";
import AccommodationList from "./assets/admin/AccommodationList";
import CreateAccommodationForm from "./assets/admin/CreateAccommodationForm";
import { collection, getDocs } from "firebase/firestore";
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
      setSelectedCards(
        fetchedCards.filter((card) => card.active).map((card) => card.id)
      );
    };

    fetchCards();
  }, []);

  return (
    <div>
      <Navbar />
      <div
        className="min-h-screen px-4 py-20 opacity-90"
        style={{ backgroundColor: "#edf7fc" }}
      >
        <Tabs
          variant="outlined"
          defaultValue={0}
          sx={{
            borderRadius: "lg",
            boxShadow: "sm",
            overflow: "auto",
          }}
        >
          <TabList
            disableUnderline
            tabFlex={1}
            sx={{
              [`& .${tabClasses.root}`]: {
                fontSize: "sm",
                fontWeight: "lg",
                [`&[aria-selected="true"]`]: {
                  color: "primary.700",
                  bgcolor: "background.surface",
                },
                [`&.${tabClasses.focusVisible}`]: {
                  outlineOffset: "-4px",
                },
              },
            }}
          >
            <Tab>Pacotes</Tab>
            <Tab>Ofertas Nacionais</Tab>
            <Tab>Ofertas Internacionais</Tab>
            <Tab>Hospedagem</Tab>
            <Tab>Eventos</Tab>
          </TabList>

          <TabPanel value={0}>
            <div className="flex flex-col lg:flex-row gap-6 mt-6 bg-slate-400 bg-opacity-30 rounded-2xl p-4">
              <div className="lg:w-1/3 w-full bg-slate-50 bg-opacity-80 rounded-2xl p-6">
                <CreateCard />
              </div>
              <div className="lg:w-2/3 w-full overflow-x-auto mt-10 lg:mt-0">
                <OfferCard
                  cards={cards}
                  selectedCards={selectedCards}
                  setCards={setCards}
                  setSelectedCards={setSelectedCards}
                />
              </div>
            </div>
          </TabPanel>

          <TabPanel value={1}>
            <div className="flex flex-col lg:flex-row gap-6 mt-6 bg-slate-400 bg-opacity-30 rounded-2xl p-4">
              <div className="lg:w-1/3 w-full bg-slate-50 bg-opacity-80 rounded-2xl p-6">
                <CreateNationalOffer />
              </div>
              <div className="lg:w-2/3 w-full overflow-x-auto mt-10 lg:mt-0">
                <NationalCard isAdmin={true} />
              </div>
            </div>
          </TabPanel>

          <TabPanel value={2}>
            <div className="flex flex-col lg:flex-row gap-6 mt-6 bg-slate-400 bg-opacity-30 rounded-2xl p-4">
              <div className="lg:w-1/3 w-full bg-slate-50 bg-opacity-80 rounded-2xl p-6">
                <CreateInternationalOffer />
              </div>
              <div className="lg:w-2/3 w-full overflow-x-auto mt-10 lg:mt-0">
                <InternationalCard isAdmin={true} />
              </div>
            </div>
          </TabPanel>

          <TabPanel value={3}>
            <div className="flex flex-col lg:flex-row gap-6 mt-6 bg-slate-400 bg-opacity-30 rounded-2xl p-4">
              <div className="lg:w-1/3 w-full bg-slate-50 bg-opacity-80 rounded-2xl p-6">
                <CreateAccommodationForm />
              </div>
              <div className="lg:w-2/3 w-full overflow-x-auto mt-10 lg:mt-0">
                <AccommodationList isAdmin={true} />
              </div>
            </div>
          </TabPanel>

          <TabPanel value={4}>
            <div className="flex flex-col lg:flex-row gap-6 mt-6 bg-slate-400 bg-opacity-30 rounded-2xl p-4">
              <div className="lg:w-1/3 w-full bg-slate-50 bg-opacity-80 rounded-2xl p-6">
                <CreateEventsForm />
              </div>
              <div className="lg:w-2/3 w-full overflow-x-auto mt-10 lg:mt-0">
                <EventTicketCard isAdmin={true} />
              </div>
            </div>
          </TabPanel>
        </Tabs>
      </div>
      <Footer />
    </div>
  );
};

export default Admin;
