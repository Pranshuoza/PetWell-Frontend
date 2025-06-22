import React from "react";
import DetailSection from "../../Components/Verification/DetailSection";
import VaccineSection from "../../Components/Vaccine/VaccineSection";
import DocumentSection from "../../Components/Document/DocumentSection";
import { UserCircle } from "lucide-react";

const VerificationPage: React.FC = () => {
  // Example data (replace with real data or props/state as needed)
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

  // Example vaccine and document data (replace with real data)
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
  type Document = { name: string; size: string; type: "pdf" | "img" };
  const documents: Document[] = [
    { name: "Full Med Record_2025.pdf", size: "3.2 MB", type: "pdf" },
    { name: "Syd left jaw.png", size: "3.2 MB", type: "img" },
    { name: "Dog Daze Report Card 2/15.pdf", size: "3.2 MB", type: "pdf" },
    { name: "Training Plan_Syd.pdf", size: "3.2 MB", type: "pdf" },
    { name: "Full Med Record_2025.pdf", size: "3.2 MB", type: "pdf" },
    { name: "Training Plan_Syd.pdf", size: "3.2 MB", type: "pdf" },
  ];

  return (
    <div className="min-h-screen w-full bg-[#181f27] text-[var(--color-text)] font-sans pb-16">
      {/* Header */}
      <div className="flex items-center justify-between px-12 pt-8">
        <div className="flex items-center gap-4">
          <UserCircle className="w-10 h-10 text-[var(--color-primary)]" />
          <span className="text-2xl font-bold text-[var(--color-heading)]">
            Here’s what we know. Check it out!
          </span>
        </div>
        <div className="flex items-center gap-2">
          <img
            src={pet.image}
            alt="Pet profile"
            className="w-10 h-10 rounded-full border-2 border-[var(--color-primary)]"
          />
          <span className="text-lg font-semibold text-[var(--color-text)]">
            Syd
          </span>
        </div>
      </div>
      <div className="text-center text-lg text-[var(--color-label)] mt-2 mb-2">
        You can review, edit, or add notes before saving it to Syd’s profile.
      </div>
      {/* Details Section */}
      <div className="flex flex-wrap gap-8 justify-start px-12 mt-6">
        <DetailSection pet={pet} user={user} />
      </div>
      {/* Vaccines Section */}
      <div className="px-12 mt-10">
        <span className="text-xl font-semibold text-[var(--color-heading)] block mb-4">
          Syd’s Vaccines
        </span>
        <VaccineSection vaccines={vaccines} />
      </div>
      {/* Documents Section */}
      <div className="px-12 mt-10">
        <span className="text-xl font-semibold text-[var(--color-heading)] block mb-4">
          Uploaded Documents
        </span>
        <DocumentSection documents={documents} />
      </div>
      {/* Next Button */}
      <div className="flex justify-end px-12 mt-10">
        <button className="bg-[var(--color-primary)] text-white font-semibold rounded-lg px-12 py-3 text-lg hover:brightness-110 transition">
          Next
        </button>
      </div>
    </div>
  );
};

export default VerificationPage;
