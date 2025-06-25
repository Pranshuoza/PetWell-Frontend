import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Components/Layout/Navbar";
import VaccineInfo from "../../Components/Vaccine/VaccineInfo";
import EditVaccineModal from "../../Components/Vaccine/EditVaccineModal";
import vaccineServices from "../../Services/vaccineServices";
import petServices from "../../Services/petServices";

const VaccinesPage: React.FC = () => {
  const [vaccines, setVaccines] = useState<any[]>([]);
  const [editIdx, setEditIdx] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [petName, setPetName] = useState<string>("My Pet");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVaccines = async () => {
      setLoading(true);
      setError(null);
      try {
        // Get the user's pets (assuming first pet for now)
        const petsRes = await petServices.getPetsByOwner();
        let petsArr = Array.isArray(petsRes) ? petsRes : petsRes.data;
        if (!petsArr) petsArr = [];
        if (!Array.isArray(petsArr)) petsArr = [petsArr];
        if (petsArr.length === 0) {
          setError("No pets found. Please add a pet first.");
          setLoading(false);
          return;
        }
        const pet = petsArr[0];
        setPetName(pet.pet_name || "My Pet");
        // Fetch vaccines for the first pet
        const vaccinesRes = await vaccineServices.getAllPetVaccines(pet.id);
        let vaccinesArr = Array.isArray(vaccinesRes) ? vaccinesRes : vaccinesRes.data;
        if (!vaccinesArr) vaccinesArr = [];
        if (!Array.isArray(vaccinesArr)) vaccinesArr = [vaccinesArr];
        setVaccines(
          vaccinesArr.map((v: any) => ({
            name: v.vaccine_name,
            administered: v.date_administered,
            expires: v.date_due,
            soon: false, // You can add logic to determine if soon
            warning: undefined, // You can add logic for warning
            ...v,
          }))
        );
      } catch (err: any) {
        setError(err.message || "Failed to fetch vaccines");
      } finally {
        setLoading(false);
      }
    };
    fetchVaccines();
  }, []);

  return (
    <div className="min-h-screen w-full bg-[var(--color-background)] text-[var(--color-text)] font-sans">
      <Navbar
        userName={petName}
        userImage="https://randomuser.me/api/portraits/men/32.jpg"
      />
      <div className="container max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <h1 className="text-2xl font-serif font-bold mt-2">{petName}'s Vaccines</h1>
          <div className="flex gap-4">
            <button
              className="py-2 px-4 rounded-lg border border-[var(--color-primary)] text-[var(--color-primary)] font-semibold text-lg hover:bg-[var(--color-primary)] hover:text-[var(--color-background)] transition flex items-center justify-center bg-transparent"
              onClick={() => navigate("/download-select")}
            >
              <span className="mr-2">↓</span> Download Vaccine Records
            </button>
            <button
              className="py-2 px-4 rounded-lg border border-[var(--color-primary)] text-[var(--color-primary)] font-semibold text-lg hover:bg-[var(--color-primary)] hover:text-[var(--color-background)] transition flex items-center justify-center bg-transparent"
              onClick={() => navigate("/add-vaccine")}
            >
              <span className="mr-2">+</span> Add New Vaccine
            </button>
          </div>
        </div>
        {loading ? (
          <div className="text-center text-lg py-12">Loading vaccines...</div>
        ) : error ? (
          <div className="text-center text-red-500 py-12">{error}</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {vaccines.map((vaccine, idx) => (
              <VaccineInfo
                key={vaccine.id || idx}
                name={vaccine.name}
                administered={vaccine.administered}
                expires={vaccine.expires}
                soon={vaccine.soon}
                warning={vaccine.warning}
                showEdit={true}
                onEdit={() => setEditIdx(idx)}
              />
            ))}
          </div>
        )}
        {editIdx !== null && vaccines[editIdx] && (
          <EditVaccineModal
            open={editIdx !== null}
            onClose={() => setEditIdx(null)}
            vaccine={vaccines[editIdx]}
          />
        )}
      </div>
    </div>
  );
};

export default VaccinesPage;
