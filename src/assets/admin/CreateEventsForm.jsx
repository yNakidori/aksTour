import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../firebase/firbase";
import { TextField, Button } from "@mui/material";

const CreateEventsForm = () => {
  const [formData, setFormData] = useState({
    Image: null,
    imageUrl: "",
    title: "",
    date: "",
    location: "",
    price: "",
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, Image: file }));
    if (file) {
      const storageRef = ref(storage, `events/${file.name}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      setFormData((prev) => ({ ...prev, imageUrl: url }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");
    try {
      const { imageUrl, title, date, location, price } = formData;
      if (!imageUrl)
        throw new Error("O evento precisa de uma imagem para capa!");
      if (!title) throw new Error("O evento precisa de um título!");
      if (!date) throw new Error("O evento precisa de uma data!");
      if (!location) throw new Error("O evento precisa de uma localização!");
      if (!price) throw new Error("O evento precisa de um preço!");

      await addDoc(collection(db, "events"), {
        Image: imageUrl,
        title,
        date,
        location,
        price,
      });

      setSuccess("✅ Evento criado com sucesso!");
      setFormData({
        Image: null,
        imageUrl: "",
        title: "",
        date: "",
        location: "",
        price: "",
      });
    } catch (err) {
      setError("⚠️ " + err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-6">Criar Novo Evento</h2>
      {success && <p className="text-green-600 mb-4">{success}</p>}
      {error && <p className="text-red-600 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Imagem de Capa
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <TextField
          label="Título"
          variant="standard"
          fullWidth
          value={formData.title}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, title: e.target.value }))
          }
        />

        <TextField
          label="Data"
          type="date"
          variant="standard"
          fullWidth
          InputLabelProps={{ shrink: true }}
          value={formData.date}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, date: e.target.value }))
          }
        />

        <TextField
          label="Localização"
          variant="standard"
          fullWidth
          value={formData.location}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, location: e.target.value }))
          }
        />

        <TextField
          label="Preço"
          variant="standard"
          fullWidth
          value={formData.price}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, price: e.target.value }))
          }
        />

        <Button variant="contained" color="primary" type="submit" fullWidth>
          Criar Evento
        </Button>
      </form>
    </div>
  );
};

export default CreateEventsForm;
