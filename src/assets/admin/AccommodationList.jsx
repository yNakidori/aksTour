import { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/firbase";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Grid,
  Rating,
  Box,
  Tooltip,
  IconButton,
  CircularProgress,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";

// Importar os ícones usados nas amenidades
import WifiIcon from "@mui/icons-material/Wifi";
import CoffeeIcon from "@mui/icons-material/Coffee";
import Flatware from "@mui/icons-material/Flatware";
import ChargingStation from "@mui/icons-material/ChargingStation";
import PoolIcon from "@mui/icons-material/Pool";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import KitchenIcon from "@mui/icons-material/Kitchen";

// Mapa de nome para ícone
const amenitiesIcons = {
  "Wi-Fi gratuito": <WifiIcon />,
  "Café da manhã": <CoffeeIcon />,
  Restaurante: <Flatware />,
  Piscina: <PoolIcon />,
  "Carregador de celular e veículos elétricos": <ChargingStation />,
  Estacionamento: <LocalParkingIcon />,
  "Cozinha equipada": <KitchenIcon />,
};

export default function AccommodationList({ isAdmin = false }) {
  const [accommodations, setAccommodations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "accommodations"));
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAccommodations(data);
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "accommodations", id));
      setAccommodations((prev) => prev.filter((acc) => acc.id !== id));
      Swal.fire({
        icon: "success",
        title: "Sucesso!",
        text: "Acomodações excluída com sucesso.",
      });
    } catch (error) {
      console.error("Erro ao excluir a acomodação: ", error);
      Swal.fire({
        icon: "error",
        title: "Erro!",
        text: "Não foi possível excluir a acomodação.",
      });
    }
  };

  return (
    <Grid container spacing={2}>
      {loading ? (
        <Grid item xs={12} textAlign="center">
          <CircularProgress />
        </Grid>
      ) : accommodations.length === 0 ? (
        <Grid item xs={12} textAlign="center">
          <Typography variant="h6" color="text.secondary">
            Sem ofertas disponíveis no momento.
          </Typography>
        </Grid>
      ) : (
        accommodations.map((acc) => (
          <Grid item xs={12} sm={6} md={4} key={acc.id}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={acc.mainImageUrl}
                alt={acc.name}
              />
              <CardContent>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography variant="h6">{acc.name}</Typography>
                  {isAdmin && (
                    <IconButton
                      onClick={() => handleDelete(acc.id)}
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  )}
                </Box>
                <Rating value={acc.rating} precision={0.5} readOnly />
                <Typography color="text.secondary">{acc.location}</Typography>
                <Typography variant="body2">Preço: R$ {acc.price}</Typography>
                {acc.amenities && acc.amenities.length > 0 && (
                  <Box
                    mt={1}
                    sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}
                  >
                    {acc.amenities.map((amenity) =>
                      amenitiesIcons[amenity] ? (
                        <Tooltip key={amenity} title={amenity}>
                          <span>{amenitiesIcons[amenity]}</span>
                        </Tooltip>
                      ) : null
                    )}
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))
      )}
    </Grid>
  );
}
