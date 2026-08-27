import { useEffect, useState, useRef } from "react";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { db } from "../../firebase/firbase";
import Swal from "sweetalert2";
import Pagination from "../Pagination";

// Importar os ícones usados nas amenidades
const amenitiesIcons = {
  "Wi-Fi gratuito": "📶",
  "Café da manhã": "☕",
  Restaurante: "🍽️",
  Piscina: "🏊‍♂️",
  "Carregador de celular e veículos elétricos": "🔌",
  Estacionamento: "🚗",
  "Cozinha equipada": "🍳",
};

const palette = {
  navy: "#0E2C45",
  gold: "#B78E46",
  pale: "#F6FBF8",
  subtle: "#E6F0EC",
};

export default function AccommodationList({ isAdmin = false }) {
  const [accommodations, setAccommodations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingCard, setEditingCard] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [imageFile, setImageFile] = useState(null);
  const [imageUploading, setImageUploading] = useState(false);
  const accommodationsPerPage = 8;
  const listTopRef = useRef(null);

  const [editForm, setEditForm] = useState({
    name: "",
    price: "",
    days: "",
    description: "",
    location: "",
    rating: 0,
    mainImageUrl: "",
  });

  // Cálculos para paginação
  const totalPages = Math.ceil(accommodations.length / accommodationsPerPage);
  const startIndex = (currentPage - 1) * accommodationsPerPage;
  const endIndex = startIndex + accommodationsPerPage;
  const currentAccommodations = accommodations.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Scroll suave para o topo da lista
    if (listTopRef.current) {
      listTopRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "accommodations"));
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAccommodations(data);
      } catch (error) {
        console.error("Erro ao buscar acomodações:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleImageUpload = async (file) => {
    if (!file) return null;

    setImageUploading(true);
    try {
      const storage = getStorage();
      const imageRef = ref(
        storage,
        `accommodations/${Date.now()}_${file.name}`,
      );
      const snapshot = await uploadBytes(imageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      return downloadURL;
    } catch (error) {
      console.error("Erro ao fazer upload da imagem:", error);
      Swal.fire({
        icon: "error",
        title: "Erro no upload",
        text: "Erro ao fazer upload da imagem. Tente novamente.",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        color: "white",
        showConfirmButton: false,
        timer: 3000,
      });
      return null;
    } finally {
      setImageUploading(false);
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
        // Busca a acomodação para pegar a URL da imagem
        const accToDelete = accommodations.find((acc) => acc.id === id);
        if (accToDelete?.mainImageUrl) {
          await deleteImageFromStorage(accToDelete.mainImageUrl);
        }

        await deleteDoc(doc(db, "accommodations", id));
        const updatedAccommodations = accommodations.filter(
          (acc) => acc.id !== id,
        );
        setAccommodations(updatedAccommodations);

        // Ajustar página se necessário após deletar
        const newTotalPages = Math.ceil(
          updatedAccommodations.length / accommodationsPerPage,
        );
        if (currentPage > newTotalPages && newTotalPages > 0) {
          setCurrentPage(newTotalPages);
        }

        Swal.fire({
          icon: "success",
          title: "Sucesso!",
          text: "Acomodação excluída com sucesso.",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
          showConfirmButton: false,
          timer: 1500,
        });
      } catch (error) {
        console.error("Erro ao excluir a acomodação: ", error);
        Swal.fire({
          icon: "error",
          title: "Erro!",
          text: "Não foi possível excluir a acomodação.",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
          showConfirmButton: false,
          timer: 1500,
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

  // Função para abrir o modal de edição
  const handleEdit = (acc) => {
    setEditingCard(acc);
    setEditForm({
      name: acc.name || "",
      price: acc.price || "",
      days: acc.days || "",
      description: acc.description || "",
      location: acc.location || "",
      rating: acc.rating || 0,
      mainImageUrl: acc.mainImageUrl || "",
    });
    setImageFile(null);
    setOpenModal(true);
  };

  // Função para atualizar o formulário de edição
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
    }
  };

  // Função para salvar a edição
  const handleEditSave = async () => {
    try {
      let updatedData = { ...editForm };

      if (imageFile) {
        const imageUrl = await handleImageUpload(imageFile);
        if (imageUrl) {
          // Deletar imagem antiga se existir
          if (editingCard.mainImageUrl) {
            await deleteImageFromStorage(editingCard.mainImageUrl);
          }
          updatedData.mainImageUrl = imageUrl;
        }
      }

      await updateDoc(doc(db, "accommodations", editingCard.id), {
        ...updatedData,
        rating: parseFloat(updatedData.rating),
      });

      setAccommodations((prev) =>
        prev.map((acc) =>
          acc.id === editingCard.id
            ? { ...acc, ...updatedData, rating: parseFloat(updatedData.rating) }
            : acc,
        ),
      );

      setOpenModal(false);
      setEditingCard(null);
      setImageFile(null);

      Swal.fire({
        icon: "success",
        title: "Editado!",
        text: "Acomodação editada com sucesso.",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        color: "white",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Erro!",
        text: "Não foi possível editar a acomodação.",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        color: "white",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="flex flex-col items-center space-y-4">
          <div
            className="animate-spin rounded-full h-12 w-12 border-b-2"
            style={{ borderColor: palette.gold }}
          ></div>
          <p className="font-medium" style={{ color: palette.navy }}>
            Carregando acomodações...
          </p>
        </div>
      </div>
    );
  }

  if (accommodations.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="flex flex-col items-center space-y-4">
          <svg
            className="w-16 h-16"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            style={{ color: `${palette.navy}66` }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H9m0 0H5m0 0h2M7 7h10M7 11h6"
            />
          </svg>
          <h3 className="text-xl font-semibold" style={{ color: palette.navy }}>
            Nenhuma acomodação encontrada
          </h3>
          <p style={{ color: `${palette.navy}99` }}>
            Em breve teremos opções de hospedagem disponíveis!
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
          {currentAccommodations.map((acc) => (
            <div
              key={acc.id}
              className="group relative bg-white rounded-xl shadow-lg overflow-hidden flex-shrink-0 w-[85vw] snap-center active:scale-95 transition-transform duration-200"
            >
              <div className="relative">
                <img
                  src={acc.mainImageUrl}
                  alt={acc.name}
                  className="w-full h-44 sm:h-48 md:h-52 object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Badge da avaliação */}
                <div className="absolute top-2 left-2 md:top-3 md:left-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-semibold px-2.5 py-1 md:px-3 rounded-full shadow-lg flex items-center space-x-1">
                  <svg
                    className="w-3 h-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span>{acc.rating}</span>
                </div>

                {/* Botões admin */}
                {isAdmin && (
                  <>
                    <button
                      onClick={() => handleDelete(acc.id)}
                      className="absolute top-2 right-2 md:top-3 md:right-3 bg-white/90 backdrop-blur-sm hover:text-white p-2.5 md:p-2 rounded-full transition-all duration-200 shadow-lg active:scale-90"
                      style={{ color: palette.navy }}
                      onMouseEnter={(e) =>
                        (e.target.style.backgroundColor = palette.gold)
                      }
                      onMouseLeave={(e) =>
                        (e.target.style.backgroundColor =
                          "rgba(255,255,255,0.9)")
                      }
                      title="Excluir acomodação"
                    >
                      <svg
                        className="w-4 h-4 md:w-4 md:h-4"
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
                      onClick={() => handleEdit(acc)}
                      className="absolute top-2 right-14 md:top-3 md:right-14 bg-white/90 backdrop-blur-sm hover:text-white p-2.5 md:p-2 rounded-full transition-all duration-200 shadow-lg active:scale-90"
                      style={{ color: palette.navy }}
                      onMouseEnter={(e) =>
                        (e.target.style.backgroundColor = palette.navy)
                      }
                      onMouseLeave={(e) =>
                        (e.target.style.backgroundColor =
                          "rgba(255,255,255,0.9)")
                      }
                      title="Editar acomodação"
                    >
                      <svg
                        className="w-4 h-4 md:w-4 md:h-4"
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

              <div className="p-4 md:p-5">
                <h3
                  className="text-lg md:text-xl font-bold mb-2 transition-colors line-clamp-2"
                  style={{ color: palette.navy }}
                >
                  {acc.name}
                </h3>

                <div
                  className="flex items-center mb-2 md:mb-3"
                  style={{ color: `${palette.navy}99` }}
                >
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    style={{ color: palette.gold }}
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm">{acc.location}</span>
                </div>

                {acc.description && (
                  <p
                    className="text-xs md:text-sm mb-2 md:mb-3 line-clamp-2"
                    style={{ color: `${palette.navy}99` }}
                  >
                    {acc.description}
                  </p>
                )}

                {acc.amenities?.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-2 md:mb-3">
                    {acc.amenities.slice(0, 3).map((amenity) => (
                      <span
                        key={amenity}
                        title={amenity}
                        className="text-sm px-2 py-1 rounded-full"
                        style={{
                          backgroundColor: `${palette.gold}15`,
                          color: palette.gold,
                        }}
                      >
                        {amenitiesIcons[amenity] || "🏨"}
                      </span>
                    ))}
                    {acc.amenities.length > 3 && (
                      <span
                        className="text-xs self-center"
                        style={{ color: `${palette.navy}99` }}
                      >
                        +{acc.amenities.length - 3} mais
                      </span>
                    )}
                  </div>
                )}

                <div className="flex items-center justify-between mt-2">
                  <div className="flex flex-col">
                    <span
                      className="text-base md:text-lg font-bold"
                      style={{ color: palette.gold }}
                    >
                      {acc.price}
                    </span>
                    {acc.days && (
                      <span
                        className="text-xs"
                        style={{ color: `${palette.navy}99` }}
                      >
                        {acc.days} dias
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Indicadores de navegação para mobile */}
        <div className="md:hidden flex justify-center items-center gap-2 mt-2 mb-4">
          <span className="text-xs" style={{ color: `${palette.navy}99` }}>
            Deslize para ver mais →
          </span>
        </div>

        {/* Desktop: grid tradicional */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {currentAccommodations.map((acc) => (
            <div
              key={acc.id}
              className="group relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
              style={{
                border: `1px solid ${palette.navy}15`,
              }}
            >
              <div className="relative">
                <img
                  src={acc.mainImageUrl}
                  alt={acc.name}
                  className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Badge da avaliação */}
                <div
                  className="absolute top-3 left-3 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg flex items-center space-x-1"
                  style={{ backgroundColor: palette.gold }}
                >
                  <svg
                    className="w-3 h-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span>{acc.rating}</span>
                </div>

                {/* Botões admin */}
                {isAdmin && (
                  <>
                    <button
                      onClick={() => handleDelete(acc.id)}
                      className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm hover:text-white p-2 rounded-full transition-all duration-200 shadow-lg"
                      style={{ color: palette.navy }}
                      onMouseEnter={(e) =>
                        (e.target.style.backgroundColor = palette.gold)
                      }
                      onMouseLeave={(e) =>
                        (e.target.style.backgroundColor =
                          "rgba(255,255,255,0.9)")
                      }
                      title="Excluir acomodação"
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
                      onClick={() => handleEdit(acc)}
                      className="absolute top-3 right-14 bg-white/90 backdrop-blur-sm hover:text-white p-2 rounded-full transition-all duration-200 shadow-lg"
                      style={{ color: palette.navy }}
                      onMouseEnter={(e) =>
                        (e.target.style.backgroundColor = palette.navy)
                      }
                      onMouseLeave={(e) =>
                        (e.target.style.backgroundColor =
                          "rgba(255,255,255,0.9)")
                      }
                      title="Editar acomodação"
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
                <h3
                  className="text-xl font-bold mb-2 transition-colors line-clamp-2"
                  style={{ color: palette.navy }}
                >
                  {acc.name}
                </h3>

                <div
                  className="flex items-center mb-3"
                  style={{ color: `${palette.navy}99` }}
                >
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    style={{ color: palette.gold }}
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm">{acc.location}</span>
                </div>

                {acc.description && (
                  <p
                    className="text-sm mb-3 line-clamp-2"
                    style={{ color: `${palette.navy}99` }}
                  >
                    {acc.description}
                  </p>
                )}

                {acc.amenities?.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {acc.amenities.slice(0, 3).map((amenity) => (
                      <span
                        key={amenity}
                        title={amenity}
                        className="text-sm px-2 py-1 rounded-full"
                        style={{
                          backgroundColor: `${palette.gold}15`,
                          color: palette.gold,
                        }}
                      >
                        {amenitiesIcons[amenity] || "🏨"}
                      </span>
                    ))}
                    {acc.amenities.length > 3 && (
                      <span
                        className="text-xs self-center"
                        style={{ color: `${palette.navy}99` }}
                      >
                        +{acc.amenities.length - 3} mais
                      </span>
                    )}
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span
                      className="text-lg font-bold"
                      style={{ color: palette.gold }}
                    >
                      {acc.price}
                    </span>
                    {acc.days && (
                      <span
                        className="text-xs"
                        style={{ color: `${palette.navy}99` }}
                      >
                        {acc.days} dias
                      </span>
                    )}
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
            style={{ borderColor: `${palette.navy}15` }}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              style={{ color: palette.navy }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <span
            className="text-sm font-medium px-3"
            style={{ color: palette.navy }}
          >
            {currentPage} / {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg bg-white shadow disabled:opacity-30 disabled:cursor-not-allowed active:scale-90 transition-all"
            style={{ borderColor: `${palette.navy}15` }}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              style={{ color: palette.navy }}
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
      {openModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50 p-2 md:p-4">
          <div
            className="rounded-xl md:rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden max-h-[95vh] md:max-h-[90vh] overflow-y-auto"
            style={{
              backgroundColor: "white",
              border: `1px solid ${palette.navy}15`,
            }}
          >
            <div
              className="text-white p-4 md:p-6"
              style={{ backgroundColor: palette.navy }}
            >
              <h2 className="text-xl md:text-2xl font-bold">
                Editar Acomodação
              </h2>
              <p
                className="mt-1 text-sm md:text-base"
                style={{ color: palette.subtle }}
              >
                Atualize as informações da acomodação
              </p>
            </div>

            <div className="p-4 md:p-6 space-y-3 md:space-y-4">
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: palette.navy }}
                >
                  Nome da Acomodação
                </label>
                <input
                  type="text"
                  name="name"
                  value={editForm.name}
                  onChange={handleEditChange}
                  placeholder="Nome da acomodação"
                  className="w-full rounded-lg px-4 py-2 focus:ring-2 focus:border-transparent transition-all"
                  style={{
                    border: `1px solid ${palette.navy}30`,
                    focusRing: palette.gold,
                  }}
                />
              </div>

              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: palette.navy }}
                >
                  Imagem
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full rounded-lg px-4 py-2 focus:ring-2 focus:border-transparent transition-all"
                  style={{
                    border: `1px solid ${palette.navy}30`,
                  }}
                />
                {imageUploading && (
                  <p className="text-sm mt-1" style={{ color: palette.gold }}>
                    Fazendo upload da imagem...
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: palette.navy }}
                  >
                    Ava\u0301liao
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="5"
                    name="rating"
                    value={editForm.rating}
                    onChange={handleEditChange}
                    placeholder="4.5"
                    className="w-full rounded-lg px-4 py-2 focus:ring-2 focus:border-transparent transition-all"
                    style={{
                      border: `1px solid ${palette.navy}30`,
                    }}
                  />
                </div>

                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: palette.navy }}
                  >
                    Dias
                  </label>
                  <input
                    type="number"
                    name="days"
                    value={editForm.days}
                    onChange={handleEditChange}
                    placeholder="3"
                    className="w-full rounded-lg px-4 py-2 focus:ring-2 focus:border-transparent transition-all"
                    style={{
                      border: `1px solid ${palette.navy}30`,
                    }}
                  />
                </div>
              </div>

              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: palette.navy }}
                >
                  Pre\u00e7o
                </label>
                <input
                  type="text"
                  name="price"
                  value={editForm.price}
                  onChange={handleEditChange}
                  placeholder="R$ 150 por noite"
                  className="w-full rounded-lg px-4 py-2 focus:ring-2 focus:border-transparent transition-all"
                  style={{
                    border: `1px solid ${palette.navy}30`,
                  }}
                />
              </div>

              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: palette.navy }}
                >
                  Localiza\u00e7\u00e3o
                </label>
                <input
                  type="text"
                  name="location"
                  value={editForm.location}
                  onChange={handleEditChange}
                  placeholder="Cidade, Estado"
                  className="w-full rounded-lg px-4 py-2 focus:ring-2 focus:border-transparent transition-all"
                  style={{
                    border: `1px solid ${palette.navy}30`,
                  }}
                />
              </div>

              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: palette.navy }}
                >
                  Descri\u00e7\u00e3o
                </label>
                <textarea
                  name="description"
                  value={editForm.description}
                  onChange={handleEditChange}
                  placeholder="Descri\u00e7\u00e3o detalhada da acomoda\u00e7\u00e3o..."
                  rows="3"
                  className="w-full rounded-lg px-4 py-2 focus:ring-2 focus:border-transparent transition-all resize-none"
                  style={{
                    border: `1px solid ${palette.navy}30`,
                  }}
                ></textarea>
              </div>
            </div>

            <div
              className="px-4 md:px-6 py-3 md:py-4 flex justify-end space-x-2 md:space-x-3"
              style={{ backgroundColor: palette.subtle }}
            >
              <button
                onClick={() => setOpenModal(false)}
                className="px-3 md:px-4 py-2 text-sm md:text-base rounded-lg active:scale-95 transition-all font-medium border"
                style={{
                  color: palette.navy,
                  backgroundColor: "white",
                  borderColor: `${palette.navy}30`,
                }}
              >
                Cancelar
              </button>
              <button
                onClick={handleEditSave}
                disabled={imageUploading}
                className="px-4 md:px-6 py-2 text-sm md:text-base text-white rounded-lg active:scale-95 transition-all font-medium shadow-md hover:shadow-lg disabled:opacity-50"
                style={{ backgroundColor: palette.gold }}
              >
                {imageUploading ? "Salvando..." : "Salvar Alterações"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
