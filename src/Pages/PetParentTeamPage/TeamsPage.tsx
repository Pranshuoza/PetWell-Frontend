import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
  const navigate = useNavigate();
  const { petId } = useParams<{ petId: string }>();
  const [teams, setTeams] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pet, setPet] = useState<any>(null);
  const [actualPetId, setActualPetId] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!petId) {
          setError("No pet ID provided");
          setLoading(false);
          return;
        }

        let currentPetId = petId;

        // If petId is "default", fetch the first available pet
        if (petId === "default") {
        const petsRes = await petServices.getPetsByOwner();
        let petsArr = Array.isArray(petsRes) ? petsRes : petsRes.data;
        if (!petsArr) petsArr = [];
        if (!Array.isArray(petsArr)) petsArr = [petsArr];

          if (petsArr.length === 0) {
            setError("No pets found. Please create a pet profile first.");
            setLoading(false);
            return;
          }

          // Use the first pet's ID (since "default" means single pet)
          currentPetId = petsArr[0].id;
          setActualPetId(currentPetId);
        } else {
          setActualPetId(currentPetId);
        }

        // Fetch pet details
        const petRes = await petServices.getPetById(currentPetId);
        let petData = null;

        // Handle different response structures
        if (petRes) {
          if (petRes.data) {
            petData = petRes.data;
          } else if (Array.isArray(petRes)) {
            petData = petRes[0];
          } else if (typeof petRes === "object" && "id" in petRes) {
            petData = petRes;
          }
        }

        setPet(petData);
        if (!petData) {
          setError("Pet not found");
          setLoading(false);
          return;
        }

        // Fetch teams
        setLoading(true);
        const teamsRes = await teamServices.getAllTeams();
        console.log("TeamsPage received backend data:", teamsRes);
        setTeams(Array.isArray(teamsRes) ? teamsRes : []);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch data:", err);
        setError(err instanceof Error ? err.message : "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [petId]);

  const handleDelete = (index: number) => {
    setSelectedTeam(teams[index]);
    setOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedTeam) return;
    try {
      await teamServices.deleteTeam(selectedTeam.id);
      setTeams(teams.filter((team) => team.id !== selectedTeam.id));
      setOpen(false);
      setSelectedTeam(null);
    } catch (err) {
      console.error("Failed to delete team:", err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen w-full bg-[var(--color-background)] text-[var(--color-text)] font-sans">
        <Navbar />
        <div className="container mx-auto max-w-7xl pt-8 pb-12 px-8">
          <div className="text-center">Loading teams...</div>
        </div>
      </div>
    );
  }

  if (!pet) {
    return (
      <div className="min-h-screen w-full bg-[var(--color-background)] text-[var(--color-text)] font-sans">
        <Navbar />
        <div className="container mx-auto max-w-7xl pt-8 pb-12 px-8">
          <div className="text-center">
            {error || "Pet not found"}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[var(--color-background)] text-[var(--color-text)] font-sans">
      <Navbar />
      <div className="container mx-auto max-w-7xl pt-8 pb-12 px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <h1 className="text-4xl font-serif font-bold">
            {pet.pet_name}'s Team
          </h1>
          <div className="flex gap-4">
          <button
              onClick={() =>
                navigate(`/petowner/pet/${actualPetId || petId}/add-team`)
              }
              className="border border-[var(--color-primary)] text-[var(--color-primary)] px-6 py-2 rounded-lg font-semibold flex items-center gap-2 hover:bg-[var(--color-primary)] hover:text-[var(--color-background)] transition"
          >
              <span className="text-lg">+</span> Add New Team
          </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-500 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teams.map((team, index) => (
              <TeamBox
              key={team.id}
                team={team}
                onDelete={() => handleDelete(index)}
              />
            ))}
        </div>

        {teams.length === 0 && !error && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg mb-4">No teams found</div>
            <button
              onClick={() =>
                navigate(`/petowner/pet/${actualPetId || petId}/add-team`)
              }
              className="bg-[var(--color-primary)] text-[var(--color-background)] px-6 py-3 rounded-lg font-semibold hover:bg-[var(--color-accent-hover)] transition"
            >
              Add Your First Team
            </button>
          </div>
        )}

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Team</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete "{selectedTeam?.name}"? This
                action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <div className="flex justify-end gap-3">
              <DialogClose asChild>
                <button className="px-4 py-2 text-gray-500 hover:text-gray-700">
                  Cancel
                </button>
              </DialogClose>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default TeamsPage;
