import React from "react";

const CustomFields = ({ formData, setFormData }) => {
  const handleCustomFieldChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      customFields: {
        ...prev.customFields,
        [field]: value,
      },
    }));
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      {["days", "people", "luggage", "nights"].map((field) => (
        <div key={field}>
          <label className="block text-gray-700 font-semibold mb-2">
            {field === "days"
              ? "Quantidade de Dias"
              : field === "people"
              ? "Quantidade de Pessoas"
              : field === "luggage"
              ? "Quantidade de Malas"
              : "Quantidade de Noites"}
          </label>
          <input
            type="number"
            value={formData.customFields[field]}
            onChange={(e) => handleCustomFieldChange(field, e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring focus:ring-blue-200"
          />
        </div>
      ))}
    </div>
  );
};

export default CustomFields;
