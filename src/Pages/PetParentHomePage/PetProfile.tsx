import React, { useState } from "react";
import Navbar from "../../Components/Layout/Navbar";
import { useNavigate } from "react-router-dom";
import SwitchProfileModal from "../../Components/Profile/SwitchProfileModal";
import type { PetProfileType } from "../../Components/Profile/SwitchProfileModal";

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

const PetProfile: React.FC = () => {
  const navigate = useNavigate();
  const [showSwitchModal, setShowSwitchModal] = useState(false);

  // Navigation handlers
  const handleEditProfile = () => navigate("/edit-profile");
  const handleSwitchProfile = () => setShowSwitchModal(true);
  const handleModalSwitch = (petId: string) => {
    setShowSwitchModal(false);
    // Navigate to the selected pet's profile (stub)
    if (petId === "frank") {
      // Example: navigate to Frank's profile
      alert("Switching to Frank's profile (implement navigation)");
    }
  };
  const handleAddNewPet = () => {
    setShowSwitchModal(false);
    navigate("/create-pet-profile");
  };

  return (
    <div className="min-h-screen w-full bg-[#181e29] text-[#EBD5BD] px-0 sm:px-8 pb-10">
      <Navbar
        userName="Syd"
        userImage="https://randomuser.me/api/portraits/dogs/1.jpg"
        onSwitchProfile={handleSwitchProfile}
      />
      <SwitchProfileModal
        isOpen={showSwitchModal}
        onClose={() => setShowSwitchModal(false)}
        onSwitch={handleModalSwitch}
        onAddNew={handleAddNewPet}
        pets={pets}
      />
      <div className="pt-8 px-4 sm:px-0 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
          <div>
            <button className="text-[#FFB23E] text-base font-medium flex items-center gap-2 hover:underline mb-2 sm:mb-0" onClick={() => navigate(-1)}>
              <span className="text-xl">&lt;</span> Go Back
            </button>
            <h1 className="text-3xl font-serif font-bold">Pet Profile</h1>
          </div>
          <div className="flex flex-row gap-4">
            <button className="border border-[#FFB23E] text-[#FFB23E] px-6 py-2 rounded-lg font-medium flex items-center gap-2 hover:bg-[#FFB23E] hover:text-black transition text-base" onClick={handleEditProfile}>
              ✏️ Edit Profile
            </button>
            <button className="border border-[#FFB23E] text-[#FFB23E] px-6 py-2 rounded-lg font-medium flex items-center gap-2 hover:bg-[#FFB23E] hover:text-black transition text-base" onClick={handleSwitchProfile}>
              Switch to Another Pet
            </button>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left: Pet Card */}
          <div className="bg-[#23272f] rounded-2xl p-6 flex flex-col items-center w-full max-w-xs min-w-[260px]">
            <div className="w-48 h-48 rounded-xl overflow-hidden mb-4 bg-[#23272f] flex items-center justify-center">
              <img
                src="https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=facearea&w=400&h=400&q=80"
                alt="Syd"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-full">
              <div className="text-2xl font-bold mb-2">Syd</div>
              <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm mb-2">
                <div>
                  <span className="text-[#EBD5BD] opacity-70">Age</span>
                  <div className="font-bold">13 years old</div>
                </div>
                <div>
                  <span className="text-[#EBD5BD] opacity-70">Gender</span>
                  <div className="font-bold">Male</div>
                </div>
              </div>
              <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm mb-2">
                <div>
                  <span className="text-[#EBD5BD] opacity-70">Breed</span>
                  <div className="font-bold">Chihuahua Mix</div>
                </div>
                <div>
                  <span className="text-[#EBD5BD] opacity-70">Colour</span>
                  <div className="font-bold">Brown Tan</div>
                </div>
              </div>
              <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm mb-2">
                <div>
                  <span className="text-[#EBD5BD] opacity-70">Microchip Number</span>
                  <div className="font-bold">0192837465</div>
                </div>
                <div>
                  <span className="text-[#EBD5BD] opacity-70">Birthdate</span>
                  <div className="font-bold">21/8/13</div>
                </div>
              </div>
            </div>
          </div>
          {/* Right: Main Info */}
          <div className="flex-1 flex flex-col gap-6">
            {/* Buttons Row - move above the main card */}
            
            {/* Health Summary */}
            <div className="bg-[#23272f] rounded-2xl p-6 flex flex-col gap-2">
              <div className="text-xl font-bold mb-2">Health Summary</div>
              <div className="flex flex-wrap gap-x-8 gap-y-2 text-base mb-2">
                <div>
                  <span className="opacity-70">Spay/Neuter Status</span>
                  <span className="font-bold ml-2">Neutered</span>
                </div>
                <div>
                  <span className="opacity-70">Weight</span>
                  <span className="font-bold ml-2">12lbs</span>
                </div>
                <div>
                  <span className="opacity-70">Special Notes</span>
                  <span className="font-bold ml-2">Allergic to chicken. Anxious during grooming.</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-x-8 gap-y-2 text-base mb-2">
                <div>
                  <span className="opacity-70">Last Vet Visit</span>
                  <span className="font-bold ml-2">3/4/24</span>
                  <span className="ml-2">| Dr. Patel, Central Bark Vet Clinic</span>
                  <span className="ml-2 text-[#FFB23E] cursor-pointer hover:underline">View Document</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-x-8 gap-y-2 text-base">
                <div>
                  <span className="opacity-70">Next Vaccine Due</span>
                  <span className="font-bold ml-2">K9 DA2PPV 3 Year (VANGUARD)</span>
                  <span className="ml-2">| In 3 days</span>
                  <span className="ml-2 text-[#FF4B4B]">&#x26A0;</span>
                </div>
              </div>
            </div>
            {/* Syd's Code & Your Details */}
            <div className="flex flex-col md:flex-row gap-6">
              {/* Syd's Code */}
              <div className="bg-[#23272f] rounded-2xl p-6 flex-1 flex flex-col items-center min-w-[260px]">
                <div className="text-xl font-bold mb-3 w-full">Syd's Code</div>
                <div className="flex gap-2 mb-2 justify-center items-center">
                  <span className="inline-flex w-10 h-10 bg-[#fff] bg-opacity-80 text-[#23272f] text-xl font-extrabold rounded-lg items-center justify-center border-2 border-[#EBD5BD] shadow-sm tracking-widest select-all text-center" style={{boxShadow: '0 2px 8px 0 rgba(44, 44, 44, 0.10)'}}>X</span>
                  <span className="inline-flex w-10 h-10 bg-[#fff] bg-opacity-80 text-[#23272f] text-xl font-extrabold rounded-lg items-center justify-center border-2 border-[#EBD5BD] shadow-sm tracking-widest select-all text-center" style={{boxShadow: '0 2px 8px 0 rgba(44, 44, 44, 0.10)'}}>8</span>
                  <span className="inline-flex w-10 h-10 bg-[#fff] bg-opacity-80 text-[#23272f] text-xl font-extrabold rounded-lg items-center justify-center border-2 border-[#EBD5BD] shadow-sm tracking-widest select-all text-center" style={{boxShadow: '0 2px 8px 0 rgba(44, 44, 44, 0.10)'}}>T</span>
                  <span className="inline-flex w-10 h-10 bg-[#fff] bg-opacity-80 text-[#23272f] text-xl font-extrabold rounded-lg items-center justify-center border-2 border-[#EBD5BD] shadow-sm tracking-widest select-all text-center" style={{boxShadow: '0 2px 8px 0 rgba(44, 44, 44, 0.10)'}}>V</span>
                  <span className="inline-flex w-10 h-10 bg-[#fff] bg-opacity-80 text-[#23272f] text-xl font-extrabold rounded-lg items-center justify-center border-2 border-[#EBD5BD] shadow-sm tracking-widest select-all text-center" style={{boxShadow: '0 2px 8px 0 rgba(44, 44, 44, 0.10)'}}>4</span>
                </div>
                <div className="text-xs text-[#EBD5BD] text-opacity-70 text-center">
                  Share with care providers to give access to the profile.
                </div>
              </div>
              {/* Your Details */}
              <div className="bg-[#23272f] rounded-2xl p-6 flex-1 flex flex-col min-w-[260px]">
                <div className="text-xl font-bold mb-3 w-full">Your Details</div>
                <div className="flex flex-col gap-2 text-base">
                  <div>
                    <span className="opacity-70">Name</span>
                    <span className="font-bold ml-2">Monica Lee</span>
                  </div>
                  <div>
                    <span className="opacity-70">Location</span>
                    <span className="font-bold ml-2">Dallas, Texas</span>
                  </div>
                  <div>
                    <span className="opacity-70">Phone number</span>
                    <span className="font-bold ml-2">565-555-5562</span>
                  </div>
                  <div>
                    <span className="opacity-70">Email</span>
                    <span className="font-bold ml-2">email@website.com</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetProfile;
