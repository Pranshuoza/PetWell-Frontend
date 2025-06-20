import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Components/Navbar";

const vaccineOptions = [
  "K9 DA2PPV 3 Year (VANGUARD)",
  "Heartgard Plus",
  "K9 Leptospira Vaccine 1 Year",
];
const doctorOptions = ["Dr. John Doe", "Dr. Jane Smith", "Dr. Emily Brown"];

const AddVaccinePage: React.FC = () => {
  const navigate = useNavigate();
  const [vaccine, setVaccine] = useState("");
  const [administered, setAdministered] = useState("");
  const [expiry, setExpiry] = useState("");
  const [doctor, setDoctor] = useState("");
  const [verified, setVerified] = useState(false);

  return (
    <div className="min-h-screen w-screen bg-[#101624] text-[#EBD5BD] font-sans">
      <Navbar
        userName="Syd"
        userImage="https://randomuser.me/api/portraits/men/32.jpg"
      />
      <div className="max-w-lg mx-auto pt-8 pb-12 flex flex-col items-center">
        <button
          className="text-[#FFA500] text-md mb-4 flex items-center hover:underline bg-transparent self-start"
          onClick={() => navigate(-1)}
        >
          <span className="mr-2">&lt; Go Back</span>
        </button>
        <div className="flex flex-col items-center w-full">
          <svg
            className="w-14 h-14 mb-2 text-[#EBD5BD]"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M18.364 5.636l-1-1m0 0a2 2 0 00-2.828 0l-1.415 1.414a2 2 0 000 2.828l1 1m2.243-2.243l-9.9 9.9a2 2 0 002.828 2.828l9.9-9.9m-2.243 2.243l1 1m-1-1l-1-1"
            />
            <circle cx="19" cy="5" r="2" fill="#FFA500" />
            <text
              x="18.5"
              y="6.5"
              textAnchor="middle"
              fontSize="1.2rem"
              fill="#fff"
              fontWeight="bold"
            >
              +
            </text>
          </svg>
          <h1 className="text-3xl font-serif font-bold mb-2">Add Vaccine</h1>
          <p className="text-lg opacity-80 mb-8 text-center">
            Start by uploading a document or fill in the vaccine info manually.
          </p>
        </div>
        <div className="w-full flex flex-col items-center">
          {/* Upload Card */}
          <div className="w-full max-w-md bg-[#232b3e] rounded-2xl shadow-xl p-8 flex flex-col items-center mb-4">
            <label
              htmlFor="vaccine-upload"
              className="flex flex-col items-center cursor-pointer w-full"
            >
              <svg
                className="w-8 h-8 mb-2 text-[#EBD5BD]"
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
              <span className="text-lg text-[#EBD5BD] font-medium mb-1">
                Upload vaccine document
              </span>
              <span className="text-sm text-[#EBD5BD] opacity-70 mb-2">
                Supported formats: PDF, JPG, PNG, DOC.
              </span>
              <input
                id="vaccine-upload"
                type="file"
                className="hidden"
                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
              />
            </label>
          </div>
          <div className="w-full flex items-center my-4">
            <div className="flex-1 h-px bg-[#232b3e]" />
            <span className="mx-4 text-[#EBD5BD] opacity-70">Or</span>
            <div className="flex-1 h-px bg-[#232b3e]" />
          </div>
          {/* Form */}
          <form className="w-full flex flex-col gap-4">
            <div>
              <label className="block text-[#EBD5BD] text-sm mb-1">
                Vaccine Name
              </label>
              <select
                className="w-full rounded-lg px-4 py-2 bg-[#181f32] text-[#EBD5BD] border border-[#232b41] mb-2 appearance-none"
                value={vaccine}
                onChange={(e) => setVaccine(e.target.value)}
              >
                <option value="">Select Vaccine</option>
                {vaccineOptions.map((v, i) => (
                  <option key={i} value={v}>
                    {v}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-[#EBD5BD] text-sm mb-1">
                Date Administered
              </label>
              <input
                className="w-full rounded-lg px-4 py-2 bg-[#181f32] text-[#EBD5BD] border border-[#232b41] mb-2"
                type="date"
                value={administered}
                onChange={(e) => setAdministered(e.target.value)}
                placeholder="Select Date"
              />
            </div>
            <div>
              <label className="block text-[#EBD5BD] text-sm mb-1">
                Expiry Date
              </label>
              <input
                className="w-full rounded-lg px-4 py-2 bg-[#181f32] text-[#EBD5BD] border border-[#232b41] mb-2"
                type="date"
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
                placeholder="Select Date"
              />
            </div>
            <div>
              <label className="block text-[#EBD5BD] text-sm mb-1">
                Administered By
              </label>
              <select
                className="w-full rounded-lg px-4 py-2 bg-[#181f32] text-[#EBD5BD] border border-[#232b41] mb-2 appearance-none"
                value={doctor}
                onChange={(e) => setDoctor(e.target.value)}
              >
                <option value="">Select Doctor</option>
                {doctorOptions.map((d, i) => (
                  <option key={i} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-start gap-2 mt-2">
              <input
                type="checkbox"
                className="mt-1 accent-[#FFA500]"
                id="verify-checkbox"
                checked={verified}
                onChange={(e) => setVerified(e.target.checked)}
              />
              <label
                htmlFor="verify-checkbox"
                className="text-[#EBD5BD] text-xs"
              >
                By selecting this box, I verify that the information here is
                correct and verifiable by a third party if needed.
              </label>
            </div>
            <div className="flex justify-between gap-4 mt-6">
              <button
                type="button"
                className="flex-1 py-3 rounded-lg border border-[#FFA500] text-[#FFA500] font-semibold text-lg hover:bg-[#FFA500] hover:text-white transition bg-transparent"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-3 rounded-lg bg-[#FFA500] text-white font-semibold text-lg hover:brightness-110 transition"
              >
                Add Vaccine
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddVaccinePage;
