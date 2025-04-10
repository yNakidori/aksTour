import React from "react";

const FeatureModal = ({
  featureOptions,
  formData,
  setFormData,
  setModalOpen,
}) => {
  const handleFeatureToggle = (feature) => {
    setFormData((prev) => {
      const features = prev.features.includes(feature)
        ? prev.features.filter((f) => f !== feature)
        : [...prev.features, feature];
      return { ...prev, features };
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md relative">
        <button
          onClick={() => setModalOpen(false)}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <span className="material-icons">close</span>
        </button>
        <h3 className="text-xl font-bold text-gray-800 mb-4">
          Selecione Features
        </h3>
        <ul className="space-y-2">
          {featureOptions.map((option, i) => (
            <li key={i} className="flex items-center">
              <input
                type="checkbox"
                id={`feature-${i}`}
                value={option}
                onChange={() => handleFeatureToggle(option)}
                checked={formData.features.includes(option)}
                className="mr-2"
              />
              <label htmlFor={`feature-${i}`} className="text-gray-700">
                {option}
              </label>
            </li>
          ))}
        </ul>
        <button
          onClick={() => setModalOpen(false)}
          className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          Confirmar
        </button>
      </div>
    </div>
  );
};

export default FeatureModal;
