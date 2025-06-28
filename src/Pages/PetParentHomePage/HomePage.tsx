import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../Components/Layout/Navbar";
import DocumentSection from "../../Components/Document/DocumentSection";
import TeamSection from "../../Components/Teams/TeamSection";
import VaccineSection from "../../Components/Vaccine/VaccineSection";
import petServices from "../../Services/petServices";
import vaccineServices from "../../Services/vaccineServices";
import teamServices from "../../Services/teamServices";
import RenameDocumentModal from "../../Components/Document/RenameDocumentModal";
import EditVaccineModal from "../../Components/Vaccine/EditVaccineModal";

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { petId } = useParams<{ petId: string }>();
  const [vaccines, setVaccines] = useState<any[]>([]);
  const [rawDocuments, setRawDocuments] = useState<any[]>([]);
  const [teams, setTeams] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [petName, setPetName] = useState<string>("My Pet");
  const [editDocIdx, setEditDocIdx] = useState<number | null>(null);
  const [editDocName, setEditDocName] = useState<string>("");
  const [editVaccineIdx, setEditVaccineIdx] = useState<number | null>(null);
  const [pet, setPet] = useState<any>(null);

  useEffect(() => {
    const fetchAll = async () => {
      console.log("fetchAll running...");
      setLoading(true);
      setError(null);
      try {
        console.log("[HomePage] petId:", petId);
        if (!petId) {
          setLoading(false);
          return;
        }
        const petRes = await petServices.getPetById(petId);
        console.log("[HomePage] petRes:", petRes);
        let petData: any = petRes;
        // If petRes is a PetResponse, extract .data
        if (petRes && petRes.data) petData = petRes.data;
        // If still an array, use first element
        if (Array.isArray(petData)) petData = petData[0];
        // If still not a valid pet object, error
        if (
          !petData ||
          typeof petData !== "object" ||
          !("id" in petData) ||
          !("pet_name" in petData)
        ) {
          console.error("[HomePage] No valid pet found. petData:", petData);
          setPet(null);
          setError("No pet found. Please add a pet first.");
          setLoading(false);
          return;
        }
        setPet(petData);
        setPetName(petData.pet_name || "My Pet");
        // Vaccines
        const vaccinesRes = await vaccineServices.getAllPetVaccines(petData.id);
        let vaccinesArr = Array.isArray(vaccinesRes)
          ? vaccinesRes
          : vaccinesRes.data;
        if (!vaccinesArr) vaccinesArr = [];
        if (!Array.isArray(vaccinesArr)) vaccinesArr = [vaccinesArr];
        // Map to VaccineSection shape
        const mappedVaccines = vaccinesArr.map((v: any) => ({
          name: v.vaccine_name || v.name || "",
          administered: v.date_administered || v.administered || "",
          expires: v.date_due || v.expiry_date || v.expires || "",
          soon: v.soon,
          warning: v.warning,
        }));
        console.log("[HomePage] mappedVaccines", mappedVaccines);
        setVaccines(mappedVaccines);
        // Documents
        const docsRes = await petServices.getPetDocuments(petData.id);
        let docsArr = Array.isArray(docsRes)
          ? docsRes
          : docsRes
          ? [docsRes]
          : [];
        // Map to DocumentSection shape
        const mappedDocs = docsArr.map((d: any) => {
          let ext = d.document_name?.split(".").pop()?.toLowerCase() || "";
          let type: "pdf" | "img" = ext === "pdf" ? "pdf" : "img";
          return {
            name: d.document_name || d.name || "",
            size: d.size ? `${(d.size / (1024 * 1024)).toFixed(1)} MB` : "",
            type,
          };
        });
        console.log("[HomePage] mappedDocs", mappedDocs);
        setRawDocuments(mappedDocs);
        // Teams
        const teamsRes = await teamServices.getAllTeams();
        let teamsArr = Array.isArray(teamsRes) ? teamsRes : teamsRes.data;
        if (!teamsArr) teamsArr = [];
        if (!Array.isArray(teamsArr)) teamsArr = [teamsArr];
        // Map to TeamSection shape
        const mappedTeams = teamsArr.map((t: any) => {
          const b = t.business || {};
          return {
            name: b.business_name || t.name || "",
            type: b.description || t.type || "",
            phone: b.phone || "",
            email: b.email || "",
            address: b.address || "",
            avatar: b.profile_picture_document_id
              ? `/api/v1/documents/${b.profile_picture_document_id}`
              : `https://randomuser.me/api/portraits/men/${
                  Math.floor(Math.random() * 100) + 1
                }.jpg`,
          };
        });
        console.log("[HomePage] mappedTeams", mappedTeams);
        setTeams(mappedTeams);
      } catch (err: any) {
        console.error("[HomePage] Error fetching homepage data:", err);
        setError(err.message || "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, [petId]);

  const handleAddVaccine = () => {
    navigate(`/petowner/pet/${petId}/add-vaccine`);
  };
  const handleAddDocument = () => {
    navigate(`/petowner/pet/${petId}/upload`);
  };
  const handleAddTeam = () => {
    navigate(`/petowner/pet/${petId}/team`);
  };

  const handleEditDocument = (idx: number) => {
    setEditDocIdx(idx);
    setEditDocName(rawDocuments[idx]?.name || "");
  };

  const handleSaveDocumentName = async (newName: string) => {
    if (editDocIdx === null) return;
    try {
      const doc = rawDocuments[editDocIdx];
      if (!doc.id) throw new Error("No document id");
      await petServices.updateDocumentName(doc.id, newName);
      setRawDocuments((prevDocs: any[]) =>
        prevDocs.map((d, i) => (i === editDocIdx ? { ...d, name: newName } : d))
      );
      setEditDocIdx(null);
    } catch (err) {
      setEditDocIdx(null);
    }
  };

  const handleEditVaccine = (idx: number) => {
    setEditVaccineIdx(idx);
  };

  const handleSaveVaccine = async (updatedVaccine: any) => {
    if (editVaccineIdx === null) return;
    setVaccines((prev) =>
      prev.map((v, i) => (i === editVaccineIdx ? updatedVaccine : v))
    );
    setEditVaccineIdx(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen w-full bg-[var(--color-background)] text-[var(--color-text)] font-sans">
        <Navbar />
        <div className="container mx-auto max-w-7xl pt-8 pb-12 px-8">
          <div className="text-center">Loading...</div>
        </div>
      </div>
    );
  }

  if (!pet) {
    return (
      <div className="min-h-screen w-full bg-[var(--color-background)] text-[var(--color-text)] font-sans">
        <Navbar />
        <div className="container mx-auto max-w-7xl pt-8 pb-12 px-8">
          <div className="text-center">Pet not found</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[var(--color-background)] text-[var(--color-text)] font-sans">
      <Navbar />
      <div className="container mx-auto max-w-7xl pt-8 pb-12 px-8">
        <h1 className="text-4xl font-serif font-bold mb-8">
          Welcome {pet.pet_name}!
        </h1>

        <div className="mb-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
            <h2 className="text-2xl font-bold">Vaccines</h2>
            <button
              onClick={() => navigate(`/petowner/pet/${petId}/add-vaccine`)}
              className="border border-[var(--color-primary)] text-[var(--color-primary)] px-6 py-2 rounded-lg font-semibold flex items-center gap-2 hover:bg-[var(--color-primary)] hover:text-[var(--color-background)] transition"
            >
              <span className="text-lg">+</span> Add New Vaccine
            </button>
          </div>
          <VaccineSection
            vaccines={vaccines}
            onEditVaccine={handleEditVaccine}
          />
        </div>

        <div className="mb-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
            <h2 className="text-2xl font-bold">Recently Uploaded Documents</h2>
            <button
              onClick={() => navigate(`/petowner/pet/${petId}/upload`)}
              className="border border-[var(--color-primary)] text-[var(--color-primary)] px-6 py-2 rounded-lg font-semibold flex items-center gap-2 hover:bg-[var(--color-primary)] hover:text-[var(--color-background)] transition"
            >
              <span className="text-lg">+</span> Upload New Document
            </button>
          </div>
          <DocumentSection
            documents={rawDocuments}
            onEditDocument={handleEditDocument}
          />
        </div>

        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
            <h2 className="text-2xl font-bold">Your Teams</h2>
            <button
              onClick={() => navigate(`/petowner/pet/${petId}/add-team`)}
              className="border border-[var(--color-primary)] text-[var(--color-primary)] px-6 py-2 rounded-lg font-semibold flex items-center gap-2 hover:bg-[var(--color-primary)] hover:text-[var(--color-background)] transition"
            >
              <span className="text-lg">+</span> Add New Team
            </button>
          </div>
          <TeamSection teams={teams} />
        </div>
      </div>

      {/* Modals */}
      {editDocIdx !== null && (
        <RenameDocumentModal
          open={true}
          initialName={editDocName}
          onClose={() => setEditDocIdx(null)}
          onSave={handleSaveDocumentName}
        />
      )}
      {editVaccineIdx !== null && (
        <EditVaccineModal
          open={true}
          vaccine={vaccines[editVaccineIdx]}
          onClose={() => setEditVaccineIdx(null)}
          onSave={handleSaveVaccine}
        />
      )}
    </div>
  );
};

export default HomePage;
