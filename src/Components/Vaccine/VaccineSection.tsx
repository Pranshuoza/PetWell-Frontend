import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import VaccineInfo from "./VaccineInfo";
import EditVaccineModal from "./EditVaccineModal";

interface Vaccine {
  name: string;
  administered: string;
  expires: string;
  soon?: boolean;
  warning?: string;
}

interface VaccineBoxProps {
  vaccines: Vaccine[];
}

const VaccineSection: React.FC<VaccineBoxProps> = ({ vaccines }) => {
  const [editIdx, setEditIdx] = useState<number | null>(null);
  const navigate = useNavigate();

  const handleAddVaccine = () => {
    navigate("/add-vaccine");
  };

  return (
    <section className="mb-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h2 className="text-xl font-serif font-semibold mb-2 md:mb-0">
          Vaccines
        </h2>
        <div className="flex gap-2">
          <button
            className="border border-[var(--color-primary)] text-[var(--color-primary)] px-5 py-2 rounded-lg font-semibold flex items-center gap-2 hover:bg-[var(--color-primary)] hover:text-[var(--color-background)] transition"
            onClick={handleAddVaccine}
          >
            <span className="text-lg">+</span> Add New Vaccine
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-2">
        {vaccines.map((vaccine, idx) => (
          <div key={idx}>
            <VaccineInfo
              name={vaccine.name}
              administered={vaccine.administered}
              expires={vaccine.expires}
              soon={vaccine.soon}
              warning={vaccine.warning}
              showEdit={true}
              onEdit={() => setEditIdx(idx)}
            />
          </div>
        ))}
      </div>
      <div className="mt-2">
        <a
          href="#"
          className="text-[var(--color-primary)] font-medium hover:underline text-base"
        >
          View All Vaccines &gt;
        </a>
      </div>
      {editIdx !== null && (
        <EditVaccineModal
          open={editIdx !== null}
          onClose={() => setEditIdx(null)}
          vaccine={vaccines[editIdx]}
        />
      )}
    </section>
  );
};

export default VaccineSection;
