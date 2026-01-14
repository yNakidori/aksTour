import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "./firebase/firbase";
import Footer from "./assets/footer";
import Navbar from "./assets/navbar";
import { Tabs, TabList, Tab, TabPanel, tabClasses } from "@mui/joy";
import CreateCard from "./assets/admin/CreateCard";
import CreateNationalOffer from "./assets/admin/CreateNationalOffer";
import CreateInternationalOffer from "./assets/admin/CreateInternationalOffer";
import CreateEventsForm from "./assets/admin/CreateEventsForm";
import CreateBusForm from "./assets/admin/CreateBusForm";
import NationalCard from "./assets/destinys/nationalCard";
import InternationalCard from "./assets/destinys/internationalCard";
import OfferCard from "./assets/admin/OfferCard";
import BusRouteCard from "./assets/bus/BusRouteCard";
import EventTicketCard from "./assets/events/EventTicketCard";
import AccommodationList from "./assets/admin/AccommodationList";
import CreateAccommodationForm from "./assets/admin/CreateAccommodationForm";
import BannerUpload from "./assets/admin/BannerUpload";
import BannerPreview from "./assets/admin/BannerPreview";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase/firbase";

const Admin = () => {
  const [cards, setCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Proteção de rota: só permite acesso autenticado
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/login");
      } else {
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  useEffect(() => {
    if (loading) return;
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
  }, [loading]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-700"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="text-center z-10 backdrop-blur-sm bg-white/5 p-12 rounded-3xl border border-white/10">
          <div className="relative mb-8">
            <div className="animate-spin rounded-full h-20 w-20 border-4 border-transparent border-t-blue-400 border-r-indigo-400 mx-auto"></div>
            <div className="absolute inset-0 animate-ping rounded-full h-20 w-20 border-2 border-blue-300/30 mx-auto"></div>
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">AKS Tour Admin</h3>
          <p className="text-blue-200 text-lg animate-pulse">
            Verificando credenciais de acesso...
          </p>
          <div className="mt-6 flex justify-center space-x-1">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce delay-100"></div>
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-200"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-50 to-indigo-100"></div>
      </div>

      <Navbar />
      <div className="min-h-screen px-4 py-20 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Modern header with glass morphism */}

          <Tabs
            variant="outlined"
            defaultValue={0}
            sx={{
              borderRadius: "24px",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
              overflow: "hidden",
              bgcolor: "rgba(255, 255, 255, 0.95)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              position: "relative",
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background:
                  "linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(168, 85, 247, 0.1) 100%)",
                pointerEvents: "none",
              },
            }}
          >
            <TabList
              disableUnderline
              tabFlex={1}
              sx={{
                position: "relative",
                zIndex: 1,
                background: "rgba(255, 255, 255, 0.8)",
                borderBottom: "1px solid rgba(0, 0, 0, 0.08)",
                [`& .${tabClasses.root}`]: {
                  fontSize: "14px",
                  fontWeight: "600",
                  padding: "16px 24px",
                  transition: "all 0.3s ease",
                  position: "relative",
                  "&:hover": {
                    bgcolor: "rgba(99, 102, 241, 0.05)",
                    transform: "translateY(-1px)",
                  },
                  [`&[aria-selected="true"]`]: {
                    color: "#4f46e5",
                    bgcolor: "rgba(99, 102, 241, 0.1)",
                    fontWeight: "700",
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      bottom: 0,
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: "80%",
                      height: "3px",
                      background: "linear-gradient(90deg, #4f46e5, #7c3aed)",
                      borderRadius: "2px 2px 0 0",
                    },
                  },
                  [`&.${tabClasses.focusVisible}`]: {
                    outlineOffset: "-4px",
                    outline: "2px solid #4f46e5",
                  },
                },
              }}
            >
              <Tab>
                <div className="flex items-center space-x-2">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                    />
                  </svg>
                  <span>Pacotes</span>
                </div>
              </Tab>
              <Tab>
                <div className="flex items-center space-x-2">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"
                    />
                  </svg>
                  <span>Nacional</span>
                </div>
              </Tab>
              <Tab>
                <div className="flex items-center space-x-2">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>Internacional</span>
                </div>
              </Tab>
              <Tab>
                <div className="flex items-center space-x-2">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                  <span>Hospedagem</span>
                </div>
              </Tab>
              <Tab>
                <div className="flex items-center space-x-2">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
                    />
                  </svg>
                  <span>Eventos</span>
                </div>
              </Tab>
              <Tab>
                <div className="flex items-center space-x-2">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2v0a2 2 0 01-2-2v-2a2 2 0 00-2-2H8z"
                    />
                  </svg>
                  <span>Rodoviário</span>
                </div>
              </Tab>
              <Tab>
                <div className="flex items-center space-x-2">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span>Configurações</span>
                </div>
              </Tab>
            </TabList>

            <TabPanel value={0}>
              <div className="flex flex-col lg:flex-row gap-8 mt-8 p-8 bg-gradient-to-br from-blue-50/50 via-indigo-50/30 to-purple-50/50 backdrop-blur-sm rounded-3xl border border-blue-100/50 shadow-xl hover:shadow-2xl transition-all duration-500">
                <div className="lg:w-1/3 w-full group">
                  <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 backdrop-blur-sm rounded-3xl p-8 text-white shadow-2xl transform group-hover:scale-[1.02] transition-all duration-300 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative z-10">
                      <div className="flex items-center mb-6">
                        <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mr-4 backdrop-blur-sm">
                          <svg
                            className="w-6 h-6 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                            />
                          </svg>
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold mb-1">
                            Criar Pacote
                          </h3>
                          <p className="text-blue-100 text-sm">
                            Configure novos pacotes de viagem
                          </p>
                        </div>
                      </div>
                      <CreateCard />
                    </div>
                  </div>
                </div>
                <div className="lg:w-2/3 w-full">
                  <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/50">
                    <OfferCard
                      cards={cards}
                      selectedCards={selectedCards}
                      setCards={setCards}
                      setSelectedCards={setSelectedCards}
                    />
                  </div>
                </div>
              </div>
            </TabPanel>

            <TabPanel value={1}>
              <div className="flex flex-col lg:flex-row gap-8 mt-8 p-8 bg-gradient-to-br from-emerald-50/50 via-green-50/30 to-teal-50/50 backdrop-blur-sm rounded-3xl border border-emerald-100/50 shadow-xl hover:shadow-2xl transition-all duration-500">
                <div className="lg:w-1/3 w-full group">
                  <div className="bg-gradient-to-br from-emerald-600 via-green-700 to-teal-800 backdrop-blur-sm rounded-3xl p-8 text-white shadow-2xl transform group-hover:scale-[1.02] transition-all duration-300 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative z-10">
                      <div className="flex items-center mb-6">
                        <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mr-4 backdrop-blur-sm">
                          <svg
                            className="w-6 h-6 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"
                            />
                          </svg>
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold mb-1">
                            Ofertas Nacionais
                          </h3>
                          <p className="text-emerald-100 text-sm">
                            Destinos dentro do Brasil
                          </p>
                        </div>
                      </div>
                      <CreateNationalOffer />
                    </div>
                  </div>
                </div>
                <div className="lg:w-2/3 w-full">
                  <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/50">
                    <NationalCard isAdmin={true} />
                  </div>
                </div>
              </div>
            </TabPanel>

            <TabPanel value={2}>
              <div className="flex flex-col lg:flex-row gap-8 mt-8 p-8 bg-gradient-to-br from-purple-50/50 via-violet-50/30 to-indigo-50/50 backdrop-blur-sm rounded-3xl border border-purple-100/50 shadow-xl hover:shadow-2xl transition-all duration-500">
                <div className="lg:w-1/3 w-full group">
                  <div className="bg-gradient-to-br from-purple-600 via-violet-700 to-indigo-800 backdrop-blur-sm rounded-3xl p-8 text-white shadow-2xl transform group-hover:scale-[1.02] transition-all duration-300 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative z-10">
                      <div className="flex items-center mb-6">
                        <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mr-4 backdrop-blur-sm">
                          <svg
                            className="w-6 h-6 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold mb-1">
                            Ofertas Internacionais
                          </h3>
                          <p className="text-purple-100 text-sm">
                            Destinos pelo mundo
                          </p>
                        </div>
                      </div>
                      <CreateInternationalOffer />
                    </div>
                  </div>
                </div>
                <div className="lg:w-2/3 w-full">
                  <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/50">
                    <InternationalCard isAdmin={true} />
                  </div>
                </div>
              </div>
            </TabPanel>

            <TabPanel value={3}>
              <div className="flex flex-col lg:flex-row gap-8 mt-8 p-8 bg-gradient-to-br from-amber-50/50 via-orange-50/30 to-yellow-50/50 backdrop-blur-sm rounded-3xl border border-amber-100/50 shadow-xl hover:shadow-2xl transition-all duration-500">
                <div className="lg:w-1/3 w-full group">
                  <div className="bg-gradient-to-br from-amber-500 via-orange-600 to-yellow-700 backdrop-blur-sm rounded-3xl p-8 text-white shadow-2xl transform group-hover:scale-[1.02] transition-all duration-300 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative z-10">
                      <div className="flex items-center mb-6">
                        <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mr-4 backdrop-blur-sm">
                          <svg
                            className="w-6 h-6 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                            />
                          </svg>
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold mb-1">
                            Hospedagem
                          </h3>
                          <p className="text-amber-100 text-sm">
                            Hotéis e acomodações
                          </p>
                        </div>
                      </div>
                      <CreateAccommodationForm />
                    </div>
                  </div>
                </div>
                <div className="lg:w-2/3 w-full">
                  <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/50">
                    <AccommodationList isAdmin={true} />
                  </div>
                </div>
              </div>
            </TabPanel>

            <TabPanel value={4}>
              <div className="flex flex-col lg:flex-row gap-8 mt-8 p-8 bg-gradient-to-br from-rose-50/50 via-pink-50/30 to-red-50/50 backdrop-blur-sm rounded-3xl border border-rose-100/50 shadow-xl hover:shadow-2xl transition-all duration-500">
                <div className="lg:w-1/3 w-full group">
                  <div className="bg-gradient-to-br from-rose-600 via-pink-700 to-red-800 backdrop-blur-sm rounded-3xl p-8 text-white shadow-2xl transform group-hover:scale-[1.02] transition-all duration-300 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative z-10">
                      <div className="flex items-center mb-6">
                        <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mr-4 backdrop-blur-sm">
                          <svg
                            className="w-6 h-6 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
                            />
                          </svg>
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold mb-1">Eventos</h3>
                          <p className="text-rose-100 text-sm">
                            Shows, festivais e eventos
                          </p>
                        </div>
                      </div>
                      <CreateEventsForm />
                    </div>
                  </div>
                </div>
                <div className="lg:w-2/3 w-full">
                  <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/50">
                    <EventTicketCard isAdmin={true} />
                  </div>
                </div>
              </div>
            </TabPanel>

            <TabPanel value={5}>
              <div className="flex flex-col lg:flex-row gap-8 mt-8 p-8 bg-gradient-to-br from-cyan-50/50 via-teal-50/30 to-blue-50/50 backdrop-blur-sm rounded-3xl border border-cyan-100/50 shadow-xl hover:shadow-2xl transition-all duration-500">
                <div className="lg:w-1/3 w-full group">
                  <div className="bg-gradient-to-br from-cyan-600 via-teal-700 to-blue-800 backdrop-blur-sm rounded-3xl p-8 text-white shadow-2xl transform group-hover:scale-[1.02] transition-all duration-300 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative z-10">
                      <div className="flex items-center mb-6">
                        <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mr-4 backdrop-blur-sm">
                          <svg
                            className="w-6 h-6 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2v0a2 2 0 01-2-2v-2a2 2 0 00-2-2H8z"
                            />
                          </svg>
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold mb-1">
                            Rodoviário
                          </h3>
                          <p className="text-cyan-100 text-sm">
                            Rotas e horários de ônibus
                          </p>
                        </div>
                      </div>
                      <CreateBusForm />
                    </div>
                  </div>
                </div>
                <div className="lg:w-2/3 w-full">
                  <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/50">
                    <BusRouteCard isAdmin={true} />
                  </div>
                </div>
              </div>
            </TabPanel>

            <TabPanel value={6}>
              <div className="flex flex-col lg:flex-row gap-8 mt-8 p-8 bg-gradient-to-br from-slate-50/50 via-gray-50/30 to-zinc-50/50 backdrop-blur-sm rounded-3xl border border-slate-100/50 shadow-xl hover:shadow-2xl transition-all duration-500">
                <div className="lg:w-1/2 w-full group">
                  <div className="bg-gradient-to-br from-slate-600 via-gray-700 to-zinc-800 backdrop-blur-sm rounded-3xl p-8 text-white shadow-2xl transform group-hover:scale-[1.02] transition-all duration-300 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative z-10">
                      <div className="flex items-center mb-6">
                        <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mr-4 backdrop-blur-sm">
                          <svg
                            className="w-6 h-6 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold mb-1">
                            Banner Principal
                          </h3>
                          <p className="text-slate-100 text-sm">
                            Atualize a imagem da tela inicial
                          </p>
                        </div>
                      </div>
                      <BannerUpload />
                    </div>
                  </div>
                </div>
                <div className="lg:w-1/2 w-full">
                  <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/50">
                    <BannerPreview />
                  </div>
                </div>
              </div>
            </TabPanel>
          </Tabs>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Admin;
