import React, { useState, useEffect } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { storage, db } from "../../firebase/firbase";

const BannerUpload = () => {
  const [uploading, setUploading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [bannerTexts, setBannerTexts] = useState(["", "", "", "", ""]);
  const [existingBanners, setExistingBanners] = useState([]);

  useEffect(() => {
    loadExistingBanners();
  }, []);

  const loadExistingBanners = async () => {
    try {
      const docSnap = await getDoc(doc(db, "settings", "mainBanner"));
      if (docSnap.exists() && docSnap.data().banners) {
        setExistingBanners(docSnap.data().banners);
        const texts = docSnap.data().banners.map((b) => b.text || "");
        setBannerTexts([...texts, ...Array(5 - texts.length).fill("")]);
      }
    } catch (error) {
      console.error("Erro ao carregar banners:", error);
    }
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    const remainingSlots = 5 - existingBanners.length;

    if (files.length > remainingSlots) {
      alert(
        `Você pode adicionar apenas ${remainingSlots} imagem(ns) no momento.`
      );
      return;
    }

    setSelectedFiles(files);

    const newPreviews = [];
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        newPreviews.push(reader.result);
        if (newPreviews.length === files.length) {
          setPreviews(newPreviews);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleTextChange = (index, value) => {
    const newTexts = [...bannerTexts];
    newTexts[index] = value;
    setBannerTexts(newTexts);
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      alert("Por favor, selecione pelo menos uma imagem!");
      return;
    }

    const hasEmptyText = selectedFiles.some((_, index) => {
      const textIndex = existingBanners.length + index;
      return !bannerTexts[textIndex]?.trim();
    });

    if (hasEmptyText) {
      alert("Por favor, adicione uma frase para cada imagem!");
      return;
    }

    try {
      setUploading(true);

      const uploadedBanners = [];

      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        const storageRef = ref(storage, `banners/banner-${Date.now()}-${i}`);
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);

        const textIndex = existingBanners.length + i;
        uploadedBanners.push({
          imageUrl: downloadURL,
          text: bannerTexts[textIndex].trim(),
          order: existingBanners.length + i,
        });
      }

      const allBanners = [...existingBanners, ...uploadedBanners];

      await setDoc(doc(db, "settings", "mainBanner"), {
        banners: allBanners,
        updatedAt: new Date().toISOString(),
      });

      alert("Banners adicionados com sucesso!");
      setSelectedFiles([]);
      setPreviews([]);
      await loadExistingBanners();
    } catch (error) {
      console.error("Erro ao fazer upload:", error);
      alert("Erro ao atualizar banners. Tente novamente.");
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveBanner = async (index) => {
    if (!window.confirm("Deseja realmente remover este banner?")) {
      return;
    }

    try {
      const updatedBanners = existingBanners.filter((_, i) => i !== index);
      const reorderedBanners = updatedBanners.map((banner, i) => ({
        ...banner,
        order: i,
      }));

      await setDoc(doc(db, "settings", "mainBanner"), {
        banners: reorderedBanners,
        updatedAt: new Date().toISOString(),
      });

      alert("Banner removido com sucesso!");
      await loadExistingBanners();
    } catch (error) {
      console.error("Erro ao remover banner:", error);
      alert("Erro ao remover banner. Tente novamente.");
    }
  };

  const remainingSlots = 5 - existingBanners.length;

  return (
    <div className="space-y-6">
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="text-white font-semibold">
              Banners Ativos: {existingBanners.length}/5
            </span>
          </div>
          <span className="text-white/70 text-sm">
            {remainingSlots} slot(s) disponível(is)
          </span>
        </div>
      </div>

      {existingBanners.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-white font-semibold">Banners Atuais</h4>
          {existingBanners.map((banner, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-4 flex items-center space-x-4"
            >
              <img
                src={banner.imageUrl}
                alt={`Banner ${index + 1}`}
                className="w-24 h-16 object-cover rounded-lg"
              />
              <div className="flex-1">
                <p className="text-white font-medium text-sm">
                  Banner {index + 1}
                </p>
                <p className="text-white/70 text-xs italic truncate">
                  "{banner.text}"
                </p>
              </div>
              <button
                onClick={() => handleRemoveBanner(index)}
                className="text-red-300 hover:text-red-100 transition-colors p-2"
                disabled={uploading}
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
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}

      {remainingSlots > 0 && (
        <>
          <div className="border-2 border-dashed border-white/30 rounded-2xl p-8 text-center hover:border-white/50 transition-colors">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileSelect}
              className="hidden"
              id="banner-upload"
              disabled={uploading}
            />
            <label htmlFor="banner-upload" className="cursor-pointer block">
              {previews.length > 0 ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    {previews.map((preview, index) => (
                      <img
                        key={index}
                        src={preview}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-32 object-cover rounded-xl"
                      />
                    ))}
                  </div>
                  <p className="text-sm text-white/80">
                    {selectedFiles.length} imagem(ns) selecionada(s) - Clique
                    para alterar
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <svg
                    className="w-16 h-16 mx-auto text-white/60"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                  <div>
                    <p className="text-lg font-semibold mb-1">
                      Adicionar Imagens ({remainingSlots} disponível
                      {remainingSlots > 1 ? "is" : ""})
                    </p>
                    <p className="text-sm text-white/70">
                      PNG, JPG ou WEBP até 5MB cada
                    </p>
                  </div>
                </div>
              )}
            </label>
          </div>

          {selectedFiles.length > 0 && (
            <div className="space-y-4">
              {selectedFiles.map((file, index) => {
                const textIndex = existingBanners.length + index;
                return (
                  <div
                    key={index}
                    className="bg-white/10 backdrop-blur-sm rounded-xl p-6"
                  >
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-20 h-14 rounded-lg overflow-hidden">
                        <img
                          src={previews[index]}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-white">
                          {file.name}
                        </p>
                        <p className="text-xs text-white/60">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <label className="block">
                      <span className="text-white font-semibold mb-2 flex items-center text-sm">
                        <svg
                          className="w-4 h-4 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                          />
                        </svg>
                        Frase do Banner {index + 1}
                      </span>
                      <textarea
                        value={bannerTexts[textIndex]}
                        onChange={(e) =>
                          handleTextChange(textIndex, e.target.value)
                        }
                        placeholder="Digite uma frase para este banner..."
                        maxLength={150}
                        rows={2}
                        disabled={uploading}
                        className="w-full px-4 py-3 bg-white/90 text-slate-800 rounded-xl border-2 border-white/30 focus:border-white focus:outline-none focus:ring-2 focus:ring-white/50 placeholder-slate-400 transition-all resize-none"
                      />
                      <div className="flex justify-end mt-1">
                        <span className="text-xs text-white/70">
                          {bannerTexts[textIndex]?.length || 0}/150
                        </span>
                      </div>
                    </label>
                  </div>
                );
              })}
            </div>
          )}

          <button
            onClick={handleUpload}
            disabled={selectedFiles.length === 0 || uploading}
            className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-300 ${
              selectedFiles.length === 0 || uploading
                ? "bg-white/20 cursor-not-allowed"
                : "bg-white/30 hover:bg-white/40 hover:shadow-lg transform hover:scale-[1.02]"
            }`}
          >
            {uploading ? (
              <div className="flex items-center justify-center space-x-2">
                <svg
                  className="animate-spin h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                <span>Enviando...</span>
              </div>
            ) : (
              `Adicionar ${selectedFiles.length} Banner(s)`
            )}
          </button>
        </>
      )}

      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
        <p className="text-xs text-white/70 leading-relaxed">
          <strong className="text-white/90">Dica:</strong> Você pode adicionar
          até 5 banners que serão exibidos em rotação na tela inicial. Use
          imagens com proporção 16:9 e resolução mínima de 1920x1080px.
        </p>
      </div>
    </div>
  );
};

export default BannerUpload;
