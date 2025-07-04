import React from "react";
import { useNavigate } from "react-router-dom";
import PetWellLogo from "../../Assets/PetWell.png";
import { PawPrint, Building2 } from "lucide-react";

const SignupTypeSelectPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#181e29] text-[#EBD5BD] px-4">
      <div className="w-full flex justify-center mt-8 mb-6">
        <img
          src={PetWellLogo}
          alt="PetWell Logo"
          className="w-16 h-16 sm:w-20 sm:h-20 rounded-full shadow-lg"
        />
      </div>
      <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-center font-serif">
        Let's get you started
      </h1>
      <p className="text-base sm:text-lg text-[#EBD5BD] opacity-80 mb-10 text-center max-w-xl">
        Tell us who you are so we can tailor your experience.
      </p>
      <div className="flex flex-col sm:flex-row gap-8 w-full max-w-2xl justify-center">
        <button
          className="flex-1 flex flex-col items-center gap-4 bg-[#23272f] hover:bg-[#2d3340] border-2 border-[#FFB23E] rounded-2xl px-8 py-10 shadow-lg transition group"
          onClick={() => navigate("/signup/pet-parent")}
        >
          <PawPrint size={48} className="text-[#FFB23E] group-hover:scale-110 transition-transform" />
          <span className="text-xl font-semibold text-[#FFB23E]">I'm a Pet Parent</span>
          <span className="text-base text-[#EBD5BD] opacity-80 text-center mt-2">
            Manage your pet's health, records, and care team – all in one place.
          </span>
        </button>
        <button
          className="flex-1 flex flex-col items-center gap-4 bg-[#23272f] hover:bg-[#2d3340] border-2 border-[#FFB23E] rounded-2xl px-8 py-10 shadow-lg transition group"
          onClick={() => navigate("/signup/business")}
        >
          <Building2 size={48} className="text-[#FFB23E] group-hover:scale-110 transition-transform" />
          <span className="text-xl font-semibold text-[#FFB23E]">I'm a Business</span>
          <span className="text-base text-[#EBD5BD] opacity-80 text-center mt-2">
            Connect with pet parents, upload records, and manage your care team.
          </span>
        </button>
      </div>
    </div>
  );
};

export default SignupTypeSelectPage;
