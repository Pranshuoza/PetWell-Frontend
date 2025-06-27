import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Components/Layout/Navbar";
import DocumentSection from "../../Components/Document/DocumentSection";
import TeamSection from "../../Components/Teams/TeamSection";
import VaccineSection from "../../Components/Vaccine/VaccineSection";
import petServices from "../../Services/petServices";
import vaccineServices from "../../Services/vaccineServices";
import teamServices from "../../Services/teamServices";
import RenameDocumentModal from "../../Components/Document/RenameDocumentModal";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [vaccines, setVaccines] = useState<any[]>([]);
  const [rawDocuments, setRawDocuments] = useState<any[]>([]);
  const [teams, setTeams] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [petName, setPetName] = useState<string>("My Pet");
  const [editDocIdx, setEditDocIdx] = useState<number | null>(null);
  const [editDocName, setEditDocName] = useState<string>("");

  useEffect(() => {
    const fetchAll = async () => {
      console.log('fetchAll running...');
      setLoading(true);
      setError(null);
      try {
        // Vaccines & Documents: get pets
        let petsRes = await petServices.getPetsByOwner();
        let petsArr = Array.isArray(petsRes) ? petsRes : petsRes.data;
        if (!petsArr) petsArr = [];
        if (!Array.isArray(petsArr)) petsArr = [petsArr];
        console.log('Fetched pets:', petsArr);
        if (petsArr.length === 0) {
          setError("No pets found. Please add a pet first.");
          setLoading(false);
          return;
        }
        const pet = petsArr[0];
        console.log('Selected pet:', pet);
        setPetName(pet.pet_name || "My Pet");
        // Vaccines
        const vaccinesRes = await vaccineServices.getAllPetVaccines(pet.id);
        let vaccinesArr = Array.isArray(vaccinesRes) ? vaccinesRes : vaccinesRes.data;
        if (!vaccinesArr) vaccinesArr = [];
        if (!Array.isArray(vaccinesArr)) vaccinesArr = [vaccinesArr];
        setVaccines(
          vaccinesArr.map((v: any) => ({
            name: v.vaccine_name,
            administered: v.date_administered,
            expires: v.date_due,
            soon: false,
            warning: undefined,
            ...v,
          }))
        );
        // Documents
        const docsRes = await petServices.getPetDocuments(pet.id);
        let docsArr = Array.isArray(docsRes) ? docsRes : docsRes ? [docsRes] : [];
        setRawDocuments(docsArr);
        // Teams
        const teamsRes = await teamServices.getAllTeams();
        let teamsArr = Array.isArray(teamsRes) ? teamsRes : teamsRes.data;
        if (!teamsArr) teamsArr = [];
        if (!Array.isArray(teamsArr)) teamsArr = [teamsArr];
        setTeams(teamsArr);
      } catch (err: any) {
        console.error('Error fetching homepage data:', err);
        setError(err.message || "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  const handleAddVaccine = () => {
    navigate("/add-vaccine");
  };
  const handleAddDocument = () => {
    navigate("/upload");
  };
  const handleAddTeam = () => {
    navigate("/add-team");
  };

  const handleEditDocument = (idx: number) => {
    setEditDocIdx(idx);
    setEditDocName(
      rawDocuments[idx]?.document_name || ""
    );
  };

  const handleSaveDocumentName = async (newName: string) => {
    if (editDocIdx === null) return;
    try {
      const doc = rawDocuments[editDocIdx];
      if (!doc.id) throw new Error('No document id');
      await petServices.updateDocumentName(doc.id, newName);
      setRawDocuments((prevDocs: any[]) =>
        prevDocs.map((d, i) =>
          i === editDocIdx ? { ...d, document_name: newName } : d
        )
      );
      setEditDocIdx(null);
    } catch (err) {
      setEditDocIdx(null);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[var(--color-background)] text-[var(--color-text)]">
      <Navbar />
      <div className="container pt-8 pb-12 pr-8 pl-8 mx-auto max-w-8xl">
        <h1 className="text-3xl font-serif font-bold mb-2">Welcome {petName}!</h1>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        {loading ? (
          <div className="text-lg text-center py-8">Loading your data...</div>
        ) : (
          <>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <h2 className="text-xl font-serif font-semibold mb-2 md:mb-0">Vaccines</h2>
              <div className="flex gap-2">
                <button
                  className="border border-[var(--color-primary)] text-[var(--color-primary)] px-5 py-2 rounded-lg font-semibold flex items-center gap-2 hover:bg-[var(--color-primary)] hover:text-[var(--color-background)] transition"
                  onClick={handleAddVaccine}
                >
                  <span className="text-lg">+</span> Add New Vaccine
                </button>
              </div>
            </div>
            <VaccineSection vaccines={vaccines.slice(0, 3)} />
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <h2 className="text-xl font-serif font-semibold mb-2 md:mb-0">Recently Uploaded Documents</h2>
              <button
                className="border border-[var(--color-primary)] text-[var(--color-primary)] px-5 py-2 rounded-lg font-semibold flex items-center gap-2 hover:bg-[var(--color-primary)] hover:text-[var(--color-background)] transition"
                onClick={handleAddDocument}
              >
                <span className="text-lg">+</span> Upload New Document
              </button>
            </div>
            <DocumentSection
              documents={rawDocuments.slice(0, 3).map((doc: any) => {
                let type: 'pdf' | 'img' = 'img';
                if (doc.file_type && doc.file_type.toLowerCase() === 'pdf') {
                  type = 'pdf';
                } else if (doc.document_name) {
                  const extMatch = doc.document_name.match(/\.([a-zA-Z0-9]+)$/);
                  const ext = extMatch ? extMatch[1].toLowerCase() : '';
                  if (["jpg","jpeg","png","gif","bmp","webp","tiff","svg"].includes(ext)) {
                    type = 'img';
                  } else if (ext === 'pdf') {
                    type = 'pdf';
                  }
                }
                return {
                  id: doc.id,
                  name: doc.document_name,
                  type,
                  size: doc.size || ""
                };
              })}
              onEditDocument={handleEditDocument}
            />
            {editDocIdx !== null && (
              <RenameDocumentModal
                open={true}
                initialName={editDocName}
                onClose={() => setEditDocIdx(null)}
                onSave={handleSaveDocumentName}
              />
            )}
            <TeamSection teams={teams.slice(0, 3)} onAddTeam={handleAddTeam} />
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
