import React from "react";
import Navbar from "../../Components/Layout/Navbar";
import VaccineInfo from "../../Components/VaccineInfo";

const Home: React.FC = () => {
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
  ];

  const documents = [
    { name: "Syd left jaw.png", size: "3.2 MB" },
    { name: "Dog Daze Report Car...", size: "3.2 MB" },
    { name: "Full Med Record_202...", size: "3.2 MB" },
    { name: "Training Plan_Syd.pdf", size: "3.2 MB" },
  ];

  return (
    <div className="fixed inset-0 bg-[#101624] text-white overflow-hidden min-h-screen w-screen">
      <Navbar
        userName="Syd"
        userImage="https://randomuser.me/api/portraits/men/32.jpg"
      />
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
            <div className="grid grid-cols-1 gap-6">
              {vaccines.map((vaccine, index) => (
                <VaccineInfo
                  key={index}
                  name={vaccine.name}
                  administered={vaccine.administered}
                  expires={vaccine.expires}
                  soon={vaccine.soon}
                  warning={vaccine.warning}
                  showEdit={true}
                  onEdit={() => {
                    /* Add edit logic here if needed */
                  }}
                />
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
                  <span className="mx-2 text-[#EBD5BD] text-sm">
                    {doc.size}
                  </span>
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
