import React from "react";
import { useNavigate } from "react-router-dom";
import PetWellLogo from "../../Assets/PetWell.png";

const SignupTypeSelectPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#181f27] text-[var(--color-text)]">
      <div className="absolute left-10 top-8">
        <img
          src={PetWellLogo}
          alt="PetWell Logo"
          className="w-16 h-16 object-contain"
        />
      </div>
      <div className="bg-[var(--color-card)] rounded-2xl shadow-2xl px-10 py-12 flex flex-col items-center w-[400px] max-w-full border border-[#2d3648]">
        <h2 className="text-2xl font-serif text-[var(--color-heading)] mb-8 font-bold text-center">
          Sign up as...
        </h2>
        <button
          className="w-full py-4 mb-4 rounded-lg bg-[var(--color-primary)] text-black text-lg font-semibold hover:brightness-110 transition"
          onClick={() => navigate("/signup/pet-parent")}
        >
          Pet Parent
        </button>
        <button
          className="w-full py-4 mb-4 rounded-lg bg-[#EBD5BD] text-[#181f27] text-lg font-semibold hover:brightness-110 transition"
          onClick={() => navigate("/signup/staff")}
        >
          Staff (Veterinarian/Employee)
        </button>
        <button
          className="w-full py-4 rounded-lg bg-[#232b3e] text-[var(--color-primary)] text-lg font-semibold border border-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-black transition"
          onClick={() => navigate("/signup/business")}
        >
          Business Owner
        </button>
      </div>
    </div>
  );
};

export default SignupTypeSelectPage;
