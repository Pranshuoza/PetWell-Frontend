import React, { useState, useEffect } from "react";
import { Input } from "../ui/input";
import { Syringe } from "lucide-react";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import vaccineServices from "../../Services/vaccineServices";

interface Doctor {
  id: string;
  staff_name: string;
  role_name: string;
}

interface AddVaccineProps {
  onCancel?: () => void;
  onSubmit?: (data: any) => void;
  petId: string;
  businessId: string;
}

interface VaccineOption {
  id: string;
  vaccine_name: string;
}

const AddVaccine: React.FC<AddVaccineProps> = ({
  onCancel,
  onSubmit,
  petId,
  businessId,
}) => {
  const [vaccine, setVaccine] = useState("");
  const [administered, setAdministered] = useState("");
  const [expiry, setExpiry] = useState("");
  const [doctor, setDoctor] = useState<{ id: string; name: string } | null>(
    null
  );
  const [doctorSearch, setDoctorSearch] = useState("");
  const [doctorResults, setDoctorResults] = useState<Doctor[]>([]);
  const [verified, setVerified] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [doctorLoading, setDoctorLoading] = useState(false);
  const [doctorError, setDoctorError] = useState<string | null>(null);
  const [vaccineOptions, setVaccineOptions] = useState<VaccineOption[]>([]);
  const [vaccineId, setVaccineId] = useState<string>("");

  // Search doctors as user types
  useEffect(() => {
    const fetchDoctors = async () => {
      if (!doctorSearch.trim()) {
        setDoctorResults([]);
        return;
      }
      setDoctorLoading(true);
      setDoctorError(null);
      try {
        const res = await vaccineServices.getDoctors(petId, businessId);
        console.log("Doctors Response:", res);
        const filtered = (res.data || []).filter((doc: Doctor) =>
          doc.staff_name.toLowerCase().includes(doctorSearch.toLowerCase())
        );
        setDoctorResults(filtered);
      } catch (err: any) {
        setDoctorError("Failed to fetch doctors");
      } finally {
        setDoctorLoading(false);
      }
    };
    if (doctorSearch.length > 1) fetchDoctors();
    else setDoctorResults([]);
  }, [doctorSearch, petId, businessId]);

  // Fetch vaccine options from backend (all vaccines, no petId/businessId needed)
  useEffect(() => {
    const fetchVaccines = async () => {
      try {
        const res = await vaccineServices.getAllPetVaccines(""); // Pass empty string to get all
        setVaccineOptions(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        setVaccineOptions([]);
      }
    };
    fetchVaccines();
  }, []);

  // Update vaccineId when vaccine name changes
  useEffect(() => {
    const found = vaccineOptions.find((v) => v.vaccine_name === vaccine);
    setVaccineId(found ? found.id : "");
  }, [vaccine, vaccineOptions]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    } else {
      setFile(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit({
        vaccine,
        vaccine_id: vaccineId,
        administered,
        expiry,
        doctor: doctor ? { id: doctor.id, name: doctor.name } : null,
        verified,
        file,
      });
    }
  };

  return (
    <>
      <div className="w-full flex flex-col items-center">
        <div className="flex flex-col items-center w-full">
          <Syringe className="w-12 h-12 text-[var(--color-text)] mb-4" />
          <h1 className="text-3xl font-serif font-bold mb-2">Add Vaccine</h1>
          <p className="text-lg opacity-80 mb-8 text-center">
            Start by uploading a document or fill in the vaccine info manually.
          </p>
        </div>
        {/* Upload Card */}
        <Card className="w-full max-w-md bg-[var(--color-card)] rounded-2xl shadow-xl p-8 flex flex-col items-center mb-4">
          <label
            htmlFor="vaccine-upload"
            className="flex flex-col items-center cursor-pointer w-full"
          >
            <svg
              className="w-8 h-8 mb-2 text-[var(--color-text)]"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5-5m0 0l5 5m-5-5v12"
              />
            </svg>
            <span className="text-lg text-[var(--color-text)] font-medium mb-1">
              Upload vaccine document
            </span>
            <span className="text-sm text-[var(--color-text)] opacity-70 mb-2">
              Supported formats: PDF, JPG, PNG, DOC.
            </span>
            <Input
              id="vaccine-upload"
              type="file"
              className="hidden"
              accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
              onChange={handleFileChange}
            />
          </label>
        </Card>
        <div className="w-full flex items-center my-4">
          <div className="flex-1 h-px bg-[var(--color-card)]" />
          <span className="mx-4 text-[var(--color-text)] opacity-70">Or</span>
          <div className="flex-1 h-px bg-[var(--color-card)]" />
        </div>
        {/* Form */}
        <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-[var(--color-text)] text-sm mb-1">
              Vaccine Name
            </label>
            <input
              className="w-full rounded-lg px-4 py-2 bg-[var(--color-background)] text-[var(--color-text)] border border-[var(--color-border)] mb-2"
              type="text"
              value={vaccine}
              onChange={(e) => setVaccine(e.target.value)}
              placeholder="Enter or select vaccine name"
              list="vaccine-options"
            />
            <datalist id="vaccine-options">
              {vaccineOptions.map((v) => (
                <option key={v.id} value={v.vaccine_name} />
              ))}
            </datalist>
          </div>
          <div>
            <label className="block text-[var(--color-text)] text-sm mb-1">
              Date Administered
            </label>
            <Input
              className="w-full rounded-lg px-4 py-2 bg-[var(--color-background)] text-[var(--color-text)] border border-[var(--color-border)] mb-2"
              type="date"
              value={administered}
              onChange={(e) => setAdministered(e.target.value)}
              placeholder="Select Date"
            />
          </div>
          <div>
            <label className="block text-[var(--color-text)] text-sm mb-1">
              Expiry Date
            </label>
            <Input
              className="w-full rounded-lg px-4 py-2 bg-[var(--color-background)] text-[var(--color-text)] border border-[var(--color-border)] mb-2"
              type="date"
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
              placeholder="Select Date"
            />
          </div>
          <div>
            <label className="block text-[var(--color-text)] text-sm mb-1">
              Administered By
            </label>
            <Input
              className="w-full rounded-lg px-4 py-2 bg-[var(--color-background)] text-[var(--color-text)] border border-[var(--color-border)] mb-2"
              type="text"
              value={doctorSearch}
              onChange={(e) => {
                setDoctorSearch(e.target.value);
                setDoctor(null);
              }}
              placeholder="Search doctor by name"
              autoComplete="off"
            />
            {doctorLoading && (
              <div className="text-xs text-gray-400 mt-1">Searching...</div>
            )}
            {doctorError && (
              <div className="text-xs text-red-400 mt-1">{doctorError}</div>
            )}
            {doctorResults.length > 0 && (
              <ul className="bg-[var(--color-background)] border border-[var(--color-border)] rounded-md mt-1 max-h-32 overflow-y-auto">
                {doctorResults.map((doc) => (
                  <li
                    key={doc.id}
                    className={`px-3 py-2 cursor-pointer hover:bg-[var(--color-card)] ${
                      doctor?.id === doc.id ? "bg-[var(--color-card)]" : ""
                    }`}
                    onClick={() => {
                      setDoctor({ id: doc.id, name: doc.staff_name });
                      setDoctorSearch(doc.staff_name);
                    }}
                  >
                    {doc.staff_name}{" "}
                    <span className="text-xs text-gray-400">
                      ({doc.role_name})
                    </span>
                  </li>
                ))}
              </ul>
            )}
            {doctor && (
              <div className="text-xs text-green-500 mt-1">
                Selected: {doctor.name}
              </div>
            )}
          </div>
          <div className="flex items-start gap-2 mt-2">
            <Checkbox
              id="verify-checkbox"
              checked={verified}
              onCheckedChange={(checked) => setVerified(checked === true)}
              className="mt-1 accent-[var(--color-primary)]"
            />
            <label
              htmlFor="verify-checkbox"
              className="text-[var(--color-text)] text-xs"
            >
              By selecting this box, I verify that the information here is
              correct and verifiable by a third party if needed.
            </label>
          </div>
          <div className="flex justify-between gap-4 mt-6">
            <Button
              type="button"
              variant="outline"
              className="flex-1 border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-[var(--color-background)] transition bg-transparent"
              onClick={onCancel}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-[var(--color-primary)] text-white font-semibold text-lg hover:brightness-110 transition"
            >
              Add Vaccine
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddVaccine;
