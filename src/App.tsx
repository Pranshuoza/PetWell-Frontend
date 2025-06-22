import { Routes, Route } from "react-router-dom";
import Landing from "./Pages/Landing/Landing";
import ProfileCreationStep1 from "./Pages/Authentication/ProfileCreationStep1";
import "./App.css";
import Home from "./Pages/HomePage/HomePage";
import UploadDocuments from "./Pages/UploadDocuments/UploadDocumentsPage";
import VerificationPage from "./Pages/UploadDocuments/VerificationPage";
import VaccinesPage from "./Pages/Vaccine/VaccinesPage";
import DownloadSelectPage from "./Pages/Vaccine/DownloadSelectPage";
import AddVaccinePage from "./Pages/Vaccine/AddVaccinePage";
import DocumentPage from "./Pages/HomePage/DocumentPage";
import TeamsPage from "./Pages/HomePage/TeamsPage";
import AddTeamPage from "./Components/Teams/AddTeamPage";
import LoginPage from "./Pages/Authentication/LoginPage";
import PetProfile from "./Pages/HomePage/PetProfile";
import SwitchProfilePage from "./Pages/HomePage/SwitchProfilePage";

function App() {
  return (
    <div className="min-h-screen">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<ProfileCreationStep1 />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/vaccine" element={<VaccinesPage />} />
        <Route path="/documents" element={<DocumentPage />} />
        <Route path="/download-select" element={<DownloadSelectPage />} />
        <Route path="/add-vaccine" element={<AddVaccinePage />} />
        <Route path="/upload" element={<UploadDocuments />} />
        <Route path="/verify" element={<VerificationPage />} />
        <Route path="/team" element={<TeamsPage />} />
        <Route path="/add-team" element={<AddTeamPage />} />
        <Route path="/pet-profile" element={<PetProfile />} />
        <Route path="/switch-profile" element={<SwitchProfilePage />} />
      </Routes>
    </div>
  );
}

export default App;