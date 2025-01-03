import React from "react";
import {
  AspectRatio,
  Card,
  CardContent,
  CardOverflow,
  Typography,
} from "@mui/joy";

const ClientsCard = ({ name, destination, location, image, review }) => {
  return (
    <Card
      variant="outlined"
      sx={{ width: 360, display: "flex", flexDirection: "column", gap: 2 }}
    >
      {/* Imagem principal */}
      <CardOverflow>
        <AspectRatio ratio="16/9" sx={{ width: "100%" }}>
          <img src={image} alt={`Imagem de ${name}`} loading="lazy" />
        </AspectRatio>
      </CardOverflow>

      {/* Informações do cliente e destino */}
      <CardContent sx={{ textAlign: "left", gap: 1 }}>
        <Typography level="h6" fontWeight="bold" textColor="primary.plainColor">
          {name}
        </Typography>
        <Typography level="body2" textColor="neutral.700">
          Visitou: {destination}, {location}
        </Typography>
      </CardContent>

      {/* Relato sobre a viagem */}
      <CardContent>
        <Typography level="body2" textColor="neutral.900">
          "{review}"
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ClientsCard;
