import React, { useState } from "react";
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

  return (
    <section className="mb-8">
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
