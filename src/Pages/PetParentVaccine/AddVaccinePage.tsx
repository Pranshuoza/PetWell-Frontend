import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Components/Layout/Navbar";
import AddVaccine from "../../Components/Vaccine/AddVaccine";
import petServices from "../../Services/petServices";
import vaccineServices from "../../Services/vaccineServices";

const AddVaccinePage: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [petId, setPetId] = useState<string>("");

  // Fetch petId from pets on mount
  useEffect(() => {
    const fetchPet = async () => {
      try {
        let petsRes = await petServices.getPetsByOwner();
        let petsArr = Array.isArray(petsRes) ? petsRes : petsRes.data;
        console.log("Fetched pets:", petsArr);
        if (!petsArr) petsArr = [];
        if (!Array.isArray(petsArr)) petsArr = [petsArr];
        if (petsArr.length > 0) {
          setPetId(petsArr[0].id);
        } else {
          setError("No pet found. Please add a pet first.");
        }
      } catch {
        setError("Failed to fetch pets.");
      }
    };
    fetchPet();
  }, []);

  // Handles the actual vaccine creation
  const handleAddVaccine = async (data: any) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      if (!petId) {
        setError("No pet found. Please add a pet first.");
        setLoading(false);
        return;
      }
      if (!data.doctor || !data.doctor.id) {
        setError("Please select a doctor.");
        setLoading(false);
        return;
      }
      const manualFieldsFilled =
        data.vaccine && data.administered && data.expiry && data.doctor;
      if (!data.file && !manualFieldsFilled) {
        setError("Please upload a vaccine document OR fill all manual fields.");
        setLoading(false);
        return;
      }

      // Build payload for API
      const payload = {
        vaccine_name: data.vaccine,
        date_administered: data.administered,
        date_due: data.expiry,
        staff_id: data.doctor.id,
        pet_id: petId,
        file: data.file || undefined,
      };
      console.log("Sending payload to server:", payload);

      await vaccineServices.createVaccine(payload);

      setSuccess("Vaccine added successfully!");
      // Redirect to vaccine list page after success
      setTimeout(() => navigate("/vaccine"), 1200);
    } catch (err: any) {
      setError(err.message || "Failed to add vaccine");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-screen bg-[var(--color-background)] text-[var(--color-text)] font-sans">
      <Navbar
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
          <AddVaccine onSubmit={handleAddVaccine} petId={petId} />
          {loading && (
            <div className="text-center mt-4 text-lg">Adding vaccine...</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddVaccinePage;
