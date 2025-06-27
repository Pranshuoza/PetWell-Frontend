import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UploadDocument from "../../Components/UploadDocument/UploadDocuments";
import Loader from "../../Components/ui/Loader";
import Navbar from "../../Components/Layout/Navbar";
import petServices from "../../Services/petServices";

const UploadDocuments: React.FC = () => {
  const navigate = useNavigate();
  const [showLoader, setShowLoader] = React.useState(false);
  const [petId, setPetId] = useState<string>("");

  // Fetch petId (like in AddVaccinePage)
  useEffect(() => {
    const fetchPet = async () => {
      try {
        let petsRes = await petServices.getPetsByOwner();
        let petsArr = Array.isArray(petsRes) ? petsRes : petsRes.data;
        console.log("petsArr:",petsArr)
        if (!petsArr) petsArr = [];
        if (!Array.isArray(petsArr)) petsArr = [petsArr];
        if (petsArr.length > 0) {
          setPetId(petsArr[0].id);
        }
      } catch {
        // handle error
      }
    };
    fetchPet();
  }, []);

  // Handler to upload a document
  const handleUpload = async (
    file: File,
    meta: { name: string; type: string }
  ) => {
    if (!petId) {
      console.warn("[Upload] No petId available, skipping upload.");
      return;
    }
    const payload = {
      document_name: meta.name,
      document_type: "Medical",
      file_type: meta.type.toUpperCase(),
      description: "Pet medical record",
      file,
    };
    try {
      console.debug("[Upload] Calling createDocument API", { petId, payload });
      await petServices.createDocument(petId, payload);
      console.debug("[Upload] Document uploaded successfully", meta.name);
    } catch (err) {
      console.error("[Upload] Error uploading document", err);
      throw err;
    }
  };

  return (
    <div className="min-h-screen w-screen font-sans flex flex-col items-center bg-[#101624] text-[#EBD5BD]">
      <Navbar
      />
      {/* Profile Image and Back Button */}
      <div className="mt-16 flex flex-col items-center w-full relative">
        <button
          className="absolute left-0 top-0 flex items-center gap-1 text-[#EBD5BD] hover:text-[#FFA500] text-base font-semibold px-2 py-1 rounded transition border border-transparent hover:border-[#FFA500] z-10"
          style={{ marginLeft: 32 }}
          onClick={() => navigate(-1)}
          aria-label="Back"
        >
          <span className="text-xl">&#8592;</span> Back
        </button>
        <img
          src="https://randomuser.me/api/portraits/men/32.jpg"
          alt="Profile"
          className="w-28 h-28 rounded-full object-cover border-4 border-[#EBD5BD] shadow-lg mt-4"
        />
        <h1 className="mt-6 text-4xl font-bold text-[#EBD5BD]">
          Upload documents for Syd
        </h1>
        <p className="mt-2 text-lg text-[#EBD5BD] opacity-80 max-w-xl text-center">
          Keep your pet's records safe and accessible — from vaccine
          certificates to vet bills.
        </p>
      </div>
      {/* UploadDocument component handles upload logic and UI */}
      {showLoader && <Loader />}
      <UploadDocument
        onUpload={handleUpload}
        onNext={() => {
          setShowLoader(true);
          setTimeout(() => {
            setShowLoader(false);
            navigate("/documents");
          }, 2000);
        }}
      />
    </div>
  );
};

export default UploadDocuments;
