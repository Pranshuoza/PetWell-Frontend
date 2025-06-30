import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../../../Components/ui/Loader";
import UploadDocument from "../../../Components/UploadDocument/UploadDocuments";
import PetWellLogo from "../../../Assets/PetWell.png";
import autofillServices from "../../../Services/autofillServices";

const PetParentSignupPage: React.FC = () => {
  const navigate = useNavigate();
  const [showLoader, setShowLoader] = useState(false);
  const [parsing, setParsing] = useState(false);

  // Handler to upload a document (dummy for now, can be wired to autofillServices)
  const handleUpload = async (
    file: File,
    meta: { name: string; type: string }
  ) => {
    setShowLoader(true);
    setParsing(true);
    try {
      await autofillServices.createPetFromDocuments([file]);
      // Only after parsing is done, allow navigation
      setShowLoader(false);
      setParsing(false);
      navigate("/verify");
    } catch (err) {
      setShowLoader(false);
      setParsing(false);
      // Optionally show error
      alert("Failed to parse document. Please try again.");
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#181f27] text-[var(--color-text)] font-sans flex flex-col items-center justify-center relative">
      {showLoader && <Loader />}
      {/* Logo */}
      <div className="absolute left-10 top-8">
        <img
          src={PetWellLogo}
          alt="PetWell Logo"
          className="w-16 h-16 object-contain"
        />
      </div>
      <div className="flex flex-col items-center justify-center w-full ">
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-[var(--color-heading)] mb-4 text-center">
          Got a vaccine card or medical record handy?
        </h1>
        <p className="text-lg text-[var(--color-label)] text-center max-w-2xl">
          Just upload it — we’ll use it to build your pet’s profile for you.
          <br />
          You can edit or add more info later.
        </p>
        <UploadDocument onUpload={handleUpload} onNext={undefined} />
        <div className="mt-2 text-center">
          <span className="text-[var(--color-label)] text-lg">
            Prefer to enter details yourself?{" "}
          </span>
          <button
            className="text-[var(--color-primary)] font-semibold hover:underline text-lg bg-transparent border-none p-0 m-0 align-baseline"
            onClick={() => navigate("/profile-creation")}
          >
            Enter Manually
          </button>
        </div>
      </div>
    </div>
  );
};

export default PetParentSignupPage;
