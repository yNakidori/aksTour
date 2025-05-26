import { useState } from "react";
import { TextField, Button, Box, Rating, Typography } from "@mui/material";
import { addDoc, collection } from "firebase/firestore";
import { db, storage } from "../../firebase/firbase";
import { PhotoIcon } from "@heroicons/react/20/solid";
import Swal from "sweetalert2";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import AmenitiesSelector from "../generic/AmenitiesList";

export default function CreateAccommodationForm() {
  const [form, setForm] = useState({
    name: "",
    mainImage: "",
    rating: 0,
    location: "",
    price: "",
    amenities: [],
  });

  const handleAmenitiesChange = (selectedAmenities) => {
    setForm((prev) => ({
      ...prev,
      amenities: selectedAmenities,
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const storageRef = ref(storage, `accommodations/${file.name}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      setForm((prev) => ({
        ...prev,
        mainImage: file,
        mainImageUrl: url,
      }));
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRatingChange = (event, newValue) => {
    setForm({ ...form, rating: newValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "accommodations"), {
        name: form.name,
        mainImageUrl: form.mainImageUrl || "",
        days: form.days || 0,
        description: form.description || "",
        rating: parseFloat(form.rating),
        location: form.location,
        price: form.price,
        amenities: form.amenities,
      });
      Swal.fire({
        icon: "success",
        title: "Hospedagem cadastrada com sucesso!",
        showConfirmButton: false,
        timer: 1500,
      });
      setForm({ name: "", mainImage: "", rating: 0, location: "", price: "" });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Erro ao cadastrar hospedagem",
        text: "Verifique os dados e tente novamente.",
        showConfirmButton: true,
        confirmButtonText: "OK",
      });
      console.error(error);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: "grid", gap: 2, maxWidth: 400 }}
    >
      <TextField
        label="Nome"
        name="name"
        value={form.name}
        onChange={handleChange}
        required
        variant="standard"
        fullWidth
      />

      {/* Componente de estrelas interativas */}
      <Box>
        <Typography component="legend">Nota</Typography>
        <Rating
          name="rating"
          value={form.rating}
          onChange={handleRatingChange}
          precision={0.5}
        />
      </Box>

      <TextField
        label="Localização"
        name="location"
        value={form.location}
        onChange={handleChange}
        required
        variant="standard"
        fullWidth
      />

      {/* Campo de dias */}
      <TextField
        label="Dias"
        name="days"
        type="number"
        value={form.days || ""}
        onChange={handleChange}
        required
        variant="standard"
        fullWidth
        inputProps={{ min: 1 }}
      />

      <TextField
        label="Preço"
        name="price"
        value={form.price}
        onChange={handleChange}
        required
        variant="standard"
        fullWidth
      />

      {/* Campo de descrição */}
      <TextField
        label="Descrição"
        name="description"
        value={form.description || ""}
        onChange={handleChange}
        multiline
        minRows={3}
        variant="standard"
        fullWidth
      />

      {/* Componente de upload de imagem */}
      <div className="col-span-full">
        <label
          htmlFor="cover-photo"
          className="block text-sm font-medium text-gray-900"
        >
          Imagem principal
        </label>
        <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
          <div className="text-center">
            <PhotoIcon
              aria-hidden="true"
              className="mx-auto h-12 w-12 text-gray-300"
            />
            <div className="mt-4 flex text-sm text-gray-600">
              <label
                htmlFor="file-upload-accommodation"
                className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
              >
                <span>Enviar imagem</span>
                <input
                  id="file-upload-accommodation"
                  name="file-upload-accommodation"
                  type="file"
                  className="sr-only"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </label>
              <p className="pl-1">ou arraste e solte</p>
            </div>
            <p className="text-xs text-gray-600">PNG, JPG, até 10MB</p>
          </div>
        </div>
      </div>

      <AmenitiesSelector
        selected={form.amenities}
        onChange={handleAmenitiesChange}
      />

      <Button type="submit" variant="contained">
        Cadastrar Hospedagem
      </Button>
    </Box>
  );
}
