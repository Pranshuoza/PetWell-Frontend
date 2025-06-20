import React from "react";

interface VaccineInfoProps {
  name: string;
  administered: string;
  expires: string;
  onEdit?: () => void;
}

const VaccineInfo: React.FC<VaccineInfoProps> = ({
  name,
  administered,
  expires,
  onEdit,
}) => (
  <div className="bg-[#232b3e] rounded-xl shadow-lg p-4 flex flex-col min-h-[120px] relative">
    <div className="flex items-center mb-2">
      <span className=" text-2xl">💉</span>
      <button
        className="text-[#EBD5BD] hover:text-[#FFA500] text-sm absolute right-4"
        onClick={onEdit}
      >
      </button>
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
  </div>
);

export default VaccineInfo;
