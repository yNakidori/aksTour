import PropTypes from "prop-types";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import LocationOnIcon from "@mui/icons-material/LocationOn";

export default function AccommodationCard({
  mainImage,
  name,
  rating,
  location,
  price,
  onReserve,
}) {
  return (
    <Card sx={{ width: 350, borderRadius: 2, boxShadow: 4 }}>
      <CardMedia
        component="img"
        height="200"
        image={mainImage}
        alt={`Imagem de ${name}`}
      />

      <CardContent>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          {name}
        </Typography>

        <Box display="flex" alignItems="center" mb={1}>
          <StarIcon sx={{ color: "#fbc02d", fontSize: 20, mr: 0.5 }} />
          <Typography variant="body2" fontWeight="medium">
            {rating} •
          </Typography>
          <LocationOnIcon
            sx={{ fontSize: 18, ml: 1, mr: 0.5, color: "#757575" }}
          />
          <Typography variant="body2">{location}</Typography>
        </Box>

        <Typography variant="body1" fontWeight="bold" color="primary">
          {price} / noite
        </Typography>
      </CardContent>

      <CardActions sx={{ px: 2, pb: 2 }}>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          size="medium"
          onClick={onReserve}
        >
          Reservar
        </Button>
      </CardActions>
    </Card>
  );
}

AccommodationCard.propTypes = {
  mainImage: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  location: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  onReserve: PropTypes.func.isRequired,
};
