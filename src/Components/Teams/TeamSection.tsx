import React from "react";
import TeamBox from "./TeamInfo";

interface Team {
  name: string;
  type: string;
  phone: string;
  email: string;
  address: string;
  avatar: string;
}

interface TeamSectionProps {
  teams: Team[];
  onAddTeam?: () => void;
  onDeleteTeam?: (index: number) => void;
}

const TeamSection: React.FC<TeamSectionProps> = ({
  teams,
  onAddTeam,
  onDeleteTeam,
}) => {
  return (
    <section className="mb-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-2">
        <h2 className="text-xl font-serif font-semibold mb-2 md:mb-0">
          Your Teams
        </h2>
        <button
          className="border border-[var(--color-primary)] text-[var(--color-primary)] px-5 py-2 rounded-lg font-semibold flex items-center gap-2 hover:bg-[var(--color-primary)] hover:text-[var(--color-background)] transition"
          onClick={onAddTeam}
        >
          <span className="text-lg">+</span> Add New Team
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-2">
        {teams.map((team, idx) => (
          <TeamBox
            key={idx}
            team={team}
            onDelete={onDeleteTeam ? () => onDeleteTeam(idx) : undefined}
          />
        ))}
      </div>
      <div className="mt-2">
        <a
          href="#"
          className="text-[var(--color-primary)] font-medium hover:underline text-base"
        >
          View All Teams &gt;
        </a>
      </div>
    </section>
  );
};

export default TeamSection;
