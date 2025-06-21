import React from "react";

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
    className="bg-[#232b3e] rounded-xl shadow-lg p-4 flex flex-col min-h-[120px] relative h-full min-w-0"
    style={{ minHeight: 180, height: "100%" }}
  >
    <div className="flex items-center mb-2">
      <span className="text-2xl">💉</span>
      {showSelect && (
        <input
          type="checkbox"
          checked={selected}
          onChange={onSelect}
          className="absolute right-4 accent-[#FFA500] w-5 h-5"
          aria-label="Select Vaccine"
        />
      )}
      {showEdit && (
        <button
          className="absolute right-4 text-[#FFA500] hover:bg-[#FFA500] hover:text-white rounded-full p-2 transition"
          onClick={onEdit}
          aria-label="Edit Vaccine"
        >
          <span role="img" aria-label="edit">
            ✏️
          </span>
        </button>
      )}
    </div>
    <div>
      <span className="font-bold text-lg flex-1">{name}</span>
    </div>
    <div className="flex justify-between text-sm text-[#EBD5BD] mt-2">
      <div>
        <div className="font-semibold">Administered</div>
        <div>{administered}</div>
      </div>
      <div>
        <div className="font-semibold">Expires</div>
        <div>{expires}</div>
      </div>
      <div>
        <div className="font-semibold"></div>
        <div></div>
      </div>
    </div>
    <div className="mt-4 text-sm text-[#FFA500] flex items-center min-h-[24px]">
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
