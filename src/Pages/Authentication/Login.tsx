import React from "react";
import LoginPage from "../../Assets/LoginPage.png";

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
      <div className="relative z-10 w-full max-w-md mx-4">
        <div className="bg-gray-900 bg-opacity-95 rounded-2xl p-8 shadow-2xl">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4">
              <div className="w-10 h-10 border-4 border-gray-800 rounded-full relative">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-gray-800 rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Title */}
          <div className="text-center mb-2">
            <h1 className="text-4xl font-bold text-white mb-2">PetWell</h1>
            <p className="text-gray-300 text-lg italic">
              We love you for loving your pets
            </p>
          </div>
          <div className="space-y-4 pt-8">
            <button
              type="button"
              onClick={handleLogin}
              className="w-full py-4 text-white rounded-lg transition-colors font-semibold text-lg shadow-lg"
              style={{ backgroundColor: "#FFA500" }}
            >
              Log In
            </button>
            <button
              type="button"
              onClick={handleSignUp}
              className="w-full py-4 text-white rounded-lg transition-colors font-semibold text-lg shadow-lg"
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
