import React, { useState, useEffect, useRef } from "react";
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
  getStorage,
} from "firebase/storage";
import { db } from "../../firebase/firbase";
import Swal from "sweetalert2";
import Pagination from "../Pagination";

const NationalCard = ({ isAdmin = false, filterType = "all" }) => {
  // Small image wrapper that shows a skeleton until the image finishes loading
  const CardImage = ({
    src,
    alt,
    imgClass = "w-full h-48 object-cover",
    wrapperClass = "relative",
  }) => {
    const [loaded, setLoaded] = useState(false);

    return (
      <div className={wrapperClass}>
        {!loaded && (
          <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse" />
        )}
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          fetchPriority="low"
          onLoad={() => setLoaded(true)}
          className={`${imgClass} block transition-opacity duration-700 ${loaded ? "opacity-100" : "opacity-0"}`}
        />
      </div>
    );
  };

  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingCard, setEditingCard] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [imageFile, setImageFile] = useState(null);
  const [cardsPerPage, setCardsPerPage] = useState(6);
  const listTopRef = useRef(null);

  useEffect(() => {
    function updateCardsPerPage() {
      // Define as quebras de grid do Tailwind usadas no componente
      let columns = 1;
      const width = window.innerWidth;
      if (width >= 1280)
        columns = 4; // xl:grid-cols-4
      else if (width >= 1024)
        columns = 3; // lg:grid-cols-3
      else if (width >= 768) columns = 2; // md:grid-cols-2
      // Quantas linhas cabem na tela? (ajuste conforme altura desejada)
      const cardHeight = 340; // px, estimado (inclui imagem, texto, padding)
      const availableHeight = window.innerHeight - 300; // 300px para header/footer
      const rows = Math.max(1, Math.floor(availableHeight / cardHeight));
      setCardsPerPage(columns * rows);
    }
    updateCardsPerPage();
    window.addEventListener("resize", updateCardsPerPage);
    return () => window.removeEventListener("resize", updateCardsPerPage);
  }, []);

  // Cálculos para paginação (depois do filtro)
  const filteredCards = cards.filter((card) => {
    if (filterType === "package") return card.package;
    if (filterType === "ticket") return card.ticket;
    return true;
  });

  const totalPages = Math.ceil(filteredCards.length / cardsPerPage);
  const startIndex = (currentPage - 1) * cardsPerPage;
  const endIndex = startIndex + cardsPerPage;
  const currentCards = filteredCards.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Only scroll when the anchor is outside the viewport to avoid small jumps.
    try {
      const el = listTopRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const fullyVisible = rect.top >= 0 && rect.bottom <= window.innerHeight;
      if (!fullyVisible) {
        // use 'nearest' so the browser chooses the minimal scroll needed
        el.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    } catch (e) {
      // defensive: if window is undefined (SSR) or other error, do nothing
    }
  };

  // Reset page quando filtro muda
  useEffect(() => {
    setCurrentPage(1);
  }, [filterType]);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "nationalOffers"));
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

  const deleteImageFromStorage = async (imageUrl) => {
    try {
      const storage = getStorage();
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
      const imageRef = ref(storage, fullPath);
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
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      color: "white",
      confirmButtonColor: "#10b981",
      cancelButtonColor: "#ef4444",
    });

    if (result.isConfirmed) {
      try {
        const cardToDelete = cards.find((card) => card.id === id);
        if (cardToDelete?.Image) {
          await deleteImageFromStorage(cardToDelete.Image);
        }

        await deleteDoc(doc(db, "nationalOffers", id));
        const updatedCards = cards.filter((card) => card.id !== id);
        setCards(updatedCards);

        // Ajustar página se necessário após deletar
        const updatedFilteredCards = updatedCards.filter((card) => {
          if (filterType === "package") return card.package;
          if (filterType === "ticket") return card.ticket;
          return true;
        });
        const newTotalPages = Math.ceil(
          updatedFilteredCards.length / cardsPerPage,
        );
        if (currentPage > newTotalPages && newTotalPages > 0) {
          setCurrentPage(newTotalPages);
        }

        Swal.fire({
          icon: "success",
          title: "Deletado!",
          text: "Oferta removida com sucesso.",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
          showConfirmButton: false,
          timer: 1500,
        });
      } catch (error) {
        console.error("Erro ao excluir:", error);
        Swal.fire({
          icon: "error",
          title: "Erro!",
          text: "Erro ao excluir a oferta.",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };

  const handleEdit = (card) => {
    setEditingCard(card);
    setImageFile(null);
    setEditModalOpen(true);
  };

  // Função para fazer upload da nova imagem
  const handleImageUpload = async (file) => {
    if (!file) return null;

    // Client-side image compression to reduce upload size and speed up
    const compressImage = (file, maxWidth = 1600, quality = 0.7) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        const url = URL.createObjectURL(file);
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const scale = Math.min(1, maxWidth / img.width);
          canvas.width = Math.round(img.width * scale);
          canvas.height = Math.round(img.height * scale);
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          canvas.toBlob(
            (blob) => {
              if (blob) {
                const compressedFile = new File([blob], file.name, {
                  type: blob.type,
                  lastModified: Date.now(),
                });
                resolve(compressedFile);
              } else {
                resolve(file);
              }
            },
            "image/jpeg",
            quality,
          );
          URL.revokeObjectURL(url);
        };
        img.onerror = (e) => {
          URL.revokeObjectURL(url);
          reject(e);
        };
        img.src = url;
      });
    };

    setUploadingImage(true);
    try {
      const storage = getStorage();
      const compressed = await compressImage(file, 1600, 0.75);
      const storageRef = ref(
        storage,
        `nationalOffers/${Date.now()}_${compressed.name}`,
      );
      const snapshot = await uploadBytes(storageRef, compressed);
      const url = await getDownloadURL(snapshot.ref);
      return url;
    } catch (error) {
      console.error("Erro ao fazer upload da imagem:", error);
      Swal.fire({
        icon: "error",
        title: "Erro",
        text: "Não foi possível fazer upload da imagem.",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        color: "white",
        showConfirmButton: false,
        timer: 2000,
      });
      return null;
    } finally {
      setUploadingImage(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
    }
  };

  const saveEdit = async () => {
    if (editingCard) {
      try {
        let updatedData = { ...editingCard };

        if (imageFile) {
          const imageUrl = await handleImageUpload(imageFile);
          if (imageUrl) {
            // Deletar imagem antiga se existir
            if (editingCard.Image) {
              await deleteImageFromStorage(editingCard.Image);
            }
            updatedData.Image = imageUrl;
          }
        }

        await updateDoc(doc(db, "nationalOffers", editingCard.id), {
          destiny: updatedData.destiny,
          date: updatedData.date,
          price: updatedData.price,
          Image: updatedData.Image,
        });

        setCards((prevCards) =>
          prevCards.map((card) =>
            card.id === editingCard.id ? updatedData : card,
          ),
        );

        setEditModalOpen(false);
        setEditingCard(null);
        setImageFile(null);

        Swal.fire({
          icon: "success",
          title: "Sucesso",
          text: "O cartão foi editado com sucesso.",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
          showConfirmButton: false,
          timer: 1500,
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Erro",
          text: "Não foi possível editar o cartão.",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
          showConfirmButton: false,
          timer: 1500,
        });
        console.error("Erro ao editar:", error);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="text-gray-600 font-medium">
            Carregando ofertas nacionais...
          </p>
        </div>
      </div>
    );
  }

  if (cards.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="flex flex-col items-center space-y-4">
          <svg
            className="w-16 h-16 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <h3 className="text-xl font-semibold text-gray-700">
            Nenhuma oferta nacional encontrada
          </h3>
          <p className="text-gray-500">
            Em breve teremos novos destinos nacionais disponíveis!
          </p>
        </div>
      </div>
    );
  }

  if (filteredCards.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="flex flex-col items-center space-y-4">
          <svg
            className="w-16 h-16 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <h3 className="text-xl font-semibold text-gray-700">
            Nenhum resultado encontrado
          </h3>
          <p className="text-gray-500">
            Tente ajustar os filtros para ver mais ofertas.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Marcador invisível para scroll */}
      <div ref={listTopRef} className="h-0"></div>

      {/* Carrossel horizontal para mobile, grid para desktop */}
      <div className="mb-6 md:mb-8">
        {/* Mobile: scroll horizontal */}
        <div className="md:hidden flex overflow-x-auto gap-4 px-2 pb-4 snap-x snap-mandatory scrollbar-hide">
          {currentCards.map((card) => (
            <div
              key={card.id}
              className="group relative bg-white rounded-xl shadow-lg overflow-hidden flex-shrink-0 w-[85vw] snap-center active:scale-95 transition-transform duration-200"
            >
              <div className="relative">
                <CardImage
                  src={card.Image}
                  alt={card.destiny}
                  imgClass="w-full h-44 sm:h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  wrapperClass="relative"
                />
                {/* Badge do tipo */}
                {card.package && (
                  <div className="absolute top-2 left-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-xs font-semibold px-2.5 py-1 rounded-full shadow-lg">
                    Pacote
                  </div>
                )}
                {!card.package && card.ticket && (
                  <div className="absolute top-2 left-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs font-semibold px-2.5 py-1 rounded-full shadow-lg">
                    Passagem
                  </div>
                )}

                {/* Botões admin */}
                {isAdmin && (
                  <>
                    <button
                      onClick={() => handleDelete(card.id)}
                      className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm hover:bg-red-500 hover:text-white p-2.5 rounded-full transition-all duration-200 shadow-lg active:scale-90"
                      title="Excluir oferta"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9zM4 5a2 2 0 012-2h8a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V5zM8 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm4 0a1 1 0 10-2 0v4a1 1 0 102 0V8z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleEdit(card)}
                      className="absolute top-2 right-14 bg-white/90 backdrop-blur-sm hover:bg-blue-500 hover:text-white p-2.5 rounded-full transition-all duration-200 shadow-lg active:scale-90"
                      title="Editar oferta"
                    >
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
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                    </button>
                  </>
                )}
              </div>

              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                  {card.destiny}
                </h3>

                <div className="flex items-center text-gray-600 mb-3">
                  <svg
                    className="w-4 h-4 mr-2 text-blue-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm">{card.date}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex flex-col min-h-14">
                    <span className="text-xs text-gray-500 mb-1">
                      Pacotes a partir de
                    </span>
                    <span className="text-2xl font-bold text-blue-600 max-h-16 overflow-hidden line-clamp-2 break-words whitespace-normal">
                      R$ {card.price}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Indicador de navegação para mobile */}
        <div className="md:hidden flex justify-center items-center gap-2 mt-2 mb-4">
          <span className="text-xs text-white bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full">
            Deslize para ver mais →
          </span>
        </div>

        {/* Desktop: grid tradicional */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {currentCards.map((card) => (
            <div
              key={card.id}
              className="group relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="relative">
                <CardImage
                  src={card.Image}
                  alt={card.destiny}
                  imgClass="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  wrapperClass="relative"
                />
                {/* Badge do tipo */}
                {card.package && (
                  <div className="absolute top-3 left-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg">
                    Pacote
                  </div>
                )}
                {!card.package && card.ticket && (
                  <div className="absolute top-3 left-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg">
                    Passagem
                  </div>
                )}

                {/* Botões admin */}
                {isAdmin && (
                  <>
                    <button
                      onClick={() => handleDelete(card.id)}
                      className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm hover:bg-red-500 hover:text-white p-2 rounded-full transition-all duration-200 shadow-lg"
                      title="Excluir oferta"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9zM4 5a2 2 0 012-2h8a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V5zM8 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm4 0a1 1 0 10-2 0v4a1 1 0 102 0V8z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleEdit(card)}
                      className="absolute top-3 right-14 bg-white/90 backdrop-blur-sm hover:bg-blue-500 hover:text-white p-2 rounded-full transition-all duration-200 shadow-lg"
                      title="Editar oferta"
                    >
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
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                    </button>
                  </>
                )}
              </div>

              <div className="p-5">
                <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                  {card.destiny}
                </h3>

                <div className="flex items-center text-gray-600 mb-4">
                  <svg
                    className="w-4 h-4 mr-2 text-blue-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm">{card.date}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-500 mb-1">
                      Pacotes a partir de
                    </span>
                    <span className="text-2xl font-bold text-blue-600">
                      R$ {card.price}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Componente de Paginação - Compacta em mobile, normal em desktop */}
      <div className="flex justify-center mt-6 md:mt-8">
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 rounded-lg bg-white shadow disabled:opacity-30 disabled:cursor-not-allowed active:scale-90 transition-all"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <span className="text-sm font-medium text-white bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full">
            {currentPage} / {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg bg-white shadow disabled:opacity-30 disabled:cursor-not-allowed active:scale-90 transition-all"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
        <div className="hidden md:block">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>

      {/* Modal de edição modernizado */}
      {editModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6">
              <h2 className="text-2xl font-bold">Editar Oferta Nacional</h2>
              <p className="text-blue-100 mt-1">
                Atualize as informações da oferta
              </p>
            </div>

            <div className="p-6 space-y-4">
              {/* Preview da imagem atual */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Imagem Atual
                </label>
                <CardImage
                  src={editingCard?.Image}
                  alt={editingCard?.destiny}
                  imgClass="w-full h-32 object-cover rounded-lg border"
                  wrapperClass="relative"
                />
              </div>

              {/* Upload de nova imagem */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Alterar Imagem
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  disabled={uploadingImage}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                {uploadingImage && (
                  <p className="text-sm text-blue-600 mt-1">
                    Fazendo upload...
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Destino
                </label>
                <input
                  type="text"
                  value={editingCard?.destiny || ""}
                  onChange={(e) =>
                    setEditingCard({ ...editingCard, destiny: e.target.value })
                  }
                  placeholder="Nome do destino"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Data
                </label>
                <input
                  type="date"
                  value={editingCard?.date || ""}
                  onChange={(e) =>
                    setEditingCard({ ...editingCard, date: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preço (R$)
                </label>
                <input
                  type="text"
                  value={editingCard?.price || ""}
                  onChange={(e) => {
                    setEditingCard({ ...editingCard, price: e.target.value });
                  }}
                  placeholder="000,00"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            <div className="bg-gray-50 px-6 py-4 flex justify-end space-x-3">
              <button
                onClick={() => setEditModalOpen(false)}
                className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Cancelar
              </button>
              <button
                onClick={saveEdit}
                disabled={uploadingImage}
                className="px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-lg transition-all font-medium shadow-md hover:shadow-lg disabled:opacity-50"
              >
                {uploadingImage ? "Salvando..." : "Salvar Alterações"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NationalCard;
