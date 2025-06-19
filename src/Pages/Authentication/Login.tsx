import React from 'react';
import LoginPage from '../../Assets/LoginPage.png';

const Login: React.FC = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login attempted with:", email, password);
    // Add your login logic here (e.g., API call)
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-cover bg-center" style={{ backgroundImage: `url(${LoginPage})` }}>
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 p-6 bg-gray-800 bg-opacity-90 rounded-lg shadow-lg">
        <div className="flex justify-center mb-4">
          <span className="text-white text-4xl font-bold">PetWell</span>
        </div>
        <p className="text-center text-white mb-6">We love you for loving your pets</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full p-2 rounded bg-gray-700 text-white placeholder-gray-400"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full p-2 rounded bg-gray-700 text-white placeholder-gray-400"
          />
          <button
            type="submit"
            className="w-full py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
          >
            Log In
          </button>
          <button
            type="button"
            className="w-full py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;