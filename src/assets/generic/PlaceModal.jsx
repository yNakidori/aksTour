import { Dialog } from "@headlessui/react";
import { X } from "lucide-react";

const PlaceModal = ({ place, onClose }) => {
  return (
    <Dialog
      open={!!place}
      onClose={onClose}
      className="fixed z-50 inset-0 overflow-y-auto"
    >
      <div className="flex items-center justify-center min-h-screen px-4 text-center bg-black bg-opacity-70">
        <Dialog.Panel className="w-full max-w-md p-4 bg-white rounded-2xl shadow-xl transform transition-all">
          <div className="flex justify-between items-center mb-4">
            <Dialog.Title className="text-xl font-bold">
              {place.name}
            </Dialog.Title>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <p className="text-sm text-gray-700 mb-4">{place.description}</p>

          {place.images && (
            <div className="grid grid-cols-2 gap-2">
              {place.images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`Imagem ${i + 1}`}
                  className="w-full h-24 object-cover rounded-lg"
                />
              ))}
            </div>
          )}
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default PlaceModal;
