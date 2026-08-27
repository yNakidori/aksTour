import React from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase/firbase";
import { compressImage } from "../../utils/compressImage";

const ImageUpload = ({ formData, setFormData }) => {
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFormData((prev) => ({ ...prev, image: file }));
    try {
      const compressed = await compressImage(file, 800, 0.65);
      const timestamp = Date.now();
      const storageRef = ref(
        storage,
        `pricingCards/${timestamp}_${compressed.name}`,
      );
      const metadata = {
        contentType: "image/jpeg",
        cacheControl: "public, max-age=31536000, immutable",
      };
      await uploadBytes(storageRef, compressed, metadata);
      const url = await getDownloadURL(storageRef);
      setFormData((prev) => ({ ...prev, imageUrl: url }));
    } catch (err) {
      console.error("Erro ao fazer upload da imagem.", err);
    }
  };

  return (
    <div>
      <label className="block text-gray-700 font-poppins font-semibold mb-2">
        Adicionar Imagem
      </label>
      <input
        type="file"
        onChange={handleImageUpload}
        className="w-full border border-gray-300 rounded-lg p-2 focus:ring focus:ring-blue-200"
      />
    </div>
  );
};

export default ImageUpload;
