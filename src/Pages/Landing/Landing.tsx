import React from "react";
import LoginPage from "../../Assets/LoginPage.png";
import PetWellLogo from '../../Assets/PetWell.png';
import { useNavigate } from 'react-router-dom';

const Landing: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    // Redirect to login page or perform login logic
    // Example: navigate('/dashboard');
    console.log("Redirect to login");
  };

  const handleSignUp = () => {
    navigate('/signup');
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: `url(${LoginPage})` }}
    >
      <div className="absolute inset-0 bg-black opacity-40"></div>

      {/* Login Card */}
      <div className="relative z-10 w-[760px] max-w-xl mx-4">
        <div
          className="rounded-2xl p-16 shadow-2xl flex flex-col items-center min-h-[520px] justify-center gap-10 bg-[#1C232E]/[0.90] backdrop-blur-lg"
        >
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <img src={PetWellLogo} alt="PetWell Logo" className="w-28 h-28 object-contain rounded-full p-2" />
          </div>

          {/* Title */}
          <div className="text-center mb-2">
            <h1 className="font-bold mb-2 text-[140px] leading-[1] font-[Alike,serif] text-[#EBD5BD]">PetWell</h1>
            <p className="text-[25px] font-[Cabin,sans-serif] text-[#EBD5BD]">
              We love you for loving your pets
            </p>
          </div>
          <div className="flex gap-6 pt-4 w-full justify-center font-[Cabin,sans-serif]">
            <button
              type="button"
              onClick={handleLogin}
              className="w-full h-[66px] py-4 font-[Cabin,sans-serif] text-black rounded-lg transition-colors font-medium text-[20px] shadow-lg bg-[#FFB23E] hover:bg-[#ffb733] focus:outline-none focus:ring-2 focus:ring-[#FFA500]"
            >
              Log In
            </button>
            <button
              type="button"
              onClick={handleSignUp}
              className="w-full h-[66px] py-4 font-[Cabin,sans-serif] text-black rounded-lg transition-colors font-medium text-[20px] shadow-lg bg-[#FFB23E] hover:bg-[#ffb733] focus:outline-none focus:ring-2 focus:ring-[#FFA500]"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
