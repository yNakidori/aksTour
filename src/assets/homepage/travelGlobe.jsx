import Globe from "react-globe.gl";
import { useEffect, useState } from "react";
import * as THREE from "three";
import { Tween, Easing } from "es6-tween";
import PlaceDrawer from "../generic/PlaceDrawer";

const TravelGlobe = () => {
  const [points, setPoints] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    setPoints([
      {
        lat: 48.8584,
        lng: 2.2945,
        name: "Torre Eiffel",
        description: "Símbolo icônico de Paris com vista panorâmica da cidade.",
        value: 40,
        images: ["/images/caribe1.jpg", "/images/caribe2.jpg"],
      },
      {
        lat: 27.1751,
        lng: 78.0421,
        name: "Taj Mahal",
        description: "Monumento de mármore construído em homenagem ao amor.",
        value: 60,
        images: ["/images/caribe1.jpg", "/images/caribe2.jpg"],
      },
      {
        lat: 35.6586,
        lng: 139.7454,
        name: "Torre de Tóquio",
        description:
          "Estrutura de comunicação com observatórios e vistas deslumbrantes.",
        value: 35,
        images: ["/images/caribe1.jpg", "/images/caribe2.jpg"],
      },
      {
        lat: -13.1631,
        lng: -72.545,
        name: "Machu Picchu",
        description: "Antiga cidade inca nas montanhas do Peru.",
        value: 50,
        images: ["/images/caribe1.jpg", "/images/caribe2.jpg"],
      },
      {
        lat: 40.6892,
        lng: -74.0445,
        name: "Estátua da Liberdade",
        description: "Ícone da liberdade e dos EUA em Nova York.",
        value: 45,
        images: ["/images/caribe1.jpg", "/images/caribe2.jpg"],
      },
      {
        lat: 41.8902,
        lng: 12.4922,
        name: "Coliseu de Roma",
        description:
          "Anfiteatro romano que foi palco de batalhas e espetáculos.",
        value: 40,
        images: ["/images/caribe1.jpg", "/images/caribe2.jpg"],
      },
    ]);
  }, []);

  // Função que cria cada ponto customizado
  const createMarker = (point) => {
    const group = new THREE.Group();

    // Bola principal
    const size = Math.max(point.value / 100, 0.5);
    const geometry = new THREE.SphereGeometry(size, 16, 16);
    const material = new THREE.MeshBasicMaterial({ color: "#fcffbe" });
    const sphere = new THREE.Mesh(geometry, material);
    group.add(sphere);

    // Luz
    const light = new THREE.PointLight("#fcffbe", 1, 3);
    group.add(light);

    // Companions
    for (let i = 0; i < 6; i++) {
      const companionGeometry = new THREE.SphereGeometry(0.05, 10, 10);
      const companionMaterial = new THREE.MeshBasicMaterial({
        color: "#fff9e6",
        transparent: true,
        opacity: 0.6,
      });

      const companion = new THREE.Mesh(companionGeometry, companionMaterial);
      companion.position.set(
        Math.random() * 0.5,
        Math.random() * 0.5,
        Math.random() * 0.5
      );
      group.add(companion);

      animateCompanion(companion, i * 100);
    }

    return group;
  };

  const animateCompanion = (mesh, delay) => {
    function animate() {
      const to = {
        x: (Math.random() - 0.5) * 1.5,
        y: (Math.random() - 0.5) * 1.5,
        z: (Math.random() - 0.5) * 1.5,
        scale: Math.random() * 1.5,
        opacity: Math.random() * 0.5 + 0.3,
      };

      new Tween(mesh.position)
        .to({ x: to.x, y: to.y, z: to.z }, 4000)
        .easing(Easing.Quadratic.InOut)
        .delay(delay)
        .on("complete", animate)
        .start();

      new Tween(mesh.scale)
        .to({ x: to.scale, y: to.scale, z: to.scale }, 4000)
        .easing(Easing.Quadratic.InOut)
        .delay(delay)
        .start();

      new Tween({ opacity: mesh.material.opacity })
        .to({ opacity: to.opacity }, 4000)
        .on("update", ({ opacity }) => {
          mesh.material.opacity = opacity;
        })
        .delay(delay)
        .start();
    }

    animate();
  };

  return (
    <div className="w-full h-screen relative bg-black">
      <Globe
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-water.png"
        pointsData={points}
        pointLat={(d) => d.lat}
        pointLng={(d) => d.lng}
        pointRadius={() => 1}
        pointAltitude={() => 0.03}
        pointColor={() => "rgba(240, 36, 36, 0.8)"}
        customThreeObject={createMarker}
        onPointClick={(point) => {
          setSelectedPlace(point);
          setDrawerOpen(true);
        }}
      />

      {selectedPlace && (
        <PlaceDrawer
          place={selectedPlace}
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
        />
      )}
    </div>
  );
};

export default TravelGlobe;
