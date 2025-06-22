import React from "react";

export interface PetProfileType {
  id: string;
  name: string;
  age: string;
  breed: string;
  avatar: string;
}

interface SwitchProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitch: (petId: string) => void;
  onAddNew: () => void;
  pets: PetProfileType[];
}

const SwitchProfileModal: React.FC<SwitchProfileModalProps> = ({
  isOpen,
  onClose,
  onSwitch,
  onAddNew,
  pets,
}) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="relative bg-[#23272f] rounded-2xl shadow-2xl w-[400px] max-w-full p-8">
        <button
          className="absolute top-6 right-6 text-[#EBD5BD] hover:text-[#FFB23E] text-2xl font-light focus:outline-none"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
        <div className="text-2xl font-serif font-bold text-[#fff] mb-2">Switch profile?</div>
        <div className="text-sm text-[#EBD5BD] mb-6">Choose a pet to view or manage their profile.</div>
        <div className="flex flex-col gap-3 mb-8">
          {pets.map((pet) => (
            <button
              key={pet.id}
              className="flex items-center justify-between w-full bg-[#181A20] hover:bg-[#23272f] border border-[#EBD5BD]/20 rounded-xl px-4 py-3 transition group"
              onClick={() => onSwitch(pet.id)}
            >
              <div className="flex items-center gap-3">
                <img
                  src={pet.avatar}
                  alt={pet.name}
                  className="w-10 h-10 rounded-full object-cover border-2 border-[#EBD5BD]"
                />
                <div className="flex flex-col items-start">
                  <span className="text-base font-semibold text-[#fff]">{pet.name}</span>
                  <span className="text-xs text-[#EBD5BD] mt-0.5">{pet.age} <span className="mx-1">|</span> {pet.breed}</span>
                </div>
              </div>
              <svg
                className="w-5 h-5 text-[#EBD5BD] group-hover:text-[#FFB23E] transition"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          ))}
        </div>
        <div className="flex gap-3 justify-end">
          <button
            className="px-6 py-2 rounded-lg border border-[#FFB23E] text-[#FFB23E] font-medium bg-transparent hover:bg-[#FFB23E] hover:text-black transition"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-6 py-2 rounded-lg bg-[#FFB23E] text-[#23272f] font-semibold hover:bg-[#ffcb6b] transition shadow"
            onClick={onAddNew}
          >
            Add new pet profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default SwitchProfileModal;
