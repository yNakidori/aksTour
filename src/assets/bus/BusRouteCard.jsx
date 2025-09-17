import React, { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { getStorage, ref, deleteObject, uploadBytes, getDownloadURL } from "firebase/storage";
import { db } from "../../firebase/firbase";
import Swal from "sweetalert2";
import Pagination from "../Pagination";

const BusRouteCard = ({ isAdmin = false }) => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingCard, setEditingCard] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [uploadingImage, setUploadingImage] = useState(false);
  const cardsPerPage = 8;
  
  const [formData, setFormData] = useState({
    name: "",
    mainImageUrl: "",
    duration: "",
    company: "",
    Category: "",
    price: "",
  });

  // Cálculos para paginação
  const totalPages = Math.ceil(cards.length / cardsPerPage);
  const startIndex = (currentPage - 1) * cardsPerPage;
  const endIndex = startIndex + cardsPerPage;
  const currentCards = cards.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleWhatsAppClick = (routeName) => {
    const whatsappNumber = "5511957700305";
    const message = `Olá! Gostaria de conhecer essa oferta para ${routeName}`;
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappLink, "_blank");
  };

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "buses"));
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

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      icon: "warning",
      title: "Tem certeza?",
      text: "Você não poderá reverter isso!",
      showCancelButton: true,
      confirmButtonText: "Sim, deletar!",
      cancelButtonText: "Cancelar",
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      confirmButtonColor: '#10b981',
      cancelButtonColor: '#ef4444'
    });

    if (result.isConfirmed) {
      try {
        const cardToDelete = cards.find((card) => card.id === id);
        if (cardToDelete?.mainImageUrl) {
          await deleteImageFromStorage(cardToDelete.mainImageUrl);
        }

        await deleteDoc(doc(db, "buses", id));
        const updatedCards = cards.filter((card) => card.id !== id);
        setCards(updatedCards);
        
        // Ajustar página se necessário após deletar
        const newTotalPages = Math.ceil(updatedCards.length / cardsPerPage);
        if (currentPage > newTotalPages && newTotalPages > 0) {
          setCurrentPage(newTotalPages);
        }

        Swal.fire({
          icon: "success",
          title: "Deletado!",
          text: "Oferta removida com sucesso.",
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          showConfirmButton: false,
          timer: 1500
        });
      } catch (error) {
        console.error("Erro ao excluir: ", error);
        Swal.fire({
          icon: "error",
          title: "Erro!",
          text: "Erro ao excluir a oferta.",
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          showConfirmButton: false,
          timer: 1500
        });
      }
    }
  };

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

  const handleEdit = (card) => {
    setEditingCard(card);
    setFormData({ ...card });
    setEditModalOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Função para fazer upload da nova imagem (igual ao EventTicketCard)
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadingImage(true);
      try {
        const storage = getStorage();
        const imageRef = ref(storage, `bus-images/${Date.now()}-${file.name}`);
        await uploadBytes(imageRef, file);
        const downloadURL = await getDownloadURL(imageRef);
        
        // Deletar imagem antiga se existir
        if (editingCard.mainImageUrl) {
          await deleteImageFromStorage(editingCard.mainImageUrl);
        }
        
        // Atualizar o estado diretamente
        setEditingCard({ ...editingCard, mainImageUrl: downloadURL });
        setFormData(prev => ({ ...prev, mainImageUrl: downloadURL }));
      } catch (error) {
        console.error("Erro no upload:", error);
        Swal.fire({
          icon: "error",
          title: "Erro!",
          text: "Não foi possível fazer upload da imagem.",
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          showConfirmButton: false,
          timer: 1500
        });
      } finally {
        setUploadingImage(false);
      }
    }
  };

  const saveEdit = async () => {
    if (editingCard) {
      try {
        await updateDoc(doc(db, "buses", editingCard.id), formData);

        setCards((prevCards) =>
          prevCards.map((card) =>
            card.id === editingCard.id ? { ...card, ...formData } : card
          )
        );

        setEditModalOpen(false);
        setEditingCard(null);
        
        Swal.fire({
          icon: "success",
          title: "Sucesso!",
          text: "Card editado com sucesso!",
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          showConfirmButton: false,
          timer: 1500,
        });
      } catch (error) {
        console.error("Erro ao salvar edição:", error);
        Swal.fire({
          icon: "error",
          title: "Erro!",
          text: "Erro ao salvar edições.",
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="text-gray-600 font-medium">Carregando ofertas rodoviárias...</p>
        </div>
      </div>
    );
  }

  if (cards.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="flex flex-col items-center space-y-4">
          <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-xl font-semibold text-gray-700">Nenhuma oferta rodoviária encontrada</h3>
          <p className="text-gray-500">Em breve teremos novas ofertas disponíveis!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Grid responsivo de ofertas rodoviárias */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
        {currentCards.map((card) => (
          <div
            key={card.id}
            className="group relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="relative">
              <img
                src={card.mainImageUrl}
                alt={card.name}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              
              {/* Badge da categoria */}
              <div className="absolute top-3 left-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg">
                {card.Category}
              </div>

              {/* Botões admin */}
              {isAdmin && (
                <>
                  <button
                    onClick={() => handleDelete(card.id)}
                    className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm hover:bg-red-500 hover:text-white p-2 rounded-full transition-all duration-200 shadow-lg group/delete"
                    title="Excluir oferta"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9zM4 5a2 2 0 012-2h8a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V5zM8 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm4 0a1 1 0 10-2 0v4a1 1 0 102 0V8z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleEdit(card)}
                    className="absolute top-3 right-14 bg-white/90 backdrop-blur-sm hover:bg-blue-500 hover:text-white p-2 rounded-full transition-all duration-200 shadow-lg"
                    title="Editar oferta"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                </>
              )}
            </div>

            <div className="p-5">
              <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                {card.name}
              </h3>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-gray-600">
                  <svg className="w-4 h-4 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm">Duração: {card.duration}</span>
                </div>
                
                <div className="flex items-center text-gray-600">
                  <svg className="w-4 h-4 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                    <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1V8a1 1 0 00-1-1h-3z" />
                  </svg>
                  <span className="text-sm">Viação: {card.company}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-blue-600">
                    R$ {card.price}
                  </span>
                  <span className="text-xs text-gray-500">por pessoa</span>
                </div>
                
                {!isAdmin && (
                  <button
                    onClick={() => handleWhatsAppClick(card.name)}
                    className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 shadow-md hover:shadow-lg flex items-center space-x-2"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                    </svg>
                    <span>Quero essa oferta</span>
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

      {/* Modal de edição modernizado */}
      {editModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
            {/* Header do modal */}
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6">
              <h2 className="text-2xl font-bold">Editar Oferta Rodoviária</h2>
              <p className="text-blue-100 mt-1">Atualize as informações da oferta</p>
            </div>

            {/* Corpo do modal */}
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Destino</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Digite o destino"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">URL da Imagem</label>
                <input
                  type="text"
                  name="mainImageUrl"
                  value={formData.mainImageUrl}
                  disabled
                  placeholder="URL da imagem (somente leitura)"
                  className="w-full border border-gray-200 rounded-lg px-4 py-2 bg-gray-100 text-gray-500 cursor-not-allowed"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Duração</label>
                  <input
                    type="text"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    placeholder="Ex: 8h"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Preço (R$)</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="0,00"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Viação</label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Nome da viação"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Categoria</label>
                <input
                  type="text"
                  name="Category"
                  value={formData.Category}
                  onChange={handleChange}
                  placeholder="Ex: Executivo, Leito"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Preview da imagem atual */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Imagem Atual</label>
                <img
                  src={editingCard.mainImageUrl}
                  alt={editingCard.name}
                  className="w-full h-32 object-cover rounded-lg border border-gray-300"
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
                  onChange={handleImageUpload}
                  disabled={uploadingImage}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed"
                />
                {uploadingImage && (
                  <p className="text-blue-600 text-sm mt-2 flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-600 border-t-transparent"></div>
                    Fazendo upload...
                  </p>
                )}
              </div>
            </div>

            {/* Footer do modal */}
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
                className="px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-lg transition-all font-medium shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {uploadingImage ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    Processando...
                  </>
                ) : (
                  'Salvar Alterações'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BusRouteCard;
