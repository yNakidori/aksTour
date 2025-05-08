import React, { useEffect, useRef, useState } from "react";
import Globe from "react-globe.gl";

const ResponsiveGlobe = () => {
  const globeRef = useRef();
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
  const [points, setPoints] = useState([]);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight * 0.6); // ocupa 60% da altura da tela
    };

    handleResize(); // inicial
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    // Pontos de exemplo
    setPoints([
      { lat: 40.7128, lng: -74.006, size: 0.5, label: "Nova York" },
      { lat: -23.5505, lng: -46.6333, size: 0.5, label: "São Paulo" },
      { lat: 35.6895, lng: 139.6917, size: 0.5, label: "Tóquio" },
    ]);
  }, []);

  return (
    <div style={{ width: "100%", height: "100%", overflow: "hidden" }}>
      <Globe
        ref={globeRef}
        width={width}
        height={height}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
        backgroundColor="rgba(0,0,0,0)"
        pointsData={points}
        pointLat={(d) => d.lat}
        pointLng={(d) => d.lng}
        pointAltitude={() => 0.01}
        pointColor={() => "#ffcc00"}
        pointRadius={(d) => d.size}
        onPointClick={(point) => alert(`Você clicou em: ${point.label}`)}
      />
    </div>
  );
};

export default ResponsiveGlobe;
