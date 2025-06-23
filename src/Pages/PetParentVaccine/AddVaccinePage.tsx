import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Components/Layout/Navbar";
import AddVaccine from "../../Components/Vaccine/AddVaccine";
const AddVaccinePage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen w-screen bg-[var(--color-background)] text-[var(--color-text)] font-sans">
      <Navbar
        userName="Syd"
        userImage="https://randomuser.me/api/portraits/men/32.jpg"
      />
      <div className="max-w-8xl mx-auto px-12 pt-4 pb-12">
        <button
          className="text-[#FFA500] text-md mb-4 flex items-center hover:underline bg-transparent"
          onClick={() => navigate(-1)}
        >
          <span className="mr-2">&lt; Go Back</span>
        </button>
        <div className="max-w-lg mx-auto pt-8 pb-12 flex flex-col items-center">
          <AddVaccine />
        </div>
      </div>
    </div>
  );
};

export default AddVaccinePage;
