import React, { useEffect, useRef, useState } from "react";
import Globe from "react-globe.gl";
import { Drawer, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import "../css/GlobeOverlay.css";
import destinos from "../generic/GlobeDestinys";

const ResponsiveGlobe = () => {
  const globeRef = useRef();
  const [isVisible, setIsVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
  const [points, setPoints] = useState([]);
  const [selectedPoint, setSelectedPoint] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [hoveredPoint, setHoveredPoint] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleClose = () => {
    setFadeOut(true);
    setTimeout(() => {
      setIsVisible(false);
    }, 500);
  };

  const handlePointClick = (point) => {
    setSelectedPoint(point);
    setDrawerOpen(true);
  };

  if (!isVisible) return null;

  return (
    <div className={`globe-overlay ${fadeOut ? "fade-out" : ""}`}>
      <button className="close-button" onClick={handleClose}>
        Fechar
      </button>

      {/* Card no canto direito */}
      <div className="absolute bottom-10 right-4 left-4 md:left-auto md:right-6 md:bottom-20 z-50 bg-white/90 p-5 rounded-2xl shadow-xl w-full max-w-[260px] mx-auto md:mx-0 text-zinc-900">
        <h3 className="text-lg md:text-xl font-bold uppercase tracking-wide mb-2">
          Todos os destinos
        </h3>
        <p className="text-sm leading-relaxed mb-4">
          Conheça os <span className="font-semibold">cinco continentes</span> em
          <br />
          viagens inesquecíveis!
          <br />
          Descubra o mundo conosco!
        </p>
        <a
          href="https://wa.me/5511957700305"
          target="_blank"
          rel="noopener noreferrer"
          className="block bg-blue-600 text-white text-sm px-4 py-2 rounded hover:bg-blue-700 transition w-full text-center"
        >
          SAIBA MAIS
        </a>
      </div>

      <Globe
        ref={globeRef}
        width={width}
        height={height}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
        backgroundColor="rgba(0,0,0,0)"
        pointsData={destinos}
        pointLat={(d) => d.lat}
        pointLng={(d) => d.lng}
        pointAltitude={(d) =>
          hoveredPoint && hoveredPoint === d ? 0.05 : 0.02
        }
        pointColor={(d) =>
          hoveredPoint && hoveredPoint === d ? "#f54e42" : "#ffcc00"
        }
        pointRadius={(d) => d.size}
        onPointClick={handlePointClick}
        onPointHover={setHoveredPoint}
      />

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        sx={{ zIndex: 2000 }}
      >
        <div className="w-[300px] md:w-[400px] p-4 bg-zinc-900 text-white overflow-scroll h-full">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">{selectedPoint?.label}</h2>
            <IconButton onClick={() => setDrawerOpen(false)}>
              <CloseIcon className="text-white" />
            </IconButton>
          </div>
          <p className="text-sm mb-4">
            {selectedPoint?.description || "Descrição não disponível."}
          </p>
          <div className="space-y-2">
            {selectedPoint?.images?.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${selectedPoint?.label} ${index + 1}`}
                className="w-full rounded"
              />
            ))}
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default ResponsiveGlobe;
