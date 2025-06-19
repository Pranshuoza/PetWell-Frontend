import React, { useState } from "react";
import PetWellLogo from "../../Assets/PetWell.png";

const Home: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const vaccines = [
    {
      name: "K9 DA2PPV 3 Year (VANGUARD)",
      administered: "4/15/23",
      expires: "In 3 days",
      alert:
        "It looks like Syd is due for a vaccine. Schedule an appointment now",
    },
    {
      name: "Heartgard Plus",
      administered: "4/15/23",
      expires: "4/16/25",
    },
  ];

  const documents = [
    { name: "Syd left jaw.png", size: "3.2 MB" },
    { name: "Dog Daze Report Car...", size: "3.2 MB" },
    { name: "Full Med Record_202...", size: "3.2 MB" },
    { name: "Training Plan_Syd.pdf", size: "3.2 MB" },
  ];

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleEditProfile = () => {
    console.log("Edit Profile clicked");
    setIsDropdownOpen(false);
  };

  const handleSwitchProfile = () => {
    console.log("Switch Profile clicked");
    setIsDropdownOpen(false);
  };

  const handleSettings = () => {
    console.log("Settings clicked");
    setIsDropdownOpen(false);
  };

  return (
    <div className="fixed inset-0 bg-[#1C232E] text-[#EBD5BD] overflow-hidden min-h-screen w-screen font-sans">
      {/* Top Navigation Bar */}
      <nav className="flex items-center justify-between px-12 py-6 bg-transparent">
        <div className="flex items-center space-x-4">
          <img
            src={PetWellLogo}
            alt="PetWell Logo"
            className="w-10 h-10 object-contain"
          />
        </div>
        <div className="flex space-x-20 text-lg font-medium">
          <a href="#" className="hover:text-[#FFA500] transition">
            Home
          </a>
          <a href="#" className="hover:text-[#FFA500] transition">
            Vaccines
          </a>
          <a href="#" className="hover:text-[#FFA500] transition">
            Documents
          </a>
          <a href="#" className="hover:text-[#FFA500] transition">
            Team
          </a>
        </div>
        <div className="relative flex items-center space-x-3">
          <span className="text-white font-semibold">Syd</span>
          <div className="relative">
            <button
              onClick={handleDropdownToggle}
              className="flex items-center space-x-2 focus:outline-none"
            >
              <img
                src=""
                alt="User"
                className="w-10 h-10 rounded-full object-cover border-2 border-[#FFA500]"
              />
              <svg
                className={`w-4 h-4 text-[#EBD5BD] transition-transform ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            
            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-[#2A3441] rounded-lg shadow-lg border border-[#3A4551] z-50">
                <div className="py-2">
                  <button
                    onClick={handleEditProfile}
                    className="flex items-center w-full px-4 py-2 text-sm text-[#EBD5BD] hover:bg-[#3A4551] hover:text-[#FFA500] transition"
                  >
                    Edit Profile Info
                  </button>
                  
                  <button
                    onClick={handleSwitchProfile}
                    className="flex items-center w-full px-4 py-2 text-sm text-[#EBD5BD] hover:bg-[#3A4551] hover:text-[#FFA500] transition"
                  >
                    Not Syd? Switch Profile
                  </button>
                                    
                  <button
                    onClick={handleSettings}
                    className="flex items-center w-full px-4 py-2 text-sm text-[#EBD5BD] hover:bg-[#3A4551] hover:text-[#FFA500] transition"
                  >
                    Settings
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      <div className="flex items-center text-3xl font-serif font-semibold justify-between px-16 py-4 ">
        <span>Welcome Syd!</span>
      </div>

      {/* Main Content */}
      <div className="px-16 pt-2 pb-8">
        {/* Main Headings Row */}
        <div className="flex flex-row justify-between items-end mb-8">
          {/* Vaccines Heading */}
          <div className="w-[32%]">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-serif font-semibold mb-0">
                Vaccines
              </h2>
              <span className="text-[#FFA500] text-base cursor-pointer font-sans font-medium hover:underline">
                View All &gt;
              </span>
            </div>
          </div>
          {/* Recently Uploaded Documents Heading and Button */}
          <div className="w-[64%] flex items-center justify-between ml-8">
            <h2 className="text-2xl font-serif font-semibold mb-0">
              Recently Uploaded Documents
            </h2>
            <button className="px-6 py-2 border border-[#FFA500] text-[#FFA500] rounded-lg font-semibold hover:bg-[#FFA500] hover:text-white transition font-sans text-base ml-4">
              Upload New Document
            </button>
          </div>
        </div>
        <div className="flex flex-row justify-between items-start gap-8">
          {/* Vaccines Section */}
          <div className="w-[32%]">
            <div className="space-y-6">
              {vaccines.map((vaccine, index) => (
                <div
                  key={index}
                  className="bg-[#EBD5BD1A] rounded-2xl shadow-lg p-6 relative border border-[#232b41] text-[#EBD5BD]"
                  >
                  <div className="flex items-center mb-3">
                    <button className="absolute right-4 text-gray-400 text-sm hover:text-[#FFA500] font-medium">
                      Edit
                    </button>
                    <span className="mr-4  text-xl text-[#E3D0BA]">💉</span>
                  </div>
                  <div className="flex items-center mb-3 font-bold text-left text-xl text-[#EBD5BD]">
                      {vaccine.name}
                  </div>
                  {/* Dates - Fixed Layout */}
                  <div className="grid grid-cols-3 gap-4 mt-2 text-left">
                    <div>
                      <div className="text-gray-400 text-sm font-normal">
                        Administered
                      </div>
                      <div className="font-bold text-left text-[#EBD5BD]">
                        {vaccine.administered}
                      </div>
                    </div>
                    <div className="text-left">
                      <div className="text-gray-400 text-sm font-normal">
                        Expires
                      </div>
                      <div className="font-bold text-base text-[#EBD5BD] flex items-center">
                        {vaccine.expires}
                        {vaccine.alert && (
                          <span className="text-[#FF5A5F] text-lg  ml-1">❗</span>
                        )}
                      </div>
                    </div>
                    <div></div> {/* Empty third column for spacing */}
                  </div>
                  {/* Divider */}
                  {vaccine.alert && (
                    <hr className="my-3 border-gray-600 opacity-40" />
                  )}
                  {/* Alert */}
                  {vaccine.alert && (
                    <div className="text-[#EBD5BD] text-sm flex items-start">
                      <span className="text-lg mt-0.5">❗</span>
                      <span>{vaccine.alert}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          {/* Recently Uploaded Documents Section */}
          <div className="w-[65%] ml-8">
            <div className="grid grid-cols-2 gap-6">
              {documents.map((doc, index) => (
                <div
                  key={index}
                  className="flex items-center bg-[#EBD5BD1A] rounded-xl px-4 py-3 shadow-md border border-[#232b41]"
                >
                  <div
                    className={`w-8 h-8 flex items-center justify-center rounded-full mr-3 font-bold text-xs ${
                      doc.name.endsWith(".pdf") ? "bg-red-600" : "bg-green-600"
                    }`}
                  >
                    {doc.name.endsWith(".pdf") ? (
                      <span className="text-white">PDF</span>
                    ) : (
                      <span className="text-white">IMG</span>
                    )}
                  </div>
                  <span className="flex-1 truncate text-base font-medium text-[#F5F5F5]">
                    {doc.name}
                  </span>
                  <span className="mx-2 text-[#EBD5BD] text-sm">{doc.size}</span>
                  <button className="ml-2 text-gray-400 hover:text-red-500 text-xl">
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;