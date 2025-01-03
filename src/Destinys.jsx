import React from "react";
import Navbar from "./assets/navbar";
import Footer from "./assets/footer";
import PlacesCard from "./assets/destinys/placesCard";
import destiny from "./assets/images/destiny.png";
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
      imageUrl:
        "https://images.unsplash.com/photo-1532614338840-ab30cf10ed36?auto=format&fit=crop&w=318",
      imageAlt: "Beautiful landscape of Yosemite",
      title: "Yosemite National Park",
      subtitle: "California",
      views: "6.3k",
      timeAgo: "1 hour ago",
    },
    {
      imageUrl:
        "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?auto=format&fit=crop&w=318",
      imageAlt: "Stunning view of Grand Canyon",
      title: "Grand Canyon",
      subtitle: "Arizona",
      views: "12k",
      timeAgo: "2 hours ago",
    },
    {
      imageUrl:
        "https://images.unsplash.com/photo-1547592180-0b6652b3ebc6?auto=format&fit=crop&w=318",
      imageAlt: "Breathtaking view of Lake Tahoe",
      title: "Lake Tahoe",
      subtitle: "Nevada",
      views: "8.5k",
      timeAgo: "3 hours ago",
    },
    {
      imageUrl:
        "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=318",
      imageAlt: "Beautiful view of Zion National Park",
      title: "Zion National Park",
      subtitle: "Utah",
      views: "9k",
      timeAgo: "5 hours ago",
    },
    {
      imageUrl:
        "https://images.unsplash.com/photo-1505761671935-60b3a7427bad?auto=format&fit=crop&w=318",
      imageAlt: "Glacier National Park scenery",
      title: "Glacier National Park",
      subtitle: "Montana",
      views: "7k",
      timeAgo: "6 hours ago",
    },
    {
      imageUrl:
        "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=318",
      imageAlt: "Rocky Mountain National Park landscape",
      title: "Rocky Mountain",
      subtitle: "Colorado",
      views: "10k",
      timeAgo: "7 hours ago",
    },
    {
      imageUrl:
        "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=318",
      imageAlt: "Banff National Park",
      title: "Banff National Park",
      subtitle: "Canada",
      views: "15k",
      timeAgo: "8 hours ago",
    },
  ];

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
          position: "relative",
        }}
      >
        <div>
          <div className="text-center mt-10 mb-6">
            <h1 className="text-3xl font-bold text-gray-800">
              Conheças os destinos mais procurados do momento!
            </h1>
            <div className="h-1 w-16 bg-cyan-500 mx-auto mt-2 mb-6"></div>
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "90%",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "1rem",
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
        <div style={{ flex: 1 }} />
      </div>
      <div className="fixed bottom-5 right-5 z-50">
        <Lottie options={defaultOptions} height={100} width={100} />
      </div>
      <Footer />
    </div>
  );
};

export default Destinys;
