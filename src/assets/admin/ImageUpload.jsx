import React from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase/firbase";

const ImageUpload = ({ formData, setFormData }) => {
  const handleImageUpload = async (e) => {
    const file = e.target.file[0];
    setFormData((prev) => ({ ...prev, image: file }));
    if (file) {
      const storageRef = ref(storage, `pricingCards/${file.name}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      setFormData((prev) => ({ ...prev, imageUrl: url }));
    }
  };

  return (
    <div>
      <label className="block text-gray-700 font-poppins font-semibold mb-2">
        Criar Pacote
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
