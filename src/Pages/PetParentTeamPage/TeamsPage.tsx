import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Components/Layout/Navbar";
import TeamBox from "../../Components/Teams/TeamInfo";
import teamServices from "../../Services/teamServices";
import petServices from "../../Services/petServices";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "../../Components/ui/dialog";

const TeamsPage: React.FC = () => {
  const [teams, setTeams] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // const [user, setUser] = useState<any>(null);
  const [petName, setPetName] = useState<string>("My Pet");
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    teamServices.getAllTeams()
      .then(res => {
        console.log('TeamsPage received backend data:', res);
        setTeams(Array.isArray(res) ? res : []);
        setError(null);
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    // Fetch pet name (like in VaccinesPage)
    const fetchPetName = async () => {
      try {
        const petsRes = await petServices.getPetsByOwner();
        let petsArr = Array.isArray(petsRes) ? petsRes : petsRes.data;
        if (!petsArr) petsArr = [];
        if (!Array.isArray(petsArr)) petsArr = [petsArr];
        if (petsArr.length > 0) {
          setPetName(petsArr[0].pet_name || "My Pet");
        }
      } catch (err) {
        setPetName("My Pet");
      }
    };
    fetchPetName();
  }, []);

  const handleDelete = (index: number) => {
    setSelectedTeam(teams[index]);
    setOpen(true);
  };
  const confirmDelete = async () => {
    if (!selectedTeam) return;
    setLoading(true);
    try {
      await teamServices.deleteTeam(selectedTeam.id);
      setTeams(teams.filter(t => t.id !== selectedTeam.id));
      setOpen(false);
      setSelectedTeam(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[var(--color-background)] text-[var(--color-text)]">
      <Navbar
        userName={""}
        userImage={"https://randomuser.me/api/portraits/men/32.jpg"}
      />
      <div className="container pt-8 pb-12 pr-8 pl-8 mx-auto max-w-8xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-serif font-bold mb-2">{petName ? `${petName}’s Team` : "Your Team"}</h1>
          <button
            className="flex items-center gap-2 px-6 py-2 rounded-lg border border-[var(--color-primary)] text-[var(--color-primary)] bg-transparent font-medium text-lg min-w-[200px] justify-center transition-all duration-150 hover:bg-[var(--color-primary)] hover:text-black hover:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2"
            style={{ height: 48, boxShadow: 'none' }}
            onClick={() => navigate("/add-team")}
          >
            <span className="text-2xl font-bold">+</span> Add New Team
          </button>
        </div>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        {loading ? (
          <div className="text-lg text-center py-8">Loading teams...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teams.map((team, index) => (
              <TeamBox
                key={team.id || index}
                team={team}
                onDelete={() => handleDelete(index)}
              />
            ))}
          </div>
        )}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="bg-[var(--color-background)] border-[var(--color-modal-border)] max-w-md rounded-2xl p-8">
            <DialogHeader>
              <DialogTitle className="text-[var(--color-text)] text-3xl font-serif font-bold mb-2">Remove team?</DialogTitle>
            </DialogHeader>
            <DialogDescription className="text-[var(--color-text)] text-base mb-6">Are you sure you want to remove the following team from your profile?</DialogDescription>
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
              <button onClick={confirmDelete} className="px-8 py-2 rounded-lg bg-[var(--color-primary)] text-[var(--color-primary-foreground)] font-medium text-lg hover:opacity-90 transition-all duration-150" disabled={loading}>{loading ? 'Removing...' : 'Yes, remove'}</button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default TeamsPage;
