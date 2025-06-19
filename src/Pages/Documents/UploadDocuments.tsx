import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
// import { FaUpload, FaPencilAlt } from "react-icons/fa";
import PetWellLogo from "../../Assets/PetWell.png";
import Loader from "../../Components/Loader";


const UploadDocuments: React.FC = () => {
  const [uploads, setUploads] = useState<
    { name: string; size: string; type: string; progress: number }[]
  >([]);
//   const [, setEditingIdx] = useState<number | null>(null);
//   const [editValue, setEditValue] = useState("");
  const [showLoader, setShowLoader] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleRemove = (index: number) => {
    setUploads(uploads.filter((_, i) => i !== index));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; // Accept only one file
    if (!file) return;

    const ext = file.name.split(".").pop()?.toLowerCase();
    const newUpload = {
      name: file.name,
      size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
      type:
        ext === "pdf"
          ? "pdf"
          : ext === "jpg" || ext === "jpeg" || ext === "png"
          ? "img"
          : "other",
      progress: 0,
    };

    // Add the file once
    setUploads((prev) => [...prev, newUpload]);
    const uploadIndex = uploads.length; // The index of the new file

    // Simulate upload progress for the single file
    let prog = 0;
    const interval = setInterval(() => {
      prog += 10;
      setUploads((prev) => {
        // Update the progress of the last file only
        return prev.map((item, idx) =>
          idx === uploadIndex
            ? { ...item, progress: Math.min(prog, 100) }
            : item
        );
      });
      if (prog >= 100) clearInterval(interval);
    }, 200);

    if (fileInputRef.current) fileInputRef.current.value = "";
  };

//   const handleEdit = (idx: number, currentName: string) => {
//     setEditingIdx(idx);
//     setEditValue(currentName);
//   };

//   const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setEditValue(e.target.value);
//   };

//   const handleEditBlur = (idx: number) => {
//     if (editValue.trim() !== "") {
//       setUploads((prev) =>
//         prev.map((item, i) => (i === idx ? { ...item, name: editValue } : item))
//       );
//     }
//     setEditingIdx(null);
//   };

//   const handleEditKeyDown = (
//     e: React.KeyboardEvent<HTMLInputElement>,
//     idx: number
//   ) => {
//     if (e.key === "Enter") {
//       handleEditBlur(idx);
//     } else if (e.key === "Escape") {
//       setEditingIdx(null);
//     }
//   };

  return (
    <div className="min-h-screen w-screen font-sans flex flex-col items-center bg-[#101624] text-[#EBD5BD]">
      {showLoader && <Loader />}
      {/* Logo */}
      <div className="absolute left-10 top-8">
        <img
          src={PetWellLogo}
          alt="PetWell Logo"
          className="w-12 h-12 object-contain"
        />
      </div>
      {/* Profile Image */}
      <div className="mt-16 flex flex-col items-center">
        <img
          src="https://randomuser.me/api/portraits/men/32.jpg"
          alt="Profile"
          className="w-28 h-28 rounded-full object-cover border-4 border-[#EBD5BD] shadow-lg"
        />
        <h1 className="mt-8 text-4xl font-bold text-[#EBD5BD]">
          Upload documents for Syd
        </h1>
        <p className="mt-2 text-lg text-[#EBD5BD] opacity-80 max-w-xl text-center">
          Keep your pet’s records safe and accessible — from vaccine
          certificates to vet bills.
        </p>
      </div>
      {/* Upload Card */}
      {uploads.length === 0 && (
        <div className="flex flex-col items-center w-full mt-12">
          <div className="mx-auto w-full max-w-xl bg-[#232b3e] rounded-2xl shadow-xl p-10 flex flex-col items-center">
            <label
              htmlFor="file-upload"
              className="flex flex-col items-center cursor-pointer"
            >
              <svg
                className="w-10 h-10 mb-2 text-[#EBD5BD]"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5-5m0 0l5 5m-5-5v12"
                />
              </svg>
              <span className="text-xl font-medium text-[#EBD5BD]">
                Upload a document
              </span>
              <input
                id="file-upload"
                type="file"
                className="hidden"
                onChange={handleFileChange}
                multiple
                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                ref={fileInputRef}
              />
            </label>
            <span className="mt-3 text-sm text-[#EBD5BD] opacity-70">
              Supported formats: PDF, JPG, PNG, DOC.
            </span>
          </div>
        </div>
      )}
      {/* Upload List */}
      {uploads.length > 0 && (
        <div className="flex flex-col items-center w-full mt-8">
          <div className="mx-auto w-full max-w-2xl bg-[#232b3e] rounded-2xl shadow-xl p-10">
            {uploads.map((file, idx) => (
              <div key={idx} className="mb-6">
                <div className="flex items-center mb-1">
                  <div
                    className={`w-8 h-8 flex items-center justify-center rounded-full mr-3 ${
                      file.type === "pdf" ? "bg-red-600" : "bg-green-600"
                    }`}
                  >
                    {file.type === "pdf" ? (
                      <span className="text-white font-bold">PDF</span>
                    ) : (
                      <span className="text-white font-bold">IMG</span>
                    )}
                  </div>
                  <span className="flex-1 truncate text-base font-medium text-[#EBD5BD]">
                    {file.name}
                  </span>
                  <span className="mx-2 text-[#EBD5BD] text-sm opacity-80">
                    {file.size}
                  </span>
                  <button
                    onClick={() => handleRemove(idx)}
                    className="ml-2 text-[#EBD5BD] hover:text-red-500 text-xl"
                  >
                    ×
                  </button>
                </div>
                <div className="flex items-center mb-1">
                  <span className="text-sm text-[#EBD5BD] opacity-80 mr-2">
                    Uploading ({file.progress}%)
                  </span>
                  <div className="flex-1 h-1 bg-[#181f32] rounded-full overflow-hidden">
                    <div
                      className="h-1 bg-[#FFA500]"
                      style={{ width: `${file.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Action Buttons */}
          <div className="flex justify-center gap-8 mt-8 w-full max-w-2xl">
            <label className="flex-1 py-3 rounded-lg bg-transparent border border-[#FFA500] text-[#FFA500] font-semibold text-lg hover:bg-[#FFA500] hover:text-white transition flex items-center justify-center cursor-pointer">
              Upload More Documents
              <input
                ref={fileInputRef}
                type="file"
                multiple
                className="hidden"
                onChange={handleFileChange}
                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
              />
            </label>
            <button
              className="flex-1 py-3 rounded-lg bg-[#FFA500] text-white font-semibold text-lg hover:brightness-110 transition"
              onClick={() => {
                setShowLoader(true);
                setTimeout(() => {
                  navigate("/verify");
                }, 2000); // Simulate fetch delay
              }}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadDocuments;
