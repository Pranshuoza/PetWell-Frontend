import { Routes, Route } from "react-router-dom";
import Landing from "./Pages/Landing/Landing";
import ProfileCreation from "./Pages/Authentication/ProfileCreation/ProfileCreation";
import "./App.css";
import HomePage from "./Pages/PetParentHomePage/HomePage";
import UploadDocuments from "./Pages/PetParentDocumentPage/UploadDocumentsPage";
import VerificationPage from "./Pages/Authentication/ProfileCreation/VerificationPage";
import VaccinesPage from "./Pages/PetParentVaccine/VaccinesPage";
import DownloadSelectPage from "./Pages/PetParentVaccine/DownloadSelectPage";
import AddVaccinePage from "./Pages/PetParentVaccine/AddVaccinePage";
import DocumentPage from "./Pages/PetParentDocumentPage/DocumentPage";
import TeamsPage from "./Pages/PetParentTeamPage/TeamsPage";
import AddTeamPage from "./Components/Teams/AddTeamPage";
import LoginPage from "./Pages/Authentication/LoginPage";
import PetProfile from "./Pages/Profile/PetProfile";
import SwitchProfilePage from "./Pages/Profile/SwitchProfilePage";
import ForgotPasswordPage from "./Pages/Authentication/ForgotPasswordPage";
import SignupTypeSelectPage from "./Pages/Authentication/SignupTypeSelectPage";
import PetParentSignupPage from "./Pages/Authentication/ProfileCreation/PetParentSignupPage";
import AddPetProfile from "./Pages/Authentication/ProfileCreation/AddPetProfile";
// import StaffSignupPage from "./Pages/Authentication/StaffSignupPage";
// import BusinessSignupPage from "./Pages/Authentication/BusinessSignupPage";

function App() {
  return (
    <div className="min-h-screen">
      <Routes>
        {/* Authentication Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/profile-creation" element={<ProfileCreation />} />
        <Route path="/signup-type" element={<SignupTypeSelectPage />} />
        <Route path="/signup/pet-parent" element={<PetParentSignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/verify" element={<VerificationPage />} />
        <Route path="/add-pet-profile" element={<AddPetProfile />} />

        {/* Pet Owner Routes with new format */}
        <Route path="/petowner/pet/:petId/home" element={<HomePage />} />
        <Route path="/petowner/pet/:petId/vaccine" element={<VaccinesPage />} />
        <Route path="/petowner/pet/:petId/documents" element={<DocumentPage />}/>
        <Route path="/petowner/pet/:petId/team" element={<TeamsPage />} />
        <Route path="/petowner/pet/:petId/add-vaccine" element={<AddVaccinePage />}/>
        <Route path="/petowner/pet/:petId/upload" element={<UploadDocuments />}/>
        <Route path="/petowner/pet/:petId/add-team" element={<AddTeamPage />} />
        <Route path="/petowner/pet/:petId/profile" element={<PetProfile />} />
        <Route path="/petowner/pet/:petId/download-select" element={<DownloadSelectPage />}/>

        {/* Profile Management Routes */}
        <Route path="/switch-profile" element={<SwitchProfilePage />} />
      </Routes>
    </div>
  );
}

export default App;
