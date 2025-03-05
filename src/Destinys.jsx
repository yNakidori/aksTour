import React from "react";
import Navbar from "./assets/navbar";
import Footer from "./assets/footer";
import PlacesCard from "./assets/destinys/placesCard";
import AiCard from "./assets/destinys/iaCard";
import destiny from "./assets/images/destiny.png";
import FaqCard from "./assets/destinys/faqCard";
import orlando from "./assets/images/orlando.png";
import buenosaires from "./assets/images/buenosaires.png";
import lisboa from "./assets/images/lisboa.png";
import cancun from "./assets/images/cancun.png";
import paris from "./assets/images/paris.png";
import Whats from "./assets/whats";
import Lottie from "react-lottie";

const Destinys = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: Whats,
    rendererSettings: {
      preservAspectRatio: "xMidYMid slice",
    },
  };

  const places = [
    {
      imageUrl: orlando,
      imageAlt: "Orlando, Estados Unidos",
      title: "Orlando",
      subtitle: "EUA",
      views: "15k",
      timeAgo: "1 hora atrás",
    },
    {
      imageUrl: buenosaires,
      imageAlt: "Buenos Aires, Argentina",
      title: "Buenos Aires",
      subtitle: "Argentina",
      views: "10k",
      timeAgo: "2 horas atrás",
    },
    {
      imageUrl: lisboa,
      imageAlt: "Lisboa, Portugal",
      title: "Lisboa",
      subtitle: "Portugal",
      views: "12k",
      timeAgo: "3 horas atrás",
    },
    {
      imageUrl: cancun,
      imageAlt: "Cancún, México",
      title: "Cancún",
      subtitle: "México",
      views: "8k",
      timeAgo: "4 horas atrás",
    },
    {
      imageUrl: paris,
      imageAlt: "Paris, França",
      title: "Paris",
      subtitle: "França",
      views: "18k",
      timeAgo: "5 horas atrás",
    },
  ];

  const visaInfo = {
    title: "Informações sobre Vistos",
    description:
      "Confira os requisitos de visto para os destinos mais procurados:\n\n- **EUA (Orlando):** Necessário visto de turismo B2.\n- **Argentina (Buenos Aires):** Brasileiros não precisam de visto para estadias de até 90 dias.\n- **Portugal (Lisboa):** Brasileiros não precisam de visto para estadias de até 90 dias.\n- **México (Cancún):** Brasileiros não precisam de visto, mas precisam de autorização eletrônica (SAE).\n- **França (Paris):** Brasileiros não precisam de visto para estadias de até 90 dias no Espaço Schengen.",
  };

  return (
    <div>
      <Navbar />

      {/* Background Section */}
      <div
        style={{
          backgroundImage: `
      linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), 
      url(${destiny})
    `,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          color: "#fff",
          padding: "2rem 0",
        }}
      >
        <div>
          <div className="text-center mt-10 mb-6">
            <h1 className="text-3xl font-bold text-zinc-50">
              Conheça os destinos mais procurados do momento!
            </h1>
            <div className="h-1 w-16 bg-cyan-500 mx-auto mt-2 mb-6"></div>
          </div>
        </div>

        <div
          style={{
            width: "90%",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "1rem",
            paddingTop: "2rem",
            zIndex: 1,
          }}
        >
          {places.map((place, index) => (
            <PlacesCard
              key={index}
              imageUrl={place.imageUrl}
              imageAlt={place.imageAlt}
              title={place.title}
              subtitle={place.subtitle}
              views={place.views}
              timeAgo={place.timeAgo}
            />
          ))}
        </div>

        {/* Visa Information Card */}
        <div
          style={{
            backgroundColor: "#1e293b",
            color: "#fff",
            padding: "2rem",
            margin: "2rem auto",
            borderRadius: "8px",
            width: "90%",
          }}
        >
          <h2 className="text-2xl font-bold mb-4 text-cyan-400">
            {visaInfo.title}
          </h2>
          <p className="text-sm text-zinc-300 whitespace-pre-wrap">
            {visaInfo.description}
          </p>
        </div>

        <AiCard />

        <div style={{ flex: 1 }} />
        <div className="mt-8 mb-4 items-center justify-center flex">
          <FaqCard />
        </div>
      </div>

      <div className="fixed bottom-5 right-5 z-50">
        <Lottie options={defaultOptions} height={100} width={100} />
      </div>
      <Footer />
    </div>
  );
};

export default Destinys;
