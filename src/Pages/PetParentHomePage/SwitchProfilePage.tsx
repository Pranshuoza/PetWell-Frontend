import React, { useState } from "react";
import Navbar from "../../Components/Layout/Navbar";
import SwitchProfileModal from "../../Components/Profile/SwitchProfileModal";
import type { PetProfileType } from "../../Components/Profile/SwitchProfileModal";
import { useNavigate } from "react-router-dom";

const pets: PetProfileType[] = [
  {
    id: "syd",
    name: "Syd",
    age: "13 years",
    breed: "Chihuahua Mix",
    avatar: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=facearea&w=400&h=400&q=80",
  },
  {
    id: "frank",
    name: "Frank",
    age: "9 years",
    breed: "Abyssinian",
    avatar: "https://images.unsplash.com/photo-1518715308788-3005759c41c8?auto=format&fit=facearea&w=400&h=400&q=80",
  },
];

const SwitchProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(true);

  const handleSwitch = (petId: string) => {
    setShowModal(false);
    // Implement navigation to the selected pet's profile
    if (petId === "frank") {
      alert("Switching to Frank's profile (implement navigation)");
    } else {
      navigate("/pet-profile");
    }
  };
  const handleAddNew = () => {
    setShowModal(false);
    navigate("/create-pet-profile");
  };

  return (
    <div className="min-h-screen w-full bg-[#181e29] text-[#EBD5BD]">
      <Navbar userName="Syd" userImage="https://randomuser.me/api/portraits/dogs/1.jpg" />
      <SwitchProfileModal
        isOpen={showModal}
        onClose={() => { setShowModal(false); navigate('/home'); }}
        onSwitch={handleSwitch}
        onAddNew={handleAddNew}
        pets={pets}
      />
    </div>
  );
};

export default SwitchProfilePage;
