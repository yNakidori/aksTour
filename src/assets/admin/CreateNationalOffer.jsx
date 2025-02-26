import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../firebase/firbase";
import { TextField, Button } from "@mui/material";
import { PhotoIcon } from "@heroicons/react/20/solid";

const CreateNationalOffer = () => {
  const [formData, setFormData] = useState({
    Image: null,
    imageUrl: "",
    destiny: "",
    date: "",
    price: "",
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, Image: file }));
    if (file) {
      const storageRef = ref(storage, `nationalOffers/${file.name}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      setFormData((prev) => ({ ...prev, imageUrl: url }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!formData.imageUrl)
        throw new Error("A oferta precisa de uma imagem!");
      if (!formData.destiny) throw new Error("A oferta precisa de um destino!");
      if (!formData.date) throw new Error("A oferta precisa de uma data!");
      if (!formData.price) throw new Error("A oferta precisa de um preço!");

      await addDoc(collection(db, "nationalOffers"), {
        Image: formData.imageUrl,
        destiny: formData.destiny,
        date: formData.date,
        price: formData.price,
      });

      setSuccess("Oferta criada com sucesso!");
      setFormData({
        Image: null,
        imageUrl: "",
        destiny: "",
        date: "",
        price: "",
      });
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Criar Oferta Nacional</h2>
      {success && <p className="text-green-500 mb-4">{success}</p>}
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <TextField
            id="destiny"
            label="Destino"
            variant="standard"
            fullWidth
            value={formData.destiny}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, destiny: e.target.value }))
            }
          />
        </div>
        <div>
          <TextField
            id="date"
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
        </div>
        <div>
          <TextField
            id="price"
            label="Preço"
            variant="standard"
            fullWidth
            value={formData.price}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, price: e.target.value }))
            }
          />
        </div>
        <div className="col-span-full">
          <label
            htmlFor="cover-photo"
            className="block text-sm font-medium text-gray-900"
          >
            Cover photo
          </label>
          <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
            <div className="text-center">
              <PhotoIcon
                aria-hidden="true"
                className="mx-auto h-12 w-12 text-gray-300"
              />
              <div className="mt-4 flex text-sm text-gray-600">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                >
                  <span>Upload a file</span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="sr-only"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-600">PNG, JPG, GIF up to 10MB</p>
            </div>
          </div>
        </div>
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Criar Oferta
        </Button>
      </form>
    </div>
  );
};

export default CreateNationalOffer;
