import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PetWellLogo from "../../Assets/PetWell.png";
import authServices from "../../Services/authServices";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await authServices.login({ email, password });
      setLoading(false);
      navigate("/home");
    } catch (err: any) {
      setLoading(false);
      setError(err.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#1C232E] via-[#23272f] to-[#23272f] w-full">
      <div className="flex flex-col items-center mb-8">
        <img
          src={PetWellLogo}
          alt="PetWell Logo"
          className="w-20 h-20 object-contain mb-2 drop-shadow-lg"
        />
        <h1 className="text-4xl font-[Alike,serif] text-[#EBD5BD] font-bold tracking-tight">
          PetWell
        </h1>
        <p className="text-[#EBD5BD] text-opacity-70 text-base mt-1 font-[Cabin,sans-serif]">
          We love you for loving your pets
        </p>
      </div>
      <div className="bg-[#23272f] rounded-2xl shadow-2xl px-10 py-10 flex flex-col items-center w-[400px] max-w-full border border-[#2d3648]">
        <h2 className="text-2xl font-[Alike,serif] text-[#EBD5BD] mb-6 text-center font-semibold">
          Sign in to your account
        </h2>
        {error && (
          <div className="w-full mb-4 text-center text-red-400 bg-red-900/30 rounded py-2 px-3 text-sm animate-fade-in">
            {error}
          </div>
        )}
        <form
          className="w-full flex flex-col gap-5"
          onSubmit={handleSubmit}
          autoComplete="on"
        >
          <div>
            <label
              className="block text-[#EBD5BD] text-base mb-2 font-medium"
              htmlFor="email"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md px-4 py-3 text-base bg-[#23272f] border border-[#3a4152] text-[#EBD5BD] placeholder-[#EBD5BD]/60 focus:outline-none focus:ring-2 focus:ring-[#FFB23E] transition"
              placeholder="Enter your email"
              required
              autoFocus
            />
          </div>
          <div className="relative">
            <label
              className="block text-[#EBD5BD] text-base mb-2 font-medium"
              htmlFor="password"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md px-4 py-3 text-base bg-[#23272f] border border-[#3a4152] text-[#EBD5BD] placeholder-[#EBD5BD]/60 focus:outline-none focus:ring-2 focus:ring-[#FFB23E] transition"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full mt-2 py-3 rounded-md bg-[#FFB23E] text-black text-lg font-semibold font-[Cabin,sans-serif] hover:bg-[#ffb733] transition-colors flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading && (
              <svg
                className="animate-spin mr-2"
                width="20"
                height="20"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="#23272f"
                  strokeWidth="4"
                  opacity="0.2"
                />
                <path
                  d="M22 12a10 10 0 0 1-10 10"
                  stroke="#FFB23E"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            )}
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>
        <div className="w-full flex justify-between mt-6 text-sm text-[#EBD5BD] text-opacity-70">
          <button
            className="hover:text-[#FFB23E] transition-colors"
            type="button"
            onClick={() => alert("Forgot password flow coming soon!")}
          >
            Forgot password?
          </button>
          <button
            className="hover:text-[#FFB23E] transition-colors"
            type="button"
            onClick={() => navigate("/signup")}
          >
            Create account
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
