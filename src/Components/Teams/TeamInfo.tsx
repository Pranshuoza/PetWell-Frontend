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
    <div className="bg-[var(--color-card)] rounded-2xl px-7 py-5 border border-[var(--color-border)] flex flex-col gap-2 relative min-w-[340px] max-w-full" style={{minHeight: 200}}>
      <div className="flex items-center gap-3 mb-2">
        <img src={avatar} alt={name} className="w-12 h-12 rounded-full object-cover" />
        <div className="flex flex-col">
          <span className="font-semibold text-lg text-[var(--color-text)] leading-tight">{name}</span>
          <span className="text-xs px-2 py-0.5 rounded bg-[var(--color-secondary)] text-[var(--color-secondary-foreground)] mt-1 w-fit" style={{marginLeft: 2}}>{type}</span>
        </div>
        {onDelete && (
          <button className="ml-auto text-gray-400 hover:text-[var(--color-danger)] text-3xl absolute right-4 top-4 p-0 m-0 bg-transparent border-none cursor-pointer" onClick={onDelete} aria-label="Remove Team">×</button>
        )}
      </div>
      <div className="flex flex-col sm:flex-row sm:gap-8 gap-1 mt-2">
        <div className="text-sm mb-1 sm:mb-0 flex flex-col">
          <span className="font-semibold" style={{ color: 'rgba(235, 213, 189, 0.6)' }}>Phone</span>
          <span className="text-[var(--color-text)] font-bold mt-0.5">{phone}</span>
        </div>
        <div className="text-sm mb-1 sm:mb-0 flex flex-col">
          <span className="font-semibold" style={{ color: 'rgba(235, 213, 189, 0.6)' }}>Email</span>
          <span className="text-[var(--color-text)] font-bold mt-0.5">{email}</span>
        </div>
      </div>
      <div className="text-sm mt-1 flex flex-col">
        <span className="font-semibold" style={{ color: 'rgba(235, 213, 189, 0.6)' }}>Address</span>
        <span className="text-[var(--color-text)] font-bold mt-0.5">{address}</span>
      </div>
    </div>
  );
};

export default TeamBox;
