import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Pages/Landing/Landing";
import ProfileCreationStep1 from "./Pages/Authentication/ProfileCreationStep1";
import "./App.css";

function App() {
  return (
    <div className="min-h-screen">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<ProfileCreationStep1 />} />
      </Routes>
    </div>
  );
}

export default App;