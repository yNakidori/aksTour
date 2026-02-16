import React, { useState, useEffect } from "react";
import Navbar from "./assets/navbar";
import Footer from "./assets/footer";

// Palette matching footer (from provided image)
const palette = {
  navy: "#0E2C45",
  gold: "#B78E46",
  pale: "#F6FBF8",
  subtle: "#E6F0EC",
};

const Social = () => {
  const [loading, setLoading] = useState(true);

  // Simular carregamento
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Posts simulados do Instagram
  const instagramPosts = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
      caption:
        "Descobrindo paraísos escondidos no Brasil! 🏝️ #Viagem #Brasil #Paraíso",
      likes: 342,
      comments: 28,
      time: "2 horas",
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828",
      caption:
        "Paris sempre rouba nosso coração! 🗼❤️ #Paris #França #TorreEiffel",
      likes: 567,
      comments: 41,
      time: "5 horas",
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
      caption:
        "Aventuras incríveis te aguardam! 🎒✈️ #Aventura #Viagem #Mochileiro",
      likes: 289,
      comments: 19,
      time: "8 horas",
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1",
      caption:
        "Por do sol perfeito nas Maldivas 🌅 #Maldivas #PorDoSol #Paraíso",
      likes: 721,
      comments: 62,
      time: "1 dia",
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e",
      caption:
        "Natureza exuberante e pontes de tirar o fôlego! 🌿🌊 #Natureza #Cachoeira #Aventura",
      likes: 445,
      comments: 33,
      time: "2 dias",
    },
    {
      id: 6,
      image: "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd",
      caption:
        "Explorando culturas fascinantes pelo mundo! 🌍🎭 #Cultura #Viagem #Descoberta",
      likes: 398,
      comments: 25,
      time: "3 dias",
    },
  ];

  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: palette.pale }}
      >
        <div className="text-center">
          <div className="relative">
            <div
              style={{
                width: 64,
                height: 64,
                borderWidth: 4,
                borderStyle: "solid",
                borderColor: palette.subtle,
                borderTopColor: palette.gold,
                borderRadius: "50%",
              }}
              className="mx-auto mb-4 animate-spin"
            ></div>
          </div>
          <p className="text-lg" style={{ color: palette.navy }}>
            Carregando Instagram...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: palette.pale }}>
      <Navbar />

      <div className="pt-20 pb-12">
        <div className="max-w-4xl mx-auto px-4">
          {/* Header da página */}
          <div className="text-center mb-12">
            <div className="relative inline-block mb-6">
              <div
                className="w-32 h-32 rounded-full p-1 mx-auto"
                style={{
                  background: `linear-gradient(135deg, ${palette.navy}, ${palette.gold})`,
                }}
              >
                <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
                  <svg
                    className="w-16 h-16 text-gray-800"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </div>
              </div>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                <div className="bg-green-500 rounded-full p-1">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <h1
              className="text-4xl md:text-5xl font-bold mb-4"
              style={{ color: palette.navy }}
            >
              @_akstur
            </h1>
            <p
              className="text-lg max-w-2xl mx-auto mb-6"
              style={{ color: palette.navy }}
            >
              🌍 Agência de Turismo | ✈️ Realizando sonhos pelo mundo | 📸
              Compartilhando aventuras incríveis
            </p>

            <div
              className="flex items-center justify-center space-x-8 text-sm"
              style={{ color: palette.navy }}
            >
              <div className="text-center">
                <div className="font-bold text-xl text-gray-800">
                  {instagramPosts.length}
                </div>
                <div>publicações</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-xl text-gray-800">2.8k</div>
                <div>seguidores</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-xl text-gray-800">340</div>
                <div>seguindo</div>
              </div>
            </div>
          </div>

          {/* Grid de posts */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {instagramPosts.map((post, index) => (
              <div
                key={post.id}
                className="group relative rounded-2xl overflow-hidden transition-all duration-500 transform hover:-translate-y-2"
                style={{
                  backgroundColor: palette.pale,
                  boxShadow: "0 10px 30px rgba(14,44,69,0.08)",
                  animationDelay: `${index * 100}ms`,
                  animation: `fadeInUp 0.6s ease-out forwards`,
                  opacity: 0,
                }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={post.image}
                    alt={`Post ${post.id}`}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />

                  {/* Overlay com informações */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                    style={{ backgroundColor: "rgba(14,44,69,0.65)" }}
                  >
                    <div className="text-white text-center p-4">
                      <div className="flex items-center justify-center space-x-6 mb-3">
                        <div className="flex items-center">
                          <svg
                            className="w-6 h-6 mr-2"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span className="font-medium">{post.likes}</span>
                        </div>
                        <div className="flex items-center">
                          <svg
                            className="w-6 h-6 mr-2"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span className="font-medium">{post.comments}</span>
                        </div>
                      </div>
                      <p className="text-sm opacity-90">Ver post completo</p>
                    </div>
                  </div>
                </div>

                <div className="p-5">
                  <p
                    className="text-sm line-clamp-2 mb-3"
                    style={{ color: palette.navy }}
                  >
                    {post.caption}
                  </p>

                  <div
                    className="flex items-center justify-between text-xs"
                    style={{ color: palette.subtle }}
                  >
                    <span>há {post.time}</span>
                    <div className="flex items-center space-x-3">
                      <button
                        className="transition-colors"
                        style={{ color: palette.navy }}
                      >
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                      <button
                        className="transition-colors"
                        style={{ color: palette.navy }}
                      >
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Call to action */}
          <div
            className="text-center mt-12 p-8 rounded-3xl border"
            style={{
              backgroundColor: palette.navy,
              borderColor: "rgba(183,142,70,0.12)",
            }}
          >
            <h3
              className="text-2xl font-bold mb-4"
              style={{ color: palette.pale }}
            >
              Siga-nos no Instagram!
            </h3>
            <p className="mb-6" style={{ color: palette.subtle }}>
              Não perca nenhuma aventura e inspire-se com destinos incríveis
            </p>
            <a
              href="https://instagram.com/_akstur"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-3 rounded-xl font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-200"
              style={{ backgroundColor: palette.gold, color: palette.navy }}
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
              Seguir @_akstur
            </a>
          </div>
        </div>
      </div>

      <Footer />

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default Social;
