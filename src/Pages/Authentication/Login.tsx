import React from "react";
import LoginPage from "../../Assets/LoginPage.png";
import PetWellLogo from '../../Assets/PetWell.png';

const Login: React.FC = () => {
  // You can use navigation hooks here if you want to redirect
  // For example, with react-router-dom v6:
  // const navigate = useNavigate();

  const handleLogin = () => {
    // Redirect to login page or perform login logic
    // Example: navigate('/dashboard');
    console.log("Redirect to login");
  };

  const handleSignUp = () => {
    // Redirect to signup page
    // Example: navigate('/signup');
    console.log("Redirect to signup");
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: `url(${LoginPage})` }}
    >
      <div className="absolute inset-0 bg-black opacity-40"></div>

      {/* Login Card */}
      <div className="relative z-10 w-760 max-w-xl mx-4">
        <div
          className="rounded-2xl p-16 shadow-2xl flex flex-col items-center min-h-[520px] justify-center gap-10"
          style={{
            background: "rgba(28, 35, 46, 0.9)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
          }}
        >
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <img src={PetWellLogo} alt="PetWell Logo" className="w-28 h-28 object-contain rounded-full p-2" />
          </div>

          {/* Title */}
          <div className="text-center mb-2">
            <h1 className="font-bold mb-2" style={{ fontFamily: 'Alike, serif', color: '#EBD5BD', fontSize: '140px', lineHeight: '1' }}>PetWell</h1>
            <p className="text-lg" style={{ fontFamily: 'Cabin, sans-serif', color: '#EBD5BD' }}>
              We love you for loving your pets
            </p>
          </div>
          <div className="flex gap-6 pt-4 w-full justify-center" style={{ fontFamily: 'Cabin, sans-serif' }}>
            <button
              type="button"
              onClick={handleLogin}
              className="w-full py-4 text-black rounded-lg transition-colors font-semibold text-[28px] shadow-lg"
              style={{ backgroundColor: "#FFA500"}}
            >
              Log In
            </button>
            <button
              type="button"
              onClick={handleSignUp}
              className="w-full py-4 text-black rounded-lg transition-colors font-semibold text-[28px] shadow-lg"
              style={{ backgroundColor: "#FFA500" }}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
