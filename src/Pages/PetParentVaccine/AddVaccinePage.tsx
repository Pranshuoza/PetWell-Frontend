import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Components/Layout/Navbar";
import AddVaccine from "../../Components/Vaccine/AddVaccine";
import vaccineServices from "../../Services/vaccineServices";
import petServices from "../../Services/petServices";

const AddVaccinePage: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Handles the actual vaccine creation
  const handleAddVaccine = async (data: any) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      // Get the user's pets (assuming first pet for now)
      let petsRes = await petServices.getPetsByOwner();
      console.log("Pets Response:", petsRes);
      let petsArr = Array.isArray(petsRes) ? petsRes : petsRes.data;
      if (!petsArr) petsArr = [];
      if (!Array.isArray(petsArr)) petsArr = [petsArr];
      if (petsArr.length === 0) {
        setError("No pets found. Please add a pet first.");
        setLoading(false);
        return;
      }
      const pet = petsArr[0];
      // Compose payload for vaccine creation
      const payload = {
        vaccine_name: data.vaccine,
        date_administered: data.administered,
        date_due: data.expiry,
        staff_id: "1", // You may want to select actual staff/doctor
        pet_id: pet.id,
        file: data.file,
      };
      if (!data.file) {
        setError("A vaccine document file is required.");
        setLoading(false);
        return;
      }
      await vaccineServices.createVaccine(payload);
      console.log("Payload:", payload);
      setSuccess("Vaccine added successfully!");
      // setTimeout(() => navigate(-1), 1200);
    } catch (err: any) {
      setError(err.message || "Failed to add vaccine");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-screen bg-[var(--color-background)] text-[var(--color-text)] font-sans">
      <Navbar
        userName="Syd"
        userImage="https://randomuser.me/api/portraits/men/32.jpg"
      />
      <div className="max-w-8xl mx-auto px-12 pt-4 pb-12">
        <button
          className="text-[#FFA500] text-md mb-4 flex items-center hover:underline bg-transparent"
          onClick={() => navigate(-1)}
        >
          <span className="mr-2">&lt; Go Back</span>
        </button>
        <div className="max-w-lg mx-auto pt-8 pb-12 flex flex-col items-center">
          {error && <div className="text-red-500 mb-4">{error}</div>}
          {success && <div className="text-green-500 mb-4">{success}</div>}
          <AddVaccine onSubmit={handleAddVaccine} />
          {loading && (
            <div className="text-center mt-4 text-lg">Adding vaccine...</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddVaccinePage;
