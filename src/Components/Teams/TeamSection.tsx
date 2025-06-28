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
