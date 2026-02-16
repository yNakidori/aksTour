import React, { useRef, useState, useEffect } from "react";
import Slider from "react-slick";
import { ArrowDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firbase";

import passaporte from "../assets/images/passaporte.png";
import mapa from "../assets/images/mapa.png";

const BannerCarousel = () => {
  const sliderRef = useRef(null);
  const navigate = useNavigate();
  const [banners, setBanners] = useState(() => {
    try {
      const raw = localStorage.getItem("mainBanner_banners");
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  });

  const [loading, setLoading] = useState(() => {
    try {
      return !localStorage.getItem("mainBanner_banners");
    } catch (e) {
      return true;
    }
  });
  const [loadedImages, setLoadedImages] = useState({});

  const handleDestinyClick = () => navigate("/destinys/internacionais");
  const handleServicesClick = () => navigate("/services");

  useEffect(() => {
    loadBanners();
  }, []);

  // Preload important images (first and next) for better UX
  useEffect(() => {
    if (!banners || banners.length === 0) return;

    // Preload first image with <link rel="preload"> for faster initial paint
    const firstUrl = banners[0]?.imageUrl;
    let link;
    if (firstUrl) {
      try {
        link = document.createElement("link");
        link.rel = "preload";
        link.as = "image";
        link.href = firstUrl;
        document.head.appendChild(link);

        // also create an Image to ensure load event fires and we can mark it loaded
        const img = new Image();
        img.src = firstUrl;
        img.onload = () => setLoadedImages((p) => ({ ...p, 0: true }));
      } catch (e) {
        // ignore
      }
    }

    // Prefetch next one or two images
    banners.slice(1, 3).forEach((b) => {
      if (b && b.imageUrl) {
        const pre = new Image();
        pre.src = b.imageUrl;
      }
    });

    return () => {
      if (link && link.parentNode) link.parentNode.removeChild(link);
    };
  }, [banners]);

  const loadBanners = async () => {
    try {
      const docSnap = await getDoc(doc(db, "settings", "mainBanner"));
      if (docSnap.exists() && docSnap.data().banners) {
        const remote = docSnap.data().banners;
        setBanners(remote);
        try {
          localStorage.setItem("mainBanner_banners", JSON.stringify(remote));
        } catch (e) {
          // ignore storage errors
        }
      }
    } catch (error) {
      console.error("Erro ao carregar banners:", error);
    } finally {
      setLoading(false);
    }
  };

  const settings = {
    dots: true,
    infinite: banners.length > 1,
    fade: true,
    speed: 1500,
    autoplay: banners.length > 1,
    autoplaySpeed: 7000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    pauseOnHover: false,
    cssEase: "cubic-bezier(0.4, 0, 0.2, 1)",
    afterChange: (current) => {
      // prefetch next image whenever slide changes
      if (!banners || banners.length === 0) return;
      const next = (current + 1) % banners.length;
      const url = banners[next]?.imageUrl;
      if (url) {
        const pre = new Image();
        pre.src = url;
      }
    },
  };

  const scrollToNextSection = () => {
    window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
  };

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
        <div className="text-white text-2xl font-semibold">Carregando...</div>
      </div>
    );
  }

  if (banners.length === 0) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
        <div className="text-white text-center p-8">
          <h2 className="text-3xl font-bold mb-4">Bem-vindo!</h2>
          <p className="text-lg">Nenhum banner disponível no momento.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-screen relative overflow-hidden">
      <Slider ref={sliderRef} {...settings} className="h-full">
        {banners.map((banner, index) => (
          <div key={index} className="relative w-full h-screen">
            <div className="w-full h-screen overflow-hidden">
              <img
                src={banner.imageUrl}
                alt={`Banner ${index + 1}`}
                loading={index === 0 ? "eager" : "lazy"}
                onLoad={() => setLoadedImages((p) => ({ ...p, [index]: true }))}
                className="w-full h-screen object-cover animate-ken-burns"
              />
            </div>

            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/40">
              <div className="flex justify-center items-center h-full relative">
                {/* Placeholder while image loads (black background, no text) */}
                {!loadedImages[index] && (
                  <div className="absolute inset-0 z-0 bg-black" />
                )}
                {/* Texto central */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white p-4 z-10 text-center drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)] max-w-4xl">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold">
                    {banner.text}
                  </h2>
                </div>

                {/* Card esquerdo - Visto de Turismo */}
                <div
                  className="absolute top-1/2 left-0 -translate-y-1/2 ml-8 w-[220px] h-[320px] bg-cover bg-center rounded-2xl shadow-xl overflow-hidden z-10 hidden lg:flex"
                  style={{
                    backgroundImage: `url(${passaporte})`,
                  }}
                >
                  <div className="w-full h-full flex flex-col justify-end items-center p-4 text-white text-center gap-2">
                    <h2 className="text-xl font-bold">Visto de Turismo</h2>
                    <p className="text-sm text-slate-50 leading-snug">
                      Rápido, simples e sem erros! <br />
                      Você viaja tranquilo <br />e a gente cuida de tudo!
                    </p>
                    <button
                      onClick={handleServicesClick}
                      className="bg-white text-blue-800 font-semibold text-sm px-4 py-1 rounded-full shadow-md hover:bg-gray-200 transition"
                    >
                      SAIBA MAIS
                    </button>
                  </div>
                </div>

                {/* Card direito - Todos os destinos */}
                <div
                  className="absolute top-1/2 right-0 -translate-y-1/2 mr-8 w-[220px] h-[320px] bg-cover bg-center rounded-2xl shadow-xl overflow-hidden z-10 hidden lg:flex"
                  style={{
                    backgroundImage: `url(${mapa})`,
                  }}
                >
                  <div className="w-full h-full bg-black bg-opacity-30 flex flex-col justify-end items-center p-4 text-white text-center gap-2">
                    <h2 className="text-xl font-extrabold drop-shadow-md">
                      Todos os destinos
                    </h2>
                    <p className="text-sm drop-shadow-md text-white leading-snug">
                      Conheça os cinco continentes <br />
                      em viagens inesquecíveis! <br />
                      Descubra o mundo conosco!
                    </p>
                    <button
                      onClick={handleDestinyClick}
                      className="bg-white text-blue-800 font-semibold text-sm px-4 py-1 rounded-full shadow-md hover:bg-gray-200 transition"
                    >
                      SAIBA MAIS
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>

      {/* Ícone de rolagem */}
      <div className="bg-black opacity-55 w-full h-20 absolute bottom-0">
        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white justify-center items-center flex font-poppins">
          Conheça nossos pacotes
        </p>
        <div
          className="absolute bottom-6 left-1/2 transform -translate-x-1/2 cursor-pointer animate-bounce"
          onMouseEnter={scrollToNextSection}
        >
          <ArrowDown className="text-white text-4xl" />
        </div>
      </div>
    </div>
  );
};

export default BannerCarousel;
