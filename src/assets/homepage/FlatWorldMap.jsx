import React, { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import { Drawer, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import destinos from "../generic/GlobeDestinys"; // Pode manter os dados existentes

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const FlatWorldMap = () => {
  const [selectedPoint, setSelectedPoint] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleMarkerClick = (point) => {
    setSelectedPoint(point);
    setDrawerOpen(true);
  };

  return (
    <div className="w-full h-screen bg-gray-600">
      <ComposableMap projectionConfig={{ scale: 160 }}>
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                style={{
                  default: {
                    fill: "#DDD",
                    outline: "none",
                  },
                  hover: {
                    fill: "#AAA",
                    outline: "none",
                  },
                  pressed: {
                    fill: "#999",
                    outline: "none",
                  },
                }}
              />
            ))
          }
        </Geographies>
        {destinos.map((point, idx) => (
          <Marker
            key={idx}
            coordinates={[point.lng, point.lat]}
            onClick={() => handleMarkerClick(point)}
          >
            <circle r={4} fill="#F00" stroke="#fff" strokeWidth={1.5} />
          </Marker>
        ))}
      </ComposableMap>

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

export default FlatWorldMap;
