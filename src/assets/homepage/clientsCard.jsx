import React from "react";
import {
  AspectRatio,
  Card,
  CardContent,
  CardOverflow,
  Divider,
  Typography,
  IconButton,
} from "@mui/joy";
import Favorite from "@mui/icons-material/Favorite";

const ClientsCard = ({ name, destination, location, image, review }) => {
  return (
    <Card variant="outlined" sx={{ width: 320 }}>
      {/* Imagem principal com botão de interação */}
      <CardOverflow>
        <AspectRatio ratio="16/9">
          <img
            src={image}
            alt={`Imagem de ${name}`}
            loading="lazy"
            style={{ objectFit: "cover" }}
          />
        </AspectRatio>
        <IconButton
          aria-label={`Curtir avaliação de ${name}`}
          size="md"
          variant="solid"
          color="danger"
          sx={{
            position: "absolute",
            zIndex: 2,
            borderRadius: "50%",
            right: "1rem",
            bottom: 0,
            transform: "translateY(50%)",
          }}
        >
          <Favorite />
        </IconButton>
      </CardOverflow>

      {/* Informações do cliente e destino */}
      <CardContent>
        <Typography level="title-md" fontWeight="bold">
          {name}
        </Typography>
        <Typography level="body-sm" textColor="neutral.700">
          Visitou: {destination}, {location}
        </Typography>
      </CardContent>

      {/* Relato sobre a viagem */}
      <CardOverflow variant="soft">
        <Divider inset="context" />
        <CardContent orientation="horizontal">
          <Typography level="body-sm" sx={{ flex: 1 }}>
            "{review}"
          </Typography>
        </CardContent>
      </CardOverflow>
    </Card>
  );
};

export default ClientsCard;
