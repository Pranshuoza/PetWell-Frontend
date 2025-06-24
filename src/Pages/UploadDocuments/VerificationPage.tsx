import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import PetWellLogo from "../../Assets/PetWell.png";
import DetailSection from "../../Components/Verification/DetailSection";
import VaccineSection from "../../Components/Vaccine/VaccineSection";
import DocumentSection from "../../Components/Document/DocumentSection";
import { useNavigate } from "react-router-dom";

const pet = {
  name: "Syd",
  age: "13 years old",
  weight: "12lbs",
  breed: "Chihuahua Mix",
  color: "Brown Tan",
  microchip: "0192837465",
  birthdate: "21/8/13",
  image: "https://randomuser.me/api/portraits/men/32.jpg",
};
const user = {
  name: "Monica Lee",
  phone: "565-555-5562",
  location: "Dallas, Texas",
  email: "email@website.com",
};

const vaccines = [
  {
    name: "K9 DA2PPV 3 Year (VANGUARD)",
    administered: "4/15/23",
    expires: "4/16/25",
  },
  {
    name: "Heartgard Plus",
    administered: "4/15/23",
    expires: "4/16/25",
  },
  {
    name: "K9 Leptospira Vaccine 1 Year",
    administered: "4/15/23",
    expires: "4/16/25",
  },
  {
    name: "K9 DA2PPV 3 Year (VANGUARD)",
    administered: "4/15/23",
    expires: "4/16/25",
  },
];

const documents: { name: string; size: string; type: "img" | "pdf" }[] = [
  { name: "Full Med Record_2025.pdf", size: "3.2 MB", type: "pdf" },
  { name: "Training Plan_Syd.pdf", size: "3.2 MB", type: "pdf" },
  { name: "Syd left jaw.png", size: "3.2 MB", type: "img" },
  { name: "Dog Daze Report Card 2/15.pdf", size: "3.2 MB", type: "pdf" },
  { name: "Full Med Record_2025.pdf", size: "3.2 MB", type: "pdf" },
  { name: "Syd left jaw.png", size: "3.2 MB", type: "img" },
];

const ProfileDropdown: React.FC<{ image: string; name: string }> = ({
  image,
  name,
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div className="absolute top-8 right-8 z-50" ref={ref}>
      <button
        className="flex items-center gap-2 focus:outline-none"
        onClick={() => setOpen((v) => !v)}
      >
        <img
          src={image}
          alt={name}
          className="w-10 h-10 rounded-full object-cover border-2 border-[var(--color-background)]"
        />
        <span className="text-lg font-medium text-[var(--color-modal-foreground)]">
          {name}
        </span>
        <ChevronDown
          className="text-[var(--color-modal-foreground)]"
          size={22}
        />
      </button>
      {open && (
        <div className="absolute right-0 mt-3 bg-[var(--color-card)] rounded-2xl shadow-lg px-8 py-6 flex flex-col gap-2 min-w-[220px] z-50">
          <button className="text-[var(--color-modal-foreground)] text-lg text-left hover:underline focus:outline-none mb-2">
            Go to Profile
          </button>
          <div className="text-[var(--color-modal-foreground)] text-base">
            Not {name}?{" "}
            <button className="font-bold text-[var(--color-modal-foreground)] hover:underline focus:outline-none">
              Switch Profile
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const VerificationPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen w-screen font-sans flex flex-col items-center bg-[#101624] text-[#EBD5BD]">
      {/* Logo and Header */}
      <div className="absolute left-10 top-8">
        <img
          src={PetWellLogo}
          alt="PetWell Logo"
          className="w-12 h-12 object-contain"
        />
      </div>
      <div className="flex flex-col items-center w-full max-w-6xl mt-10 mb-4 px-8">
        <h1 className="text-4xl font-bold text-[#EBD5BD] mb-2">
          Here's what we know. Check it out!
        </h1>
        <p className="text-[#EBD5BD] opacity-80 mb-8 text-lg text-center">
          You can review, edit, or add notes before saving it to Syd's profile.
        </p>
      </div>
      <div className="w-full max-w-6xl px-8">
        {/* Details Section */}
        <DetailSection pet={pet} user={user} />
        {/* Vaccines Section */}
        <h2 className="text-xl font-semibold mb-4 mt-10">Syd's Vaccines</h2>
        <VaccineSection vaccines={vaccines} />
        {/* Uploaded Documents Section */}
        <h2 className="text-xl font-semibold mb-4 mt-10">Upload Documents</h2>
        <DocumentSection documents={documents} />
        <div className="flex justify-end gap-8 mt-8 w-full">
          <button
            className="px-8 py-3 mb-4 rounded-lg bg-[#FFA500] text-white font-semibold text-lg hover:brightness-110 transition"
            onClick={() => navigate("/home")}
          >
            Next
          </button>
        </div>
      </div>
      <ProfileDropdown image={pet.image} name={pet.name} />
    </div>
  );
};

export default VerificationPage;

declare module "*.png" {
  const value: string;
}
