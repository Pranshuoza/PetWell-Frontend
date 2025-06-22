import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Components/Layout/Navbar";
import DocumentSection from "../../Components/Document/DocumentSection";
import TeamSection from "../../Components/Teams/TeamSection";
import VaccineSection from "../../Components/Vaccine/VaccineSection";

const vaccines = [
  {
    name: "K9 DA2PPV 3 Year (VANGUARD)",
    administered: "4/15/23",
    expires: "In 3 days",
    soon: true,
    warning: "Syd is due for the vaccine soon. Schedule now!",
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
];

const documents = [
  { name: "Syd left jaw.png", size: "3.2 MB", type: "img" },
  { name: "Dog Daze Report Card 2/15...", size: "3.2 MB", type: "pdf" },
  { name: "Full Med Record_2025.pdf", size: "3.2 MB", type: "pdf" },
  { name: "Training Plan_Syd.pdf", size: "3.2 MB", type: "pdf" },
  { name: "Full Med Record_2025.pdf", size: "3.2 MB", type: "pdf" },
  { name: "Training Plan_Syd.pdf", size: "3.2 MB", type: "pdf" },
];

const teams = [
  {
    name: "Vet Office of New York",
    type: "Vet",
    phone: "(555) 555-5555",
    email: "info@vetoffice.com",
    address: "78 Hudson St, New York",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Clean Pup Groomers",
    type: "Groomer",
    phone: "(555) 555-5555",
    email: "info@vetoffice.com",
    address: "112 W 34th St, New York",
    avatar: "https://randomuser.me/api/portraits/men/31.jpg",
  },
  {
    name: "Vet Office of New York",
    type: "Vet",
    phone: "(555) 555-5555",
    email: "info@vetoffice.com",
    address: "78 Hudson St, New York",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
];

const Home: React.FC = () => {
  const navigate = useNavigate();
  const handleAddVaccine = () => {
    navigate("/add-vaccine");
  };
  const handleAddDocument = () => {
    navigate("/upload");
  };

  return (
    <div className="min-h-screen w-full bg-[var(--color-background)] text-[var(--color-text)]">
      <Navbar
        userName="Syd"
        userImage="https://randomuser.me/api/portraits/men/32.jpg"
      />
      <div className="container pt-8 pb-12 pr-8 pl-8 mx-auto max-w-8xl">
        <h1 className="text-3xl font-serif font-bold mb-2">Welcome Syd!</h1>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <h2 className="text-xl font-serif font-semibold mb-2 md:mb-0">
            Vaccines
          </h2>
          <div className="flex gap-2">
            <button
              className="border border-[var(--color-primary)] text-[var(--color-primary)] px-5 py-2 rounded-lg font-semibold flex items-center gap-2 hover:bg-[var(--color-primary)] hover:text-[var(--color-background)] transition"
              onClick={handleAddVaccine}
            >
              <span className="text-lg">+</span> Add New Vaccine
            </button>
          </div>
        </div>
        {/* Vaccines Section */}
        <VaccineSection vaccines={vaccines} />
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <h2 className="text-xl font-serif font-semibold mb-2 md:mb-0">
            Recently Uploaded Documents
          </h2>
          <button
            className="border border-[var(--color-primary)] text-[var(--color-primary)] px-5 py-2 rounded-lg font-semibold flex items-center gap-2 hover:bg-[var(--color-primary)] hover:text-[var(--color-background)] transition"
            onClick={handleAddDocument}
          >
            <span className="text-lg">+</span> Upload New Document
          </button>
        </div>
        {/* Documents Section */}
        <DocumentSection documents={documents as any} />
        {/* Teams Section */}
        <TeamSection teams={teams} />
      </div>
    </div>
  );
};

export default Home;
