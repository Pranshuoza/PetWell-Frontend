import React, { useState } from "react";
import Navbar from "../Layout/Navbar";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "../ui/dialog";
import TeamAddedModal from "./TeamAddedModal";

const randomAvatars = [
  "https://randomuser.me/api/portraits/men/32.jpg",
  "https://randomuser.me/api/portraits/women/44.jpg",
  "https://randomuser.me/api/portraits/men/65.jpg",
  "https://randomuser.me/api/portraits/women/68.jpg",
  "https://randomuser.me/api/portraits/men/77.jpg",
  "https://randomuser.me/api/portraits/women/12.jpg",
];

function getRandomAvatar(idx: number) {
  return randomAvatars[idx % randomAvatars.length];
}

const TEAM_DATA = [
  {
    name: "Daily Day Care",
    address: "245 Lexington Ave, New York",
    avatar: getRandomAvatar(0),
  },
  {
    name: "Groomers Daily",
    address: "310 E 86th St, New York",
    avatar: getRandomAvatar(1),
  },
  {
    name: "Deely Daily Doctor",
    address: "9021 Melrose Ave, Los Angeles",
    avatar: getRandomAvatar(2),
  },
  // Add more as needed
];

const AddTeamPage: React.FC = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [selectedTeam, setSelectedTeam] = useState<any>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [showTeamAdded, setShowTeamAdded] = useState(false);
  const [addedTeamName, setAddedTeamName] = useState("");
  const filteredTeams = search
    ? TEAM_DATA.filter(team =>
        team.name.toLowerCase().includes(search.toLowerCase()) ||
        team.address.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  return (
    <div className="min-h-screen w-full bg-[var(--color-background)] text-[var(--color-text)]">
      <Navbar userName="Syd" userImage="https://randomuser.me/api/portraits/men/32.jpg" />
      <div className="container pt-8 pb-12 pr-8 pl-8 mx-auto max-w-8xl flex flex-col items-center">
        <button
          className="text-[var(--color-primary)] text-base font-medium mb-8 self-start flex items-center gap-2 hover:underline"
          onClick={() => navigate(-1)}
        >
          <span className="text-xl">&lt;</span> Go Back
        </button>
        <div className="flex flex-col items-center w-full">
          <div className="mb-6">
            {/* Team SVG Icon */}
            <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="40" cy="40" r="40" fill="#EBD5BD" fillOpacity="0.15"/>
              <path d="M40 46c5.523 0 10-4.477 10-10s-4.477-10-10-10-10 4.477-10 10 4.477 10 10 10Z" fill="#EBD5BD"/>
              <path d="M24 60c0-8.837 7.163-16 16-16s16 7.163 16 16v2c0 1.105-.895 2-2 2H26c-1.105 0-2-.895-2-2v-2Z" fill="#EBD5BD"/>
            </svg>
          </div>
          <h1 className="text-3xl font-serif font-bold text-[var(--color-text)] mb-2">Add A Team</h1>
          <p className="text-base text-[var(--color-text)] mb-8 opacity-80">Search and add vets, groomers, or other care providers.</p>
          <div className="w-full max-w-md mt-2 flex flex-col items-center">
            <label className="block text-[var(--color-text)] opacity-60 font-semibold mb-2 ml-1 self-start" htmlFor="search">Search for a care provider</label>
            <div className="w-full flex justify-center relative">
              <div className="relative w-full">
                <input
                  id="search"
                  name="search"
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="w-full h-11 px-5 pr-12 rounded-md bg-white bg-opacity-[0.04] border border-[#232b41] text-[var(--color-text)] placeholder-black placeholder-opacity-60 text-base font-normal focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all duration-150 shadow-none"
                  placeholder="Search by name, clinic, or location"
                  style={{ color: '#000000' }}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xl text-[var(--color-text)] pointer-events-none">
                  <svg width="20" height="20" fill="none" stroke="#000000" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="M21 21l-2-2"/></svg>
                </span>
                {/* Results dropdown */}
                {search && filteredTeams.length > 0 && (
                  <div className="absolute left-0 right-0 mt-1 bg-white rounded-md shadow-lg z-10 border border-[#ececec] overflow-hidden" style={{width: '100%'}}>
                    {filteredTeams.map((team, idx) => (
                      <div key={team.name} className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-[var(--color-card)] border-b last:border-b-0 border-[#ececec]"
                        onClick={() => { setSelectedTeam(team); setModalOpen(true); }}>
                        <img src={team.avatar} alt={team.name} className="w-9 h-9 rounded-full object-cover" />
                        <div>
                          <div className="font-semibold text-base text-[#232b3e]">{team.name}</div>
                          <div className="text-sm text-[#232b3e] opacity-70">{team.address}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                <Dialog open={modalOpen} onOpenChange={setModalOpen}>
                  <DialogContent className="bg-[#1C232E] border-[var(--color-modal-border)] max-w-md rounded-2xl p-8">
                    <DialogHeader>
                      <DialogTitle className="text-[var(--color-text)] text-3xl font-serif font-bold mb-2">Add to team?</DialogTitle>
                    </DialogHeader>
                    <DialogDescription className="text-[var(--color-text)] text-base mb-6">Once added, you can view and manage this provider from your Team list.</DialogDescription>
                    {selectedTeam && (
                      <div className="flex items-center gap-4 bg-[var(--color-card)] rounded-lg px-4 py-3 mb-6">
                        <img src={selectedTeam.avatar} alt={selectedTeam.name} className="w-12 h-12 rounded-full object-cover" />
                        <div>
                          <div className="font-semibold text-lg text-[var(--color-text)]">{selectedTeam.name}</div>
                          <div className="text-sm text-[var(--color-text)] opacity-60">{selectedTeam.address}</div>
                        </div>
                      </div>
                    )}
                    <div className="flex gap-4 justify-end mt-2">
                      <DialogClose asChild>
                        <button className="px-8 py-2 rounded-lg border border-[var(--color-primary)] text-[var(--color-primary)] bg-transparent font-medium text-lg hover:bg-[var(--color-primary)] hover:text-black transition-all duration-150">Cancel</button>
                      </DialogClose>
                      <button
                        className="px-8 py-2 rounded-lg bg-[var(--color-primary)] text-[var(--color-primary-foreground)] font-medium text-lg hover:opacity-90 transition-all duration-150"
                        onClick={() => {
                          setShowTeamAdded(true);
                          setModalOpen(false);
                          setAddedTeamName(selectedTeam?.name || "");
                        }}
                      >
                        Yes, Add to Team
                      </button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Team Added Modal */}
      {showTeamAdded && (
        <TeamAddedModal
          teamName={addedTeamName}
          teamAvatar={selectedTeam?.avatar}
          onClose={() => setShowTeamAdded(false)}
          onGoHome={() => navigate("/home")}
          onAddMore={() => {
            setShowTeamAdded(false);
            setSearch("");
            setSelectedTeam(null);
          }}
        />
      )}
    </div>
  );
};

export default AddTeamPage;
