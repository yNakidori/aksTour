import React, { useState, useEffect } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/firbase";

const BannerPreview = () => {
  const [bannerData, setBannerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(db, "settings", "mainBanner"),
      (doc) => {
        if (doc.exists()) {
          setBannerData(doc.data());
          setCurrentIndex(0);
        }
        setLoading(false);
      },
      (error) => {
        console.error("Erro ao carregar banner:", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (bannerData?.banners && bannerData.banners.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % bannerData.banners.length);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [bannerData]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-slate-300 border-t-slate-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Carregando preview...</p>
        </div>
      </div>
    );
  }

  const banners = bannerData?.banners || [];
  const currentBanner = banners[currentIndex];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-slate-800">
          Banners Ativos ({banners.length}/5)
        </h3>
        {bannerData?.updatedAt && (
          <span className="text-sm text-slate-500">
            Atualizado em{" "}
            {new Date(bannerData.updatedAt).toLocaleDateString("pt-BR", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        )}
      </div>

      {banners.length > 0 ? (
        <div className="space-y-4">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
            <img
              src={currentBanner.imageUrl}
              alt={`Banner ${currentIndex + 1}`}
              className="w-full h-auto object-cover transition-all duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex items-center justify-center p-8">
              {currentBanner?.text && (
                <div className="text-center transform transition-all duration-500">
                  <p className="text-white text-2xl md:text-4xl font-bold drop-shadow-2xl leading-relaxed">
                    {currentBanner.text}
                  </p>
                </div>
              )}
            </div>

            {banners.length > 1 && (
              <>
                <button
                  onClick={() =>
                    setCurrentIndex(
                      (prev) => (prev - 1 + banners.length) % banners.length
                    )
                  }
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 backdrop-blur-sm rounded-full p-3 transition-all"
                >
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
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <button
                  onClick={() =>
                    setCurrentIndex((prev) => (prev + 1) % banners.length)
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 backdrop-blur-sm rounded-full p-3 transition-all"
                >
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
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>

                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                  {banners.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentIndex
                          ? "bg-white w-8"
                          : "bg-white/50 hover:bg-white/80"
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-4 border border-indigo-100">
            <div className="flex items-start space-x-3">
              <svg
                className="w-5 h-5 text-indigo-600 mt-0.5 flex-shrink-0"
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
              <div className="flex-1">
                <p className="text-sm font-semibold text-slate-700 mb-1">
                  Banner {currentIndex + 1} de {banners.length}
                </p>
                <p className="text-sm text-slate-600 italic">
                  "{currentBanner?.text || "Sem frase definida"}"
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4">
              <div className="flex items-center space-x-2 mb-2">
                <svg
                  className="w-5 h-5 text-blue-600"
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
                <span className="text-sm font-semibold text-slate-700">
                  Total
                </span>
              </div>
              <p className="text-xs text-slate-600">
                {banners.length} banner(s)
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4">
              <div className="flex items-center space-x-2 mb-2">
                <svg
                  className="w-5 h-5 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-sm font-semibold text-slate-700">
                  Status
                </span>
              </div>
              <p className="text-xs text-slate-600">Ativo</p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4">
              <div className="flex items-center space-x-2 mb-2">
                <svg
                  className="w-5 h-5 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-sm font-semibold text-slate-700">
                  Rotação
                </span>
              </div>
              <p className="text-xs text-slate-600">5 segundos</p>
            </div>
          </div>

          {banners.length > 1 && (
            <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl p-4 border border-amber-100">
              <div className="flex items-start space-x-3">
                <svg
                  className="w-5 h-5 text-amber-600 mt-0.5"
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
                <p className="text-xs text-slate-600">
                  Os banners serão exibidos em rotação automática na tela
                  inicial, mudando a cada 5 segundos.
                </p>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-96 bg-gradient-to-br from-slate-50 to-gray-100 rounded-2xl border-2 border-dashed border-slate-300">
          <svg
            className="w-20 h-20 text-slate-300 mb-4"
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
          <p className="text-slate-500 font-semibold mb-2">
            Nenhum banner configurado
          </p>
          <p className="text-sm text-slate-400">
            Faça upload de imagens para começar
          </p>
        </div>
      )}
    </div>
  );
};

export default BannerPreview;
