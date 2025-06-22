import React from "react";
import { Pencil, Syringe } from "lucide-react";

interface VaccineInfoProps {
  name: string;
  administered: string;
  expires: string;
  soon?: boolean;
  warning?: string;
  // If true, show select checkbox (for selection page)
  showSelect?: boolean;
  selected?: boolean;
  onSelect?: () => void;
  // If true, show edit button (for home/other pages)
  showEdit?: boolean;
  onEdit?: () => void;
}

const VaccineInfo: React.FC<VaccineInfoProps> = ({
  name,
  administered,
  expires,
  soon,
  warning,
  showSelect = false,
  selected = false,
  onSelect,
  showEdit = false,
  onEdit,
}) => (
  <div
    className="bg-[var(--color-card)] rounded-xl shadow-lg p-4 flex flex-col min-h-[120px] relative h-full min-w-0 transition-colors"
    style={{ minHeight: 180, height: "100%" }}
  >
    <div className="flex items-center mb-2">
      <span role="img" aria-label="edit">
        <Syringe size={20} />
      </span>{" "}
      {showSelect && (
        <input
          type="checkbox"
          checked={selected}
          onChange={onSelect}
          className="absolute right-4 accent-[var(--color-primary)] w-5 h-5"
          aria-label="Select Vaccine"
        />
      )}
      {showEdit && (
        <button
          className="absolute right-4 text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-[var(--color-background)] rounded-full p-2 transition"
          onClick={onEdit}
          aria-label="Edit Vaccine"
        >
          <span role="img" aria-label="edit">
            <Pencil size={20} />
          </span>
        </button>
      )}
    </div>
    <div>
      <span className="font-bold text-lg flex-1 text-[var(--color-text)]">
        {name}
      </span>
    </div>
    <div className="flex flex-col sm:flex-row justify-between text-sm text-[var(--color-secondary-foreground)] mt-2 gap-2 sm:gap-0">
      <div>
        <div className="font-semibold">Administered</div>
        <div>{administered}</div>
      </div>
      <div>
        <div className="font-semibold">Expires</div>
        <div>{expires}</div>
      </div>
      <div className="hidden sm:block">
        <div className="font-semibold"></div>
        <div></div>
      </div>
    </div>
    <div className="mt-4 text-sm text-[var(--color-warning)] flex items-center min-h-[24px]">
      {soon && warning ? (
        <>
          <span className="mr-2">❗</span>
          <span>{warning}</span>
        </>
      ) : null}
    </div>
  </div>
);

export default VaccineInfo;
