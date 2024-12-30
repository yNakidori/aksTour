import React from "react";
import { Card, CardCover, CardContent, Typography } from "@mui/joy";

const DestinyCard = ({ image, title, location, imageAlt }) => {
  return (
    <div className="transform hover:scale-105 transition duration-300 ease-in-out">
      <Card sx={{ minHeight: "280px", width: 320 }}>
        <CardCover>
          <img
            src={image}
            srcSet={`${image}?auto=format&fit=crop&w=320&dpr=2 2x`}
            loading="lazy"
            alt={imageAlt}
          />
        </CardCover>
        <CardCover
          sx={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.2), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 300px)",
          }}
        />
        <CardContent sx={{ justifyContent: "flex-end" }}>
          <Typography level="title-lg" textColor="#fff">
            {title}
          </Typography>
          <Typography textColor="neutral.300">{location}</Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default DestinyCard;
