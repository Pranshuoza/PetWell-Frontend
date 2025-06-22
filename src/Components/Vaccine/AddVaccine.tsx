import React, { useState } from "react";
import { Input } from "../ui/input";
import { Syringe } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { Card } from "../ui/card";

const vaccineOptions = [
  "K9 DA2PPV 3 Year (VANGUARD)",
  "Heartgard Plus",
  "K9 Leptospira Vaccine 1 Year",
];
const doctorOptions = ["Dr. John Doe", "Dr. Jane Smith", "Dr. Emily Brown"];

interface AddVaccineProps {
  onCancel?: () => void;
  onSubmit?: (data: any) => void;
}

const AddVaccine: React.FC<AddVaccineProps> = ({ onCancel, onSubmit }) => {
  const [vaccine, setVaccine] = useState("");
  const [administered, setAdministered] = useState("");
  const [expiry, setExpiry] = useState("");
  const [doctor, setDoctor] = useState("");
  const [verified, setVerified] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit({ vaccine, administered, expiry, doctor, verified });
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
            <Select value={vaccine} onValueChange={setVaccine}>
              <SelectTrigger className="w-full rounded-lg px-4 py-2 bg-[var(--color-background)] text-[var(--color-text)] border border-[var(--color-border)] mb-2">
                <SelectValue placeholder="Select Vaccine" />
              </SelectTrigger>
              <SelectContent>
                {vaccineOptions.map((v, i) => (
                  <SelectItem key={i} value={v}>
                    {v}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
            <Select value={doctor} onValueChange={setDoctor}>
              <SelectTrigger className="w-full rounded-lg px-4 py-2 bg-[var(--color-background)] text-[var(--color-text)] border border-[var(--color-border)] mb-2">
                <SelectValue placeholder="Select Doctor" />
              </SelectTrigger>
              <SelectContent>
                {doctorOptions.map((d, i) => (
                  <SelectItem key={i} value={d}>
                    {d}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
