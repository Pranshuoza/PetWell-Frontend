import React, { useState, useEffect } from "react";
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
import teamServices from "../../Services/teamServices";
import petServices from "../../Services/petServices";

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

const AddTeamPage: React.FC = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<any>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [showTeamAdded, setShowTeamAdded] = useState(false);
  const [addedTeamName, setAddedTeamName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pets, setPets] = useState<any[]>([]);
  const [selectedPetId, setSelectedPetId] = useState<string>("");

  useEffect(() => {
    // Fetch pets for the owner
    petServices.getPetsByOwner().then(res => {
      let petsArr = Array.isArray(res.data) ? res.data : res.data ? [res.data] : [];
      setPets(petsArr);
      if (petsArr.length > 0) setSelectedPetId(petsArr[0].id);
    });
  }, []);

  useEffect(() => {
    if (search.trim().length === 0) {
      setSearchResults([]);
      return;
    }
    let active = true;
    setLoading(true);
    teamServices.searchBusinesses(search)
      .then(async res => {
        if (!active) return;
        // For each business, fetch the team by business id if needed
        const businesses = res.data || [];
        const resultsWithTeam = await Promise.all(
          businesses.map(async (b: any, idx: number) => {
            let teamInfo = null;
            try {
              // Try to fetch team by business id (if such mapping exists)
              const teamRes = await teamServices.getTeamById(b.id);
              teamInfo = teamRes.data || null;
            } catch (e) {
              // If not found, ignore
            }
            return {
              ...b,
              avatar: getRandomAvatar(idx),
              address: b.address || "",
              name: b.business_name || b.name || "Business",
              teamInfo,
            };
          })
        );
        setSearchResults(resultsWithTeam);
        setError(null);
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
    return () => { active = false; };
  }, [search]);

  // After creating a team, redirect to TeamsPage and refresh the list
  const handleAddTeam = async () => {
    if (!selectedTeam || !selectedPetId) return;
    setLoading(true);
    setError(null);
    try {
      await teamServices.createTeam({
        pet_id: selectedPetId,
        business_id: selectedTeam.id,
      });
      setShowTeamAdded(true);
      setModalOpen(false);
      setAddedTeamName(selectedTeam.name || "");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

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
            {pets.length > 1 && (
              <div className="w-full mb-4">
                <label className="block text-[var(--color-text)] opacity-60 font-semibold mb-2 ml-1 self-start" htmlFor="pet-select">Select Pet</label>
                <select
                  id="pet-select"
                  className="w-full h-11 px-5 rounded-md bg-white bg-opacity-[0.04] border border-[#232b41] text-[var(--color-text)] text-base font-normal focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all duration-150 shadow-none"
                  value={selectedPetId}
                  onChange={e => setSelectedPetId(e.target.value)}
                >
                  {pets.map(pet => (
                    <option key={pet.id} value={pet.id}>{pet.pet_name}</option>
                  ))}
                </select>
              </div>
            )}
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
                {search && searchResults.length > 0 && (
                  <div className="absolute left-0 right-0 mt-1 bg-white rounded-md shadow-lg z-10 border border-[#ececec] overflow-hidden" style={{width: '100%'}}>
                    {searchResults.map((team) => (
                      <div key={team.id} className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-[var(--color-card)] border-b last:border-b-0 border-[#ececec]"
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
                    {error && <div className="text-red-500 mb-4">{error}</div>}
                    <div className="flex gap-4 justify-end mt-2">
                      <DialogClose asChild>
                        <button className="px-8 py-2 rounded-lg border border-[var(--color-primary)] text-[var(--color-primary)] bg-transparent font-medium text-lg hover:bg-[var(--color-primary)] hover:text-black transition-all duration-150">Cancel</button>
                      </DialogClose>
                      <button
                        className="px-8 py-2 rounded-lg bg-[var(--color-primary)] text-[var(--color-primary-foreground)] font-medium text-lg hover:opacity-90 transition-all duration-150"
                        onClick={handleAddTeam}
                        disabled={loading}
                      >
                        {loading ? 'Adding...' : 'Yes, Add to Team'}
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