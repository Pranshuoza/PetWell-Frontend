import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UploadCloud } from "lucide-react";
import UploadList from "../../Components/UploadDocument/UploadList";
import Loader from "../../Components/ui/Loader";
import PetWellLogo from "../../Assets/PetWell.png";

interface Upload {
  name: string;
  size: string;
  type: string;
  progress: number;
}

const PetParentSignupPage: React.FC = () => {
  const navigate = useNavigate();
  const [uploads, setUploads] = useState<Upload[]>([]);
  const [showLoader, setShowLoader] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Helper to format file size
  const formatSize = (size: number) => {
    if (size < 1024) return `${size} B`;
    if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
    return `${(size / (1024 * 1024)).toFixed(1)} MB`;
  };

  // Simulate upload progress
  const simulateUpload = (index: number) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 20) + 10;
      setUploads((prev) => {
        const updated = [...prev];
        updated[index] = {
          ...updated[index],
          progress: Math.min(progress, 100),
        };
        return updated;
      });
      if (progress >= 100) clearInterval(interval);
    }, 300);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const newUploads: Upload[] = Array.from(files).map((file) => ({
      name: file.name,
      size: formatSize(file.size),
      type:
        file.type.includes("pdf") || file.name.endsWith(".pdf") ? "pdf" : "img",
      progress: 0,
    }));
    setUploads((prev) => [...prev, ...newUploads]);
    // Simulate upload for each new file
    const startIdx = uploads.length;
    newUploads.forEach((_, i) => simulateUpload(startIdx + i));
    // Reset input value so same file can be uploaded again if needed
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleRemove = (index: number) => {
    setUploads((prev) => prev.filter((_, i) => i !== index));
  };

  const handleNext = () => {
    setShowLoader(true);
    setTimeout(() => {
      setShowLoader(false);
      navigate("/verify");
    }, 1200);
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
        <p className="text-lg text-[var(--color-label)] mb-10 text-center max-w-2xl">
          Just upload it — we’ll use it to build your pet’s profile for you.
          <br />
          You can edit or add more info later.
        </p>
        {uploads.length === 0 ? (
          <div className="mx-auto w-full max-w-xl bg-[var(--color-card)] rounded-2xl shadow-xl p-10 flex flex-col items-center mb-8">
            <label
              htmlFor="file-upload"
              className="flex flex-col items-center cursor-pointer"
            >
              <UploadCloud className="w-10 h-10 mb-2 text-[var(--color-primary)]" />
              <span className="text-xl font-medium text-[var(--color-text)]">
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
            <span className="mt-3 text-sm text-[var(--color-text)] opacity-70">
              Supported formats: PDF, JPG, PNG, DOC.
            </span>
          </div>
        ) : (
          <UploadList
            uploads={uploads}
            onRemove={handleRemove}
            onFileChange={handleFileChange}
            onNext={handleNext}
            fileInputRef={fileInputRef}
            showLoader={showLoader}
          />
        )}
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
