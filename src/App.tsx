import { Routes, Route } from "react-router-dom";
import Landing from "./Pages/Landing/Landing";
import ProfileCreationStep1 from "./Pages/Authentication/ProfileCreationStep1";
import "./App.css";
import Home from "./Pages/HomePage/HomePage";
import UploadDocuments from "./Pages/Documents/UploadDocuments";
import VerificationPage from "./Pages/Documents/VerificationPage";

function App() {
  return (
    <div className="min-h-screen">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<ProfileCreationStep1 />} />
        <Route path="/home" element={<Home />} />
        <Route path="/upload" element={<UploadDocuments />} />
        <Route path="/verify" element={<VerificationPage />} />
      </Routes>
    </div>
  );
}

export default App;
