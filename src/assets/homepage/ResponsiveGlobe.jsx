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
      <Globe
        ref={globeRef}
        width={width}
        height={height}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
        backgroundColor="rgba(0,0,0,0)"
        pointsData={destinos}
        pointLat={(d) => d.lat}
        pointLng={(d) => d.lng}
        pointAltitude={() => 0.01}
        pointColor={() => "#ffcc00"}
        pointRadius={(d) => d.size}
        onPointClick={handlePointClick}
      />

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        sx={{ zIndex: 2000 }}
      >
        <div className="w-[300px] md:w-[400px] p-4 bg-zinc-900 text-white h-full">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">{selectedPoint?.label}</h2>
            <IconButton onClick={() => setDrawerOpen(false)}>
              <CloseIcon className="text-white" />
            </IconButton>
          </div>
          <p className="text-sm mb-4">
            Aqui vai uma descrição de {selectedPoint?.label}.
          </p>
          <div className="space-y-2">
            <img
              src={`/images/${selectedPoint?.label
                .toLowerCase()
                .replace(/\s+/g, "-")}-1.jpg`}
              alt={`${selectedPoint?.label} 1`}
              className="w-full rounded"
            />
            <img
              src={`/images/${selectedPoint?.label
                .toLowerCase()
                .replace(/\s+/g, "-")}-2.jpg`}
              alt={`${selectedPoint?.label} 2`}
              className="w-full rounded"
            />
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default ResponsiveGlobe;
