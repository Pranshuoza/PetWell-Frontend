import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Pages/Landing/Landing";
import "./App.css";
import Home from "./Pages/HomePage/HomePage";

function App() {
  return (
    <div className="min-h-screen">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;