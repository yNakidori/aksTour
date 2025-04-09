import PropTypes from "prop-types";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Tooltip,
  Button,
  Box,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import StarIcon from "@mui/icons-material/Star";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import HotelIcon from "@mui/icons-material/Hotel";
import HomeIcon from "@mui/icons-material/Home";

export default function BookingCard({
  mainImage,
  cardName,
  rating,
  description,
  price,
  amenities,
  dorms,
  onReserve,
}) {
  return (
    <Card sx={{ maxWidth: 416, position: "relative" }}>
      <Box sx={{ position: "relative" }}>
        <CardMedia
          component="img"
          height="200"
          image={mainImage}
          alt="Imagem Principal"
        />
        <IconButton
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            backgroundColor: "rgba(255,255,255,0.8)",
            "&:hover": { backgroundColor: "rgba(255,255,255,1)" },
          }}
        >
          <FavoriteIcon color="error" />
        </IconButton>
      </Box>

      <CardContent>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={1}
        >
          <Typography variant="h6">{cardName}</Typography>
          <Box display="flex" alignItems="center">
            <StarIcon sx={{ color: "#fbc02d", fontSize: 20, mr: 0.5 }} />
            <Typography variant="body2">{rating}</Typography>
          </Box>
        </Box>

        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>

        <Typography
          sx={{ fontSize: 18, fontWeight: "bold", mt: 2, color: "#1976d2" }}
          variant="body2"
          color="text.secondary"
          mt={1}
        >
          {price}
        </Typography>

        <Box display="flex" flexWrap="wrap" gap={1.5} mt={2}>
          <Tooltip title={price}>
            <IconButton size="small" sx={{ backgroundColor: "#f5f5f5" }}>
              <LocalOfferIcon fontSize="small" />
            </IconButton>
          </Tooltip>

          <Tooltip title={amenities}>
            <IconButton size="small" sx={{ backgroundColor: "#f5f5f5" }}>
              <HotelIcon fontSize="small" />
            </IconButton>
          </Tooltip>

          <Tooltip title={dorms}>
            <IconButton size="small" sx={{ backgroundColor: "#f5f5f5" }}>
              <HomeIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      </CardContent>

      <CardActions sx={{ px: 2, pb: 2 }}>
        <Button variant="contained" fullWidth size="large" onClick={onReserve}>
          Reserve
        </Button>
      </CardActions>
    </Card>
  );
}

BookingCard.propTypes = {
  mainImage: PropTypes.string.isRequired,
  cardName: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  amenities: PropTypes.string.isRequired,
  dorms: PropTypes.string.isRequired,
  onReserve: PropTypes.func.isRequired,
};
