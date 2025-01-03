import React from "react";
import {
  AspectRatio,
  Card,
  CardContent,
  CardOverflow,
  Divider,
  Typography,
} from "@mui/joy";

const PlacesCard = ({
  imageUrl,
  imageAlt,
  title,
  subtitle,
  views,
  timeAgo,
  cardWidth = 320,
}) => {
  return (
    <Card variant="outlined" sx={{ width: cardWidth }}>
      {/* Imagem */}
      <CardOverflow>
        <AspectRatio ratio="2">
          <img src={imageUrl} alt={imageAlt} loading="lazy" />
        </AspectRatio>
      </CardOverflow>

      {/* Título e Subtítulo */}
      <CardContent>
        <Typography level="title-md">{title}</Typography>
        <Typography level="body-sm">{subtitle}</Typography>
      </CardContent>

      {/* Informações adicionais */}
      <CardOverflow variant="soft" sx={{ bgcolor: "background.level1" }}>
        <Divider inset="context" />
        <CardContent orientation="horizontal">
          <Typography
            level="body-xs"
            textColor="text.secondary"
            sx={{ fontWeight: "md" }}
          >
            {views} views
          </Typography>
          <Divider orientation="vertical" />
          <Typography
            level="body-xs"
            textColor="text.secondary"
            sx={{ fontWeight: "md" }}
          >
            {timeAgo}
          </Typography>
        </CardContent>
      </CardOverflow>
    </Card>
  );
};

export default PlacesCard;
