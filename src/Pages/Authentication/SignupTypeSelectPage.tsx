import React from "react";
import { useNavigate } from "react-router-dom";
import PetWellLogo from "../../Assets/PetWell.png";

const SignupTypeSelectPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#181F29]">
      <div className="absolute top-8 left-8">
        {/* Logo - replace with your logo if needed */}
        <img
          src={PetWellLogo}
          alt="PetWell Logo"
          style={{
            width: 48,
            height: 48,
            borderRadius: "50%",
          }}
        />
      </div>
      <div className="flex flex-col items-center justify-center w-full">
        <h1 className="text-4xl font-serif font-bold text-[#EBD5BD] mb-4 text-center">
          Let’s get you started
        </h1>
        <p className="text-lg text-[#EBD5BD] opacity-80 mb-12 text-center">
          Tell us who you are so we can tailor your experience.
        </p>
        <div className="flex flex-col md:flex-row gap-8 mt-2">
          <button
            className="flex flex-col items-start gap-2 px-10 py-7 rounded-xl bg-[#23272f] hover:bg-[#23272f]/80 transition border-none shadow-lg min-w-[320px] max-w-full text-left focus:outline-none"
            onClick={() => navigate("/signup/pet-parent")}
          >
            <span className="text-4xl mb-2">🐾</span>
            <span className="text-xl font-bold text-[#EBD5BD]">
              I’m a Pet Parent
            </span>
            <span className="text-base text-[#EBD5BD] opacity-80">
              Manage your pet’s health, records, and care team – all in one place.
            </span>
          </button>
          <button
            className="flex flex-col items-start gap-2 px-10 py-7 rounded-xl bg-[#23272f] hover:bg-[#23272f]/80 transition border-none shadow-lg min-w-[320px] max-w-full text-left focus:outline-none"
            onClick={() => navigate("/signup/business")}
          >
            <span className="text-4xl mb-2">💼</span>
            <span className="text-xl font-bold text-[#EBD5BD]">
              I’m a Business
            </span>
            <span className="text-base text-[#EBD5BD] opacity-80">
              Connect with pet parents, upload records, and manage your care team.
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignupTypeSelectPage;
