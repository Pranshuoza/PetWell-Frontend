import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Pages/Landing/Landing";
import "./App.css";

function App() {
  return (
    <div className="min-h-screen">
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;