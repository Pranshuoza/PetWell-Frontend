import { Routes, Route } from "react-router-dom";
import Landing from "./Pages/Landing/Landing";
import ProfileCreationStep1 from "./Pages/Authentication/ProfileCreation/ProfileCreationStep1";
import "./App.css";
import Home from "./Pages/PetParentHomePage/HomePage";
import UploadDocuments from "./Pages/PetParentUploadDocuments/UploadDocumentsPage";
import VerificationPage from "./Pages/PetParentUploadDocuments/VerificationPage";
import VaccinesPage from "./Pages/PetParentVaccine/VaccinesPage";
import DownloadSelectPage from "./Pages/PetParentVaccine/DownloadSelectPage";
import AddVaccinePage from "./Pages/PetParentVaccine/AddVaccinePage";
import DocumentPage from "./Pages/PetParentDocumentPage.tsx/DocumentPage";
import TeamsPage from "./Pages/PetParentTeamPage/TeamsPage";
import AddTeamPage from "./Components/Teams/AddTeamPage";
import LoginPage from "./Pages/Authentication/LoginPage";
import PetProfile from "./Pages/PetParentHomePage/PetProfile";
import SwitchProfilePage from "./Pages/PetParentHomePage/SwitchProfilePage";
import ForgotPasswordPage from "./Pages/Authentication/ForgotPasswordPage";
import SignupTypeSelectPage from "./Pages/Authentication/SignupTypeSelectPage";
import PetParentSignupPage from "./Pages/Authentication/PetParentSignupPage";
// import StaffSignupPage from "./Pages/Authentication/StaffSignupPage";
// import BusinessSignupPage from "./Pages/Authentication/BusinessSignupPage";

function App() {
  return (
    <div className="min-h-screen">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/profile-creation" element={<ProfileCreationStep1 />} />
        <Route path="/signup-type" element={<SignupTypeSelectPage />} />
        <Route path="/signup/pet-parent" element={<PetParentSignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
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
