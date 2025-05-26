import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase/firbase";
import { getStorage, ref, deleteObject } from "firebase/storage";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Rating,
  Box,
  Tooltip,
  IconButton,
  CircularProgress,
  Modal,
  TextField,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
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
  const [editingCard, setEditingCard] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [editForm, setEditForm] = useState({
    name: "",
    price: "",
    days: "",
    description: "",
    location: "",
    rating: 0,
  });

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
      // Busca a acomodação para pegar a URL da imagem
      const accToDelete = accommodations.find((acc) => acc.id === id);
      if (accToDelete?.mainImageUrl) {
        await deleteImageFromStorage(accToDelete.mainImageUrl);
      }

      await deleteDoc(doc(db, "accommodations", id));
      setAccommodations((prev) => prev.filter((acc) => acc.id !== id));
      Swal.fire({
        icon: "success",
        title: "Sucesso!",
        text: "Acomodação excluída com sucesso.",
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

  const deleteImageFromStorage = async (imageUrl) => {
    try {
      const storage = getStorage();
      // Exemplo de URL: https://firebasestorage.googleapis.com/v0/b/SEU-PROJETO.appspot.com/o/pasta%2Farquivo.jpg?alt=media&token=...
      const url = new URL(imageUrl);
      const decodedPath = decodeURIComponent(url.pathname);
      const pathStart = decodedPath.indexOf("/o/") + 3;
      const pathEnd =
        decodedPath.indexOf("?alt=") !== -1
          ? decodedPath.indexOf("?alt=")
          : decodedPath.length;
      if (pathStart < 3 || pathEnd <= pathStart) {
        console.error("Caminho da imagem inválido:", imageUrl);
        return;
      }
      const fullPath = decodedPath.substring(pathStart, pathEnd);
      console.log("Removendo imagem do Storage:", fullPath);

      const imageRef = ref(storage, fullPath);
      await deleteObject(imageRef);
      console.log("Imagem excluída com sucesso do Storage");
    } catch (error) {
      console.error("Erro ao excluir imagem do Firebase Storage:", error);
    }
  };

  // Função para abrir o modal de edição
  const handleEdit = (acc) => {
    setEditingCard(acc);
    setEditForm({
      name: acc.name || "",
      price: acc.price || "",
      days: acc.days || "",
      description: acc.description || "",
      location: acc.location || "",
      rating: acc.rating || 0,
    });
    setOpenModal(true);
  };

  // Função para atualizar o formulário de edição
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  // Função para salvar a edição
  const handleEditSave = async () => {
    try {
      await updateDoc(doc(db, "accommodations", editingCard.id), {
        ...editForm,
        rating: parseFloat(editForm.rating),
      });
      setAccommodations((prev) =>
        prev.map((acc) =>
          acc.id === editingCard.id
            ? { ...acc, ...editForm, rating: parseFloat(editForm.rating) }
            : acc
        )
      );
      setOpenModal(false);
      setEditingCard(null);
      Swal.fire({
        icon: "success",
        title: "Editado!",
        text: "Acomodação editada com sucesso.",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Erro!",
        text: "Não foi possível editar a acomodação.",
      });
    }
  };

  return loading ? (
    <Box sx={{ textAlign: "center", py: 4 }}>
      <CircularProgress />
    </Box>
  ) : accommodations.length === 0 ? (
    <Box sx={{ textAlign: "center", py: 4 }}>
      <Typography variant="h6" color="text.secondary">
        Sem ofertas disponíveis no momento.
      </Typography>
    </Box>
  ) : (
    <Box
      sx={{
        display: "flex",
        overflowX: "auto",
        gap: 2,
        px: { xs: 2, sm: 4, md: 8 },
        py: 2,
      }}
    >
      {accommodations.map((acc) => (
        <Card
          key={acc.id}
          sx={{
            minWidth: 280,
            maxWidth: 300,
            flex: "0 0 auto",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <CardMedia
            component="img"
            image={acc.mainImageUrl}
            alt={acc.name}
            sx={{
              height: 180,
              objectFit: "cover",
            }}
          />
          <CardContent sx={{ flexGrow: 1 }}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={1}
            >
              <Typography variant="h6" noWrap>
                {acc.name}
              </Typography>
              {isAdmin && (
                <Box>
                  <IconButton
                    onClick={() => handleEdit(acc)}
                    color="primary"
                    size="small"
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDelete(acc.id)}
                    color="error"
                    size="small"
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
              )}
            </Box>
            <Rating value={acc.rating} precision={0.5} readOnly size="small" />
            <Typography color="text.secondary" variant="body2">
              {acc.location}
            </Typography>
            <Typography variant="body2">Opções: {acc.price}</Typography>
            {acc.days && (
              <Typography variant="body2" color="text.secondary">
                Dias: {acc.days}
              </Typography>
            )}
            {acc.description && (
              <Typography variant="body2" sx={{ mt: 1 }}>
                {acc.description}
              </Typography>
            )}
            {acc.amenities?.length > 0 && (
              <Box mt={1} sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                {acc.amenities.map(
                  (amenity) =>
                    amenitiesIcons[amenity] && (
                      <Tooltip key={amenity} title={amenity}>
                        <span>{amenitiesIcons[amenity]}</span>
                      </Tooltip>
                    )
                )}
              </Box>
            )}
          </CardContent>
        </Card>
      ))}

      {/* Modal de edição */}
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            minWidth: 320,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Typography variant="h6" mb={2}>
            Editar Acomodação
          </Typography>
          <TextField
            label="Nome"
            name="name"
            value={editForm.name}
            onChange={handleEditChange}
            fullWidth
          />
          <TextField
            label="Preço"
            name="price"
            value={editForm.price}
            onChange={handleEditChange}
            fullWidth
          />
          <TextField
            label="Dias"
            name="days"
            type="number"
            value={editForm.days}
            onChange={handleEditChange}
            fullWidth
          />
          <TextField
            label="Descrição"
            name="description"
            value={editForm.description}
            onChange={handleEditChange}
            fullWidth
            multiline
            minRows={2}
          />
          <TextField
            label="Localização"
            name="location"
            value={editForm.location}
            onChange={handleEditChange}
            fullWidth
          />
          <TextField
            label="Nota"
            name="rating"
            type="number"
            value={editForm.rating}
            onChange={handleEditChange}
            inputProps={{ step: 0.5, min: 0, max: 5 }}
            fullWidth
          />
          <Box display="flex" justifyContent="flex-end" gap={1}>
            <Button onClick={() => setOpenModal(false)}>Cancelar</Button>
            <Button variant="contained" onClick={handleEditSave}>
              Salvar
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}
