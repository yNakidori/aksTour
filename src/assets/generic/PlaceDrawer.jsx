import React from "react";
import { Drawer, Button, Typography, IconButton } from "@mui/material";

const PlaceDrawer = ({ place, open, onClose }) => {
  if (!place) return null;

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <div className="w-[300px] p-4">
        <div className="mb-4 flex items-center justify-between">
          <Typography variant="h5">{place.name}</Typography>
          <IconButton onClick={onClose}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </IconButton>
        </div>

        <Typography variant="body2" color="textSecondary" className="mb-4">
          {place.description}
        </Typography>

        <div className="grid grid-cols-2 gap-2">
          {place.images?.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`Foto de ${place.name}`}
              className="rounded object-cover w-full h-32"
            />
          ))}
        </div>
      </div>
    </Drawer>
  );
};

export default PlaceDrawer;
