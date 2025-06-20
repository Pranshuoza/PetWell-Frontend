import React, { useState } from "react";
import PetWellLogo from "../../Assets/PetWell.png";
import VaccineInfo from "../../Components/VaccineInfo";
import EditVaccineModal from "../../Components/EditVaccineModal";
import { FaPencilAlt } from "react-icons/fa";

const vaccines = [
  {
    name: "K9 DA2PPV 3 Year (VANGUARD)",
    administered: "4/15/23",
    expires: "4/16/25",
  },
  {
    name: "Heartgard Plus",
    administered: "4/15/23",
    expires: "4/16/25",
  },
  {
    name: "K9 Leptospira Vaccine 1 Year",
    administered: "4/15/23",
    expires: "4/16/25",
  },
  {
    name: "K9 DA2PPV 3 Year (VANGUARD)",
    administered: "4/15/23",
    expires: "4/16/25",
  },
];

const documents = [
  { name: "Full Med Record_2025.pdf", size: "3.2 MB", type: "pdf" },
  { name: "Training Plan_Syd.pdf", size: "3.2 MB", type: "pdf" },
  { name: "Syd left jaw.png", size: "3.2 MB", type: "img" },
  { name: "Dog Daze Report Card 2/15.pdf", size: "3.2 MB", type: "pdf" },
  { name: "Full Med Record_2025.pdf", size: "3.2 MB", type: "pdf" },
  { name: "Syd left jaw.png", size: "3.2 MB", type: "img" },
];

const VerificationPage: React.FC = () => {
  const [editIdx, setEditIdx] = useState<number | null>(null);
  return (
    <div className="min-h-screen w-screen font-sans flex flex-col items-center bg-[#101624] text-[#EBD5BD]">
      {/* Logo and Header */}
      <div className="absolute left-10 top-8">
        <img
          src={PetWellLogo}
          alt="PetWell Logo"
          className="w-12 h-12 object-contain"
        />
      </div>
      <div className="flex justify-between items-center w-full max-w-6xl mt-12 mb-4 px-8">
        <h1 className="text-3xl font-bold text-[#EBD5BD]">
          Here's what we know. Check it out!
        </h1>
        <div className="flex items-center space-x-3">
          <span className="text-[#EBD5BD] font-semibold">Syd</span>
          <img
            src="https://randomuser.me/api/portraits/men/32.jpg"
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover border-2 border-[#FFA500]"
          />
          <svg
            className="w-4 h-4 text-[#EBD5BD]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
      <div className="w-full max-w-6xl px-8">
        <p className="text-[#EBD5BD] opacity-80 mb-8 text-lg">
          You can review, edit, or add notes before saving it to Syd's profile.
        </p>
        {/* Vaccines Section */}
        <h2 className="text-xl font-semibold mb-4">Syd's Vaccines</h2>
        <div className="grid grid-cols-3 gap-6 mb-10">
          {vaccines.map((vaccine, idx) => (
            <div className="relative group" key={idx}>
              <VaccineInfo
                name={vaccine.name}
                administered={vaccine.administered}
                expires={vaccine.expires}
              />
              <button
                className="absolute top-2 right-2 opacity-80 group-hover:opacity-100 bg-[#232b3e] rounded-full p-2 text-[#FFA500] hover:bg-[#FFA500] hover:text-white transition"
                onClick={() => setEditIdx(idx)}
              >
                <FaPencilAlt className="w-5 h-5" />
              </button>
              {editIdx === idx && (
                <EditVaccineModal
                  open={editIdx === idx}
                  onClose={() => setEditIdx(null)}
                  vaccine={vaccine}
                />
              )}
            </div>
          ))}
          {/* Add a Vaccine Card */}
          <div className="border-2 border-[#EBD5BD] border-dashed rounded-xl flex flex-col items-center justify-center min-h-[120px] cursor-pointer hover:border-[#FFA500] transition">
            <span className="text-3xl text-[#EBD5BD] mb-2">+</span>
            <span className="text-[#EBD5BD] font-semibold">Add a Vaccine</span>
          </div>
        </div>
        {/* Uploaded Documents Section */}
        <h2 className="text-xl font-semibold mb-4">Uploaded Documents</h2>
        <div className="grid grid-cols-2 gap-6 mb-10">
          {documents.map((doc, idx) => (
            <div
              key={idx}
              className="flex items-center bg-[#232b3e] rounded-xl px-4 py-3 shadow-md"
            >
              <div
                className={`w-8 h-8 flex items-center justify-center rounded-full mr-3 ${
                  doc.type === "pdf" ? "bg-red-600" : "bg-green-600"
                }`}
              >
                {doc.type === "pdf" ? (
                  <span className="text-white font-bold">PDF</span>
                ) : (
                  <span className="text-white font-bold">IMG</span>
                )}
              </div>
              <span className="flex-1 truncate text-base font-medium">
                {doc.name}
              </span>
              <span className="mx-2 text-[#EBD5BD] text-sm opacity-80">
                {doc.size}
              </span>
              <button className="ml-2 text-[#EBD5BD] hover:text-red-500 text-xl">
                ×
              </button>
            </div>
          ))}
        </div>
        <div className="flex justify-end gap-8 mt-4 w-full">
          <button className="px-8 py-3 mb-4 rounded-lg bg-[#FFA500] text-white font-semibold text-lg hover:brightness-110 transition">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerificationPage;
