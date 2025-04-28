import React from "react";

const FeatureModal = ({
  featureOptions,
  formData,
  setFormData,
  setModalOpen,
}) => {
  const handleFeatureToggle = (feature) => {
    const features = formData.features.includes(feature)
      ? formData.features.filter((f) => f !== feature)
      : [...formData.features, feature];
    setFormData((prev) => ({ ...prev, features }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-md max-h-[80vh] overflow-y-auto p-6">
        <h3 className="text-lg font-bold mb-4">Selecione as Features</h3>
        <ul className="space-y-2">
          {featureOptions.map((feature, index) => (
            <li key={index} className="flex items-center">
              <input
                type="checkbox"
                id={`feature-${index}`}
                checked={formData.features.includes(feature)}
                onChange={() => handleFeatureToggle(feature)}
                className="mr-2"
              />
              <label htmlFor={`feature-${index}`} className="text-gray-700">
                {feature}
              </label>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex justify-end">
          <button
            onClick={() => setModalOpen(false)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeatureModal;
