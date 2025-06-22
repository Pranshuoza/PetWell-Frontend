import React from "react";
import { useNavigate } from "react-router-dom";
import PetWellLogo from "../../Assets/PetWell.png";
import UploadDocument from "../../Components/UploadDocument/UploadDocuments";
import Loader from "../../Components/ui/Loader";

const UploadDocuments: React.FC = () => {
  const navigate = useNavigate();
  const [showLoader, setShowLoader] = React.useState(false);

  return (
    <div className="min-h-screen w-screen font-sans flex flex-col items-center bg-[#101624] text-[#EBD5BD]">
      {/* Logo and Back Button */}
      <div className="absolute left-10 top-8 flex flex-col items-start gap-2">
        <img
          src={PetWellLogo}
          alt="PetWell Logo"
          className="w-12 h-12 object-contain mb-2"
        />
        <button
          className="flex items-center gap-1 text-[#EBD5BD] hover:text-[#FFA500] text-base font-semibold px-2 py-1 rounded transition border border-transparent hover:border-[#FFA500]"
          onClick={() => navigate(-1)}
          aria-label="Back"
        >
          <span className="text-xl">&#8592;</span> Back
        </button>
      </div>
      {/* Profile Image */}
      <div className="mt-16 flex flex-col items-center">
        <img
          src="https://randomuser.me/api/portraits/men/32.jpg"
          alt="Profile"
          className="w-28 h-28 rounded-full object-cover border-4 border-[#EBD5BD] shadow-lg"
        />
        <h1 className="mt-8 text-4xl font-bold text-[#EBD5BD]">
          Upload documents for Syd
        </h1>
        <p className="mt-2 text-lg text-[#EBD5BD] opacity-80 max-w-xl text-center">
          Keep your pet’s records safe and accessible — from vaccine
          certificates to vet bills.
        </p>
      </div>
      {/* UploadDocument component handles upload logic and UI */}
      {showLoader && <Loader />}
      <UploadDocument
        onNext={() => {
          setShowLoader(true);
          setTimeout(() => {
            setShowLoader(false);
            navigate("/verify");
          }, 2000);
        }}
      />
    </div>
  );
};

export default UploadDocuments;
