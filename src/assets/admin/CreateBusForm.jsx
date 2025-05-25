import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import { addDoc, collection } from "firebase/firestore";
import { db, storage } from "../../firebase/firbase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Swal from "sweetalert2";

export default function CreateBusForm() {
  const [form, setForm] = useState({
    name: "",
    mainImage: "",
    mainImageUrl: "",
    departure: "",
    arrival: "",
    price: "",
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    setForm((prev) => ({ ...prev, mainImage: file }));
    if (file) {
      const storageRef = ref(storage, `buses/${file.name}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      setForm((prev) => ({
        ...prev,
        mainImageUrl: url,
      }));
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");
    try {
      if (!form.mainImageUrl)
        throw new Error("O destino precisa de uma imagem!");
      if (!form.name) throw new Error("O destino precisa de um nome!");
      if (!form.departure) throw new Error("Informe o local de partida!");
      if (!form.arrival) throw new Error("Informe o local de chegada!");
      if (!form.price) throw new Error("Informe o preço!");

      await addDoc(collection(db, "buses"), {
        name: form.name,
        mainImageUrl: form.mainImageUrl,
        departure: form.departure,
        arrival: form.arrival,
        price: form.price,
      });

      setSuccess("✅ Destino rodoviário criado com sucesso!");
      setForm({
        name: "",
        mainImage: "",
        mainImageUrl: "",
        departure: "",
        arrival: "",
        price: "",
      });
    } catch (err) {
      setError("⚠️ " + err.message);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.message,
        showConfirmButton: false,
        timer: 1500,
      });
      console.error("Error creating bus:", err);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-6">Criar Destino Rodoviário</h2>
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
          label="Destino"
          name="name"
          variant="standard"
          fullWidth
          value={form.name}
          onChange={handleChange}
        />

        <TextField
          label="Partida"
          name="departure"
          variant="standard"
          type="date"
          fullWidth
          value={form.departure}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
        />

        <TextField
          label="Chegada"
          name="arrival"
          variant="standard"
          type="date"
          fullWidth
          value={form.arrival}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
        />

        <TextField
          label="Preço"
          name="price"
          variant="standard"
          fullWidth
          value={form.price}
          onChange={handleChange}
        />

        <Button variant="contained" color="primary" type="submit" fullWidth>
          Criar Destino
        </Button>
      </form>
    </div>
  );
}
