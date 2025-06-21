import React from "react";
import Navbar from "../../Components/Layout/Navbar";
import VaccineBox from "../../Components/Vaccine/VaccineBox";
import DocumentSection from "../../Components/Document/DocumentSection";
import TeamSection from "../../Components/Teams/TeamSection";

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
  return (
    <div className="min-h-screen w-full bg-[var(--color-background)] text-[var(--color-text)]">
      <Navbar
        userName="Syd"
        userImage="https://randomuser.me/api/portraits/men/32.jpg"
      />
      <div className="container pt-8 pb-10 mx-auto max-w-8xl">
        <h1 className="text-3xl font-serif font-bold mb-2">Welcome Syd!</h1>
        {/* Vaccines Section */}
        <VaccineBox vaccines={vaccines} />
        {/* Documents Section */}
        <DocumentSection documents={documents as any} />
        {/* Teams Section */}
        <TeamSection teams={teams} />
      </div>
    </div>
  );
};

export default Home;
