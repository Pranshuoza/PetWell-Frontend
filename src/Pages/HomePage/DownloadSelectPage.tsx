import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Components/Navbar";
import VaccineInfo from "../../Components/VaccineInfo";

const vaccines = [
  {
    name: "K9 DA2PPV 3 Year (VANGUARD)",
    administered: "4/15/23",
    expires: "In 3 days",
    soon: true,
    warning: "Syd is due for the vaccine soon. Schedule now!",
  },
  {
    name: "Heartgard Plus",
    administered: "4/15/23",
    expires: "4/16/25",
  },
  {
    name: "K9 Leptospira Vaccine 1 Year",
    administered: "4/15/23",
    expires: "4/16/25",
  },
  {
    name: "Heartgard Plus",
    administered: "4/15/23",
    expires: "4/16/25",
  },
  {
    name: "K9 Leptospira Vaccine 1 Year",
    administered: "4/15/23",
    expires: "4/16/25",
  },
  {
    name: "K9 DA2PPV 3 Year (VANGUARD)",
    administered: "4/15/23",
    expires: "In 3 days",
    soon: true,
    warning: "Syd is due for the vaccine soon. Schedule now!",
  },
];

const DownloadSelectPage: React.FC = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<number[]>([]);

  const allSelected = selected.length === vaccines.length;

  const toggleSelect = (idx: number) => {
    setSelected((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  const selectAll = () => {
    setSelected(allSelected ? [] : vaccines.map((_, idx) => idx));
  };

  return (
    <div className="min-h-screen w-screen bg-[#101624] text-[#EBD5BD] font-sans">
      <Navbar
        userName="Syd"
        userImage="https://randomuser.me/api/portraits/men/32.jpg"
      />
      <div className="max-w-7xl mx-auto px-12 pt-4 pb-12">
        <button
          className="text-[#FFA500] text-md mb-4 flex items-center hover:underline bg-transparent"
          onClick={() => navigate(-1)}
        >
          <span className="mr-2">&lt; Go Back</span>
        </button>
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-serif font-bold mt-2">
            Select the records you want to download
          </h1>
          <button
            className="py-2 px-6 rounded-lg bg-[#FFA500] text-[#232b3e] font-semibold text-lg hover:bg-[#ffb733] transition flex items-center justify-center shadow-lg"
            disabled={selected.length === 0}
          >
            <span className="mr-2">↓</span> Download Selected Records
          </button>
        </div>
        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            checked={allSelected}
            onChange={selectAll}
            className="accent-[#FFA500] w-4 h-4 mr-2"
            id="selectAll"
          />
          <label
            htmlFor="selectAll"
            className="text-[#FFA500] font-semibold cursor-pointer"
          >
            Select All Records
          </label>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {vaccines.map((vaccine, idx) => (
            <div
              key={idx}
              className="relative group bg-[#232b3e] rounded-xl p-6 shadow-md min-h-[180px] flex flex-col justify-between"
            >
              <input
                type="checkbox"
                checked={selected.includes(idx)}
                onChange={() => toggleSelect(idx)}
                className="absolute top-4 right-4 accent-[#FFA500] w-5 h-5"
                aria-label="Select Vaccine"
              />
              <VaccineInfo
                name={vaccine.name}
                administered={vaccine.administered}
                expires={vaccine.expires}
                soon={vaccine.soon}
              />
              {vaccine.soon && (
                <div className="mt-4 text-sm text-[#FFA500] flex items-center">
                  <span className="mr-2">❗</span>
                  <span>{vaccine.warning}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DownloadSelectPage;
