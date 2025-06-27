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
  email: string;
  business?: {
    id: string;
    business_name: string;
  };
  // role_name?: string; // Only if your backend adds this in the future
}

interface AddVaccineProps {
  onCancel?: () => void;
  onSubmit?: (data: any) => void;
  petId: string;
}

const AddVaccine: React.FC<AddVaccineProps> = ({
  onCancel,
  onSubmit,
  petId,
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
  const [manualError, setManualError] = useState<string | null>(null);

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
        const res = await vaccineServices.getDoctors(petId, "");
        const doctors = Array.isArray(res) ? res : [];
        console.log("Fetched doctors:", doctors);
        const results = doctors
          .filter((d: any) =>
            d.staff_name?.toLowerCase().includes(doctorSearch.toLowerCase())
          )
          .map((d: any) => ({
            id: d.id,
            staff_name: d.staff_name || d.email || "Doctor",
            email: d.email || "",
            business: d.business,
          }));
        console.log("Doctor search results:", results);
        setDoctorResults(results);
      } catch (err: any) {
        setDoctorError("Failed to fetch doctors");
      } finally {
        setDoctorLoading(false);
      }
    };
    if (doctorSearch.length > 0) fetchDoctors();
    else setDoctorResults([]);
  }, [doctorSearch, petId]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    } else {
      setFile(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setManualError(null);
    if (onSubmit) {
      // If no file, require all manual fields and show caution for missing fields
      if (!file) {
        if (!vaccine || !administered || !expiry || !doctor) {
          setManualError(
            "Please fill all manual fields: Vaccine Name, Date Administered, Expiry Date, and Doctor."
          );
          return;
        }
      }
      // Debug logs for submission
      // console.log("Submitting vaccine form with:", {
      //   vaccine,
      //   administered,
      //   expiry,
      //   doctor,
      //   verified,
      //   file,
      // });
      onSubmit({
        vaccine,
        administered,
        expiry,
        doctor: doctor ? { id: doctor.id, name: doctor.name } : null,
        verified,
        file: file || undefined, // Ensure file is undefined if not provided
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
            />
          </div>
          <div>
            <label className="block text-[var(--color-text)] text-sm mb-1">
              Date Administered
            </label>
            <Input
              className="w-full rounded-lg px-4 py-2 bg-[var(--color-background)] text-[var,--color-text)] border border-[var(--color-border)] mb-2"
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
              className="w-full rounded-lg px-4 py-2 bg-[var(--color-background)] text-[var,--color-text)] border border-[var(--color-border)] mb-2"
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
            <div className="w-full flex flex-col relative">
              <Input
                className="w-full rounded-lg px-4 py-2 bg-[var(--color-background)] text-[var,--color-text)] border border-[var(--color-border)] mb-2"
                type="text"
                value={doctorSearch}
                onChange={(e) => {
                  setDoctorSearch(e.target.value);
                  setDoctor(null);
                }}
                placeholder="Search doctor by name"
                autoComplete="off"
              />
              {doctorResults.length > 0 &&
                doctorSearch &&
                !doctor &&
                ((() => {
                  console.log("Rendering doctor dropdown", doctorResults);
                  return null;
                })(),
                (
                  <div
                    className="absolute left-0 right-0 mt-1 bg-white rounded-xl shadow-lg z-10 border border-[#ececec] overflow-hidden"
                    style={{ width: "100%" }}
                  >
                    {doctorResults.map((doc, idx) => {
                      const name = doc.staff_name || "";
                      const searchIndex = name
                        .toLowerCase()
                        .indexOf(doctorSearch.toLowerCase());
                      let displayName;
                      if (doctorSearch && searchIndex !== -1) {
                        displayName = (
                          <>
                            {name.substring(0, searchIndex)}
                            <b>
                              {name.substring(
                                searchIndex,
                                searchIndex + doctorSearch.length
                              )}
                            </b>
                            {name.substring(searchIndex + doctorSearch.length)}
                          </>
                        );
                      } else {
                        displayName = name;
                      }
                      return (
                        <div
                          key={doc.id}
                          className={`flex flex-col px-4 py-3 cursor-pointer hover:bg-[var(--color-card)] border-b ${
                            idx === doctorResults.length - 1
                              ? "border-b-0"
                              : "border-[#ececec]"
                          }`}
                          onClick={() => {
                            setDoctor({ id: doc.id, name: doc.staff_name });
                            setDoctorSearch(doc.staff_name);
                          }}
                        >
                          <span className="font-semibold text-base text-[#232b3e]">
                            {displayName}
                          </span>
                          <span className="text-xs text-[#232b3e] opacity-70">
                            {doc.email}
                            {doc.business && doc.business.business_name
                              ? ` ${doc.business.business_name}`
                              : ""}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                ))}
            </div>
            {doctorLoading && (
              <div className="text-xs text-gray-400 mt-1">Searching...</div>
            )}
            {doctorError && (
              <div className="text-xs text-red-400 mt-1">{doctorError}</div>
            )}
            {doctor && (
              <div className="text-xs text-green-500 mt-1">
                Selected: {doctor.name}
                {(() => {
                  const found = doctorResults.find((d) => d.id === doctor.id);
                  return found && found.business && found.business.business_name
                    ? ` (${found.business.business_name})`
                    : "";
                })()}
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
          {manualError && (
            <div className="text-xs text-red-500 mb-2">{manualError}</div>
          )}
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
