import React, { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
  addDoc,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { db } from "../../firebase/firbase";
import Swal from "sweetalert2";
import Pagination from "../Pagination";

const AccommodationCard = ({ isAdmin = false }) => {
  const [accommodations, setAccommodations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingAccommodation, setEditingAccommodation] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [uploadingImage, setUploadingImage] = useState(false);
  const accommodationsPerPage = 8;
  
  const [formData, setFormData] = useState({
    name: "",
    mainImage: "",
    imageUrl: "",
    rating: "",
    location: "",
    price: "",
    amenities: "",
    description: "",
  });

  // Cálculos para paginação
  const totalPages = Math.ceil(accommodations.length / accommodationsPerPage);
  const startIndex = (currentPage - 1) * accommodationsPerPage;
  const endIndex = startIndex + accommodationsPerPage;
  const currentAccommodations = accommodations.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleWhatsAppClick = (accommodationName) => {
    const whatsappNumber = "5511957700305";
    const message = `Olá! Gostaria de saber mais sobre a acomodação: ${accommodationName}`;
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappLink, "_blank");
  };
  useEffect(() => {
    const fetchAccommodations = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "accommodations"));
        const accommodationData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAccommodations(accommodationData);
      } catch (error) {
        console.error("Erro ao buscar acomodações:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAccommodations();
  }, []);

  const handleImageUpload = async (file) => {
    if (!file) return null;

    setUploadingImage(true);
    try {
      const storage = getStorage();
      const imageRef = ref(storage, `accommodations/${Date.now()}_${file.name}`);
      const snapshot = await uploadBytes(imageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      return downloadURL;
    } catch (error) {
      console.error("Erro ao fazer upload da imagem:", error);
      Swal.fire({
        icon: "error",
        title: "Erro no upload",
        text: "Erro ao fazer upload da imagem. Tente novamente.",
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        showConfirmButton: false,
        timer: 3000
      });
      return null;
    } finally {
      setUploadingImage(false);
    }
  };

  const deleteImageFromStorage = async (imageUrl) => {
    try {
      const storage = getStorage();
      const url = new URL(imageUrl);
      const decodedPath = decodeURIComponent(url.pathname);
      const pathStart = decodedPath.indexOf("/o/") + 3;
      const pathEnd = decodedPath.indexOf("?alt=") !== -1 ? decodedPath.indexOf("?alt=") : decodedPath.length;
      
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
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      confirmButtonColor: '#10b981',
      cancelButtonColor: '#ef4444'
    });

    if (result.isConfirmed) {
      try {
        const accommodationToDelete = accommodations.find((acc) => acc.id === id);
        if (accommodationToDelete?.mainImage) {
          await deleteImageFromStorage(accommodationToDelete.mainImage);
        }

        await deleteDoc(doc(db, "accommodations", id));
        const updatedAccommodations = accommodations.filter((acc) => acc.id !== id);
        setAccommodations(updatedAccommodations);
        
        // Ajustar página se necessário após deletar
        const newTotalPages = Math.ceil(updatedAccommodations.length / accommodationsPerPage);
        if (currentPage > newTotalPages && newTotalPages > 0) {
          setCurrentPage(newTotalPages);
        }

        Swal.fire({
          icon: "success",
          title: "Deletado!",
          text: "Acomodação removida com sucesso.",
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
          text: "Erro ao excluir a acomodação.",
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          showConfirmButton: false,
          timer: 1500
        });
      }
    }
  };

  const handleEdit = (accommodation) => {
    setEditingAccommodation(accommodation);
    setFormData({ ...accommodation, imageUrl: accommodation.mainImage || "" });
    setEditModalOpen(true);
  };

  const handleCreate = () => {
    setFormData({
      name: "",
      mainImage: "",
      imageUrl: "",
      rating: "",
      location: "",
      price: "",
      amenities: "",
      description: "",
    });
    setCreateModalOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const uploadedUrl = await handleImageUpload(file);
      if (uploadedUrl) {
        setFormData(prev => ({ ...prev, imageUrl: uploadedUrl }));
      }
    }
  };

  const saveEdit = async () => {
    if (editingAccommodation) {
      try {
        const updatedData = { ...formData };
        
        // Update mainImage if imageUrl has changed
        if (formData.imageUrl && formData.imageUrl !== editingAccommodation.mainImage) {
          updatedData.mainImage = formData.imageUrl;
        }

        await updateDoc(doc(db, "accommodations", editingAccommodation.id), updatedData);

        setAccommodations((prevAccommodations) =>
          prevAccommodations.map((acc) =>
            acc.id === editingAccommodation.id ? { ...acc, ...updatedData } : acc
          )
        );

        setEditModalOpen(false);
        setEditingAccommodation(null);

        Swal.fire({
          icon: "success",
          title: "Sucesso!",
          text: "Acomodação editada com sucesso!",
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          showConfirmButton: false,
          timer: 1500,
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Erro!",
          text: "Erro ao editar a acomodação.",
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          showConfirmButton: false,
          timer: 1500,
        });
        console.error("Erro ao editar acomodação:", error);
      }
    }
  };

  const saveCreate = async () => {
    try {
      if (!formData.imageUrl) {
        Swal.fire({
          icon: "warning",
          title: "Imagem obrigatória",
          text: "Por favor, selecione uma imagem para a acomodação.",
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          showConfirmButton: false,
          timer: 2000
        });
        return;
      }

      const newAccommodation = {
        ...formData,
        mainImage: formData.imageUrl,
        createdAt: new Date().toISOString(),
      };

      const docRef = await addDoc(collection(db, "accommodations"), newAccommodation);
      setAccommodations((prev) => [...prev, { id: docRef.id, ...newAccommodation }]);

      setCreateModalOpen(false);

      Swal.fire({
        icon: "success",
        title: "Sucesso!",
        text: "Acomodação criada com sucesso!",
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Erro!",
        text: "Erro ao criar acomodação.",
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        showConfirmButton: false,
        timer: 1500,
      });
      console.error("Erro ao criar acomodação:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          <p className="text-gray-600 font-medium">Carregando acomodações...</p>
        </div>
      </div>
    );
  }

  if (accommodations.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="flex flex-col items-center space-y-4">
          <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H9m0 0H5m0 0h2M7 7h10M7 11h6" />
          </svg>
          <h3 className="text-xl font-semibold text-gray-700">Nenhuma acomodação encontrada</h3>
          <p className="text-gray-500">Em breve teremos opções de hospedagem disponíveis!</p>
          {isAdmin && (
            <button
              onClick={handleCreate}
              className="mt-4 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Criar Primeira Acomodação
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Botão para criar nova acomodação (Admin) */}
      {isAdmin && (
        <div className="mb-6 flex justify-end">
          <button
            onClick={handleCreate}
            className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg flex items-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span>Nova Acomodação</span>
          </button>
        </div>
      )}

      {/* Grid responsivo de acomodações */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
        {currentAccommodations.map((accommodation) => (
          <div
            key={accommodation.id}
            className="group relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="relative">
              <img
                src={accommodation.mainImage}
                alt={accommodation.name}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              
              {/* Badge da avaliação */}
              <div className="absolute top-3 left-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg flex items-center space-x-1">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span>{accommodation.rating}</span>
              </div>

              {/* Botões admin */}
              {isAdmin && (
                <>
                  <button
                    onClick={() => handleDelete(accommodation.id)}
                    className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm hover:bg-red-500 hover:text-white p-2 rounded-full transition-all duration-200 shadow-lg group/delete"
                    title="Excluir acomodação"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9zM4 5a2 2 0 012-2h8a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V5zM8 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm4 0a1 1 0 10-2 0v4a1 1 0 102 0V8z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleEdit(accommodation)}
                    className="absolute top-3 right-14 bg-white/90 backdrop-blur-sm hover:bg-blue-500 hover:text-white p-2 rounded-full transition-all duration-200 shadow-lg"
                    title="Editar acomodação"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                </>
              )}
            </div>

            <div className="p-5">
              <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                {accommodation.name}
              </h3>
              
              <div className="flex items-center text-gray-600 mb-3">
                <svg className="w-4 h-4 mr-2 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm">{accommodation.location}</span>
              </div>

              {accommodation.amenities && (
                <div className="mb-3">
                  <p className="text-sm text-gray-600 line-clamp-2">{accommodation.amenities}</p>
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-blue-600">
                    {accommodation.price}
                  </span>
                  <span className="text-xs text-gray-500">por noite</span>
                </div>
                
                {!isAdmin ? (
                  <button
                    onClick={() => handleWhatsAppClick(accommodation.name)}
                    className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 shadow-md hover:shadow-lg flex items-center space-x-2"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                    </svg>
                    <span>Reservar</span>
                  </button>
                ) : (
                  <button
                    onClick={() => handleEdit(accommodation)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    Editar
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
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden max-h-[90vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6">
              <h2 className="text-2xl font-bold">Editar Acomodação</h2>
              <p className="text-blue-100 mt-1">Atualize as informações da acomodação</p>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nome da Acomodação</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Nome da acomodação"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Imagem</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                {uploadingImage && (
                  <p className="text-sm text-blue-600 mt-1">Fazendo upload da imagem...</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Avaliação</label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="5"
                    name="rating"
                    value={formData.rating}
                    onChange={handleChange}
                    placeholder="4.5"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Preço por Noite</label>
                  <input
                    type="text"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="R$ 150"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Localização</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Cidade, Estado"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Comodidades</label>
                <textarea
                  name="amenities"
                  value={formData.amenities}
                  onChange={handleChange}
                  placeholder="Wi-Fi, Piscina, Café da manhã..."
                  rows="3"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Descrição</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Descrição detalhada da acomodação..."
                  rows="3"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
                ></textarea>
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
                disabled={imageUploading}
                className="px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-lg transition-all font-medium shadow-md hover:shadow-lg disabled:opacity-50"
              >
                {imageUploading ? "Salvando..." : "Salvar Alterações"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de criação */}
      {createModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden max-h-[90vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6">
              <h2 className="text-2xl font-bold">Nova Acomodação</h2>
              <p className="text-blue-100 mt-1">Adicione uma nova opção de hospedagem</p>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nome da Acomodação *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Nome da acomodação"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Imagem *</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                />
                {uploadingImage && (
                  <p className="text-sm text-blue-600 mt-1">Fazendo upload da imagem...</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Avaliação</label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="5"
                    name="rating"
                    value={formData.rating}
                    onChange={handleChange}
                    placeholder="4.5"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Preço por Noite</label>
                  <input
                    type="text"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="R$ 150"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Localização</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Cidade, Estado"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Comodidades</label>
                <textarea
                  name="amenities"
                  value={formData.amenities}
                  onChange={handleChange}
                  placeholder="Wi-Fi, Piscina, Café da manhã..."
                  rows="3"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Descrição</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Descrição detalhada da acomodação..."
                  rows="3"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
                ></textarea>
              </div>
            </div>

            <div className="bg-gray-50 px-6 py-4 flex justify-end space-x-3">
              <button
                onClick={() => setCreateModalOpen(false)}
                className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Cancelar
              </button>
              <button
                onClick={saveCreate}
                disabled={imageUploading}
                className="px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-lg transition-all font-medium shadow-md hover:shadow-lg disabled:opacity-50"
              >
                {imageUploading ? "Criando..." : "Criar Acomodação"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccommodationCard;
