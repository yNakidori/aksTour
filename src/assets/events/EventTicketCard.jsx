import React, { useState, useEffect } from "react";
import { collection, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../firebase/firbase";
import { FcFullTrash, FcSupport } from "react-icons/fc";
import { TextField } from "@mui/material";
import Swal from "sweetalert2";
import Pagination from "../Pagination";

const EventTicketCard = ({ isAdmin = false }) => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingCard, setEditingCard] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  
  // Estados para paginação
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "events"));
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

  // Cálculos de paginação
  const totalPages = Math.ceil(cards.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCards = cards.slice(startIndex, endIndex);

  // Função para mudança de página com scroll
  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Tem certeza?",
      text: "Você não conseguirá reverter isso!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim, excluir!",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        await deleteDoc(doc(db, "events", id));
        setCards(cards.filter((card) => card.id !== id));
        
        // Ajustar página se necessário
        const newTotalPages = Math.ceil((cards.length - 1) / itemsPerPage);
        if (currentPage > newTotalPages && newTotalPages > 0) {
          setCurrentPage(newTotalPages);
        }
        
        Swal.fire("Excluído!", "O evento foi excluído.", "success");
      } catch (error) {
        console.error("Erro ao excluir:", error);
        Swal.fire("Erro!", "Não foi possível excluir o evento.", "error");
      }
    }
  };

  // Função para iniciar a edição de um evento
  const handleEdit = (card) => {
    setEditingCard(card);
    setEditModalOpen(true);
    console.log("Editando:", card);
  };

  // Função para fazer upload da nova imagem
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadingImage(true);
      try {
        const storageRef = ref(storage, `events/${file.name}`);
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);
        setEditingCard({ ...editingCard, Image: downloadURL });
      } catch (error) {
        console.error("Erro no upload:", error);
        Swal.fire("Erro!", "Não foi possível fazer upload da imagem.", "error");
      } finally {
        setUploadingImage(false);
      }
    }
  };

  // Função para salvar as alterações de um evento
  const saveEdit = async () => {
    try {
      const docRef = doc(db, "events", editingCard.id);
      await updateDoc(docRef, editingCard);
      setCards(cards.map(card => card.id === editingCard.id ? editingCard : card));
      setEditModalOpen(false);
      Swal.fire("Sucesso!", "Evento atualizado com sucesso!", "success");
    } catch (error) {
      console.error("Erro ao salvar:", error);
      Swal.fire("Erro!", "Não foi possível salvar as alterações.", "error");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-600"></div>
      </div>
    );
  }

  if (cards.length === 0) {
    return (
      <div className="text-center p-8">
        <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
          <FcSupport className="w-8 h-8" />
        </div>
        <p className="text-gray-500 text-lg">Nenhum evento disponível no momento.</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Grid responsivo de eventos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
        {currentCards.map(({ id, Image, title, date, location, price }) => (
          <div
            key={id}
            className="group relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="relative">
              <img 
                src={Image} 
                alt={title} 
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" 
              />
              
              {/* Badge do evento */}
              <div className="absolute top-3 left-3 bg-gradient-to-r from-rose-500 to-pink-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg">
                Evento
              </div>

              {/* Botões admin */}
              {isAdmin && (
                <>
                  <button
                    onClick={() => handleDelete(id)}
                    className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm hover:bg-red-500 hover:text-white p-2 rounded-full transition-all duration-200 shadow-lg group/delete"
                    title="Excluir evento"
                  >
                    <FcFullTrash className="w-4 h-4 group-hover/delete:hidden" />
                    <svg className="w-4 h-4 hidden group-hover/delete:block" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9zM4 5a2 2 0 012-2h8a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V5zM8 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm4 0a1 1 0 10-2 0v4a1 1 0 102 0V8z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleEdit({ id, Image, title, date, location, price })}
                    className="absolute top-3 right-14 bg-white/90 backdrop-blur-sm hover:bg-blue-500 hover:text-white p-2 rounded-full transition-all duration-200 shadow-lg"
                    title="Editar evento"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                </>
              )}
            </div>

            <div className="p-5">
              <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-rose-600 transition-colors line-clamp-2">
                {title}
              </h3>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-gray-600">
                  <svg className="w-4 h-4 mr-2 text-rose-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm">{date}</span>
                </div>
                
                <div className="flex items-center text-gray-600">
                  <svg className="w-4 h-4 mr-2 text-rose-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm">{location}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-rose-600">
                    R$ {price}
                  </span>
                  <span className="text-xs text-gray-500">por pessoa</span>
                </div>
                
                {!isAdmin && (
                  <button className="bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 shadow-md hover:shadow-lg">
                    Comprar
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Componente de Paginação */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        className="mt-8"
      />

      {/* Modal de edição */}
      {editModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Editar Evento</h2>

            {/* Preview da imagem atual */}
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Imagem Atual
              </label>
              <img
                src={editingCard.Image}
                alt={editingCard.title}
                className="w-full h-32 object-cover rounded-lg border"
              />
            </div>

            {/* Upload de nova imagem */}
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Alterar Imagem
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={uploadingImage}
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring focus:ring-blue-200"
              />
              {uploadingImage && (
                <p className="text-blue-600 text-sm mt-1">Fazendo upload...</p>
              )}
            </div>

            <TextField
              id="title"
              label="Título"
              type="text"
              value={editingCard.title}
              variant="standard"
              fullWidth
              onChange={(e) =>
                setEditingCard({ ...editingCard, title: e.target.value })
              }
              placeholder="Título do evento"
              style={{ marginBottom: "16px" }}
            />

            <TextField
              className="mt-4"
              id="date"
              label="Data"
              type="date"
              variant="standard"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={editingCard.date}
              onChange={(e) =>
                setEditingCard({ ...editingCard, date: e.target.value })
              }
              style={{ marginBottom: "16px" }}
            />

            <TextField
              className="mt-4"
              id="location"
              label="Local"
              type="text"
              value={editingCard.location}
              variant="standard"
              fullWidth
              onChange={(e) =>
                setEditingCard({ ...editingCard, location: e.target.value })
              }
              placeholder="Local do evento"
              style={{ marginBottom: "16px" }}
            />

            <TextField
              className="mt-4"
              id="price"
              label="Preço"
              type="text"
              value={editingCard.price}
              variant="standard"
              fullWidth
              onChange={(e) => {
                setEditingCard({ ...editingCard, price: e.target.value });
              }}
              style={{ marginBottom: "16px" }}
              placeholder="Preço"
            />

            <div className="flex gap-2 mt-4">
              <button
                onClick={saveEdit}
                disabled={uploadingImage}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition disabled:bg-blue-300"
              >
                Salvar
              </button>
              <button
                onClick={() => setEditModalOpen(false)}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventTicketCard;
