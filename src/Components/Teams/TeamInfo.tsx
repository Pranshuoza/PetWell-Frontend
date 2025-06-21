import React from "react";

interface TeamBoxProps {
  name: string;
  type: string;
  phone: string;
  email: string;
  address: string;
  avatar: string;
  onDelete?: () => void;
}

const TeamBox: React.FC<TeamBoxProps> = ({ name, type, phone, email, address, avatar, onDelete }) => {
  return (
    <div className="bg-[var(--color-card)] rounded-xl px-6 py-5 border border-[var(--color-border)] flex flex-col gap-2 relative">
      <div className="flex items-center gap-3 mb-2">
        <img src={avatar} alt={name} className="w-10 h-10 rounded-full object-cover" />
        <div>
          <div className="font-semibold text-lg text-[var(--color-white)]">{name}</div>
          <span className="text-xs px-2 py-0.5 rounded bg-[var(--color-secondary)] text-[var(--color-secondary-foreground)] ml-1">{type}</span>
        </div>
        {onDelete && (
          <button className="ml-auto text-gray-400 hover:text-[var(--color-danger)] text-xl absolute right-4 top-4" onClick={onDelete} aria-label="Remove Team">×</button>
        )}
      </div>
      <div className="flex flex-col sm:flex-row sm:gap-8 gap-1 mt-2">
        <div className="text-sm mb-1 sm:mb-0">
          <span className="font-semibold">Phone</span> <span className="ml-2">{phone}</span>
        </div>
        <div className="text-sm mb-1 sm:mb-0">
          <span className="font-semibold">Email</span> <span className="ml-2">{email}</span>
        </div>
      </div>
      <div className="text-sm mt-1">
        <span className="font-semibold">Address</span> <span className="ml-2">{address}</span>
      </div>
    </div>
  );
};

export default TeamBox;
