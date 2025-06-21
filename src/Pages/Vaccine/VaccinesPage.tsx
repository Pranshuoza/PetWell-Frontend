import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Components/Layout/Navbar";
import VaccineInfo from "../../Components/Vaccine/VaccineInfo";
import EditVaccineModal from "../../Components/Vaccine/EditVaccineModal";

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

const VaccinesPage: React.FC = () => {
  const [editIdx, setEditIdx] = useState<number | null>(null);
  const navigate = useNavigate();
  return (
    <div className="min-h-screen w-full bg-[var(--color-background)] text-[var(--color-text)] font-sans">
      <Navbar
        userName="Syd"
        userImage="https://randomuser.me/api/portraits/men/32.jpg"
      />
      <div className="container max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <h1 className="text-2xl font-serif font-bold mt-2">Syd's Vaccines</h1>
          <div className="flex gap-4">
            <button
              className="py-2 px-4 rounded-lg border border-[var(--color-primary)] text-[var(--color-primary)] font-semibold text-lg hover:bg-[var(--color-primary)] hover:text-[var(--color-background)] transition flex items-center justify-center bg-transparent"
              onClick={() => navigate("/download-select")}
            >
              <span className="mr-2">↓</span> Download Vaccine Records
            </button>
            <button
              className="py-2 px-4 rounded-lg border border-[var(--color-primary)] text-[var(--color-primary)] font-semibold text-lg hover:bg-[var(--color-primary)] hover:text-[var(--color-background)] transition flex items-center justify-center bg-transparent"
              onClick={() => navigate("/add-vaccine")}
            >
              <span className="mr-2">+</span> Add New Vaccine
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {vaccines.map((vaccine, idx) => (
            <VaccineInfo
              key={idx}
              name={vaccine.name}
              administered={vaccine.administered}
              expires={vaccine.expires}
              soon={vaccine.soon}
              warning={vaccine.warning}
              showEdit={true}
              onEdit={() => setEditIdx(idx)}
            />
          ))}
        </div>
        {editIdx !== null && (
          <EditVaccineModal
            open={editIdx !== null}
            onClose={() => setEditIdx(null)}
            vaccine={vaccines[editIdx]}
          />
        )}
      </div>
    </div>
  );
};

export default VaccinesPage;
