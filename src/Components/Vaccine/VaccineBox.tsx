import React from "react";
import VaccineInfo from "./VaccineInfo";

interface Vaccine {
  name: string;
  administered: string;
  expires: string;
  soon?: boolean;
  warning?: string;
}

interface VaccineBoxProps {
  vaccines: Vaccine[];
  onAddVaccine?: () => void;
  onEditVaccine?: (index: number) => void;
}

const VaccineBox: React.FC<VaccineBoxProps> = ({
  vaccines,
  onAddVaccine,
  onEditVaccine,
}) => {
  return (
    <section className="mb-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-2">
        <h2 className="text-xl font-serif font-semibold mb-2 md:mb-0">
          Vaccines
        </h2>
        <button
          className="border border-[var(--color-primary)] text-[var(--color-primary)] px-5 py-2 rounded-lg font-semibold flex items-center gap-2 hover:bg-[var(--color-primary)] hover:text-[var(--color-background)] transition"
          onClick={onAddVaccine}
        >
          <span className="text-lg">+</span> Add New Vaccine
        </button>
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
              showEdit={!!onEditVaccine}
              onEdit={onEditVaccine ? () => onEditVaccine(idx) : undefined}
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
    </section>
  );
};

export default VaccineBox;
