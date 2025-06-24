import React, { useState } from "react";
import PetWellLogo from "../../../Assets/PetWell.png";
import ProfileCreationStep2 from "./ProfileCreationStep2";
import ProfileCreationStep3 from "./ProfileCreationStep3";
import ProfileCreationStep4 from "./ProfileCreationStep4";

const ProfileCreationStep1: React.FC = () => {
  const [step, setStep] = useState(1);

  if (step === 2) {
    return <ProfileCreationStep2 onNext={() => setStep(3)} />;
  }
  if (step === 3) {
    return <ProfileCreationStep3 onNext={() => setStep(4)} />;
  }
  if (step === 4) {
    return <ProfileCreationStep4 />;
  }

  return (
    <div className="min-h-screen bg-[#1C232E] flex flex-col items-center justify-center w-full relative">
      {/* Absolutely positioned Logo */}
      <img
        src={PetWellLogo}
        alt="PetWell Logo"
        className="w-16 h-16 object-contain absolute left-20 top-10"
        style={{ left: 80, top: 40 }}
      />
      {/* Header: Title centered */}
      <div className="flex justify-center w-full max-w-5xl mt-12 mb-6">
        <h1 className="text-[40px] font-[Alike,serif] text-[#EBD5BD] font-normal text-center">
          Welcome to your pet's new digital home.
        </h1>
      </div>
      {/* Main Content */}
      <div className="flex flex-col items-center flex-1 w-full max-w-5xl mx-auto">
        {/* Stepper */}
        <div className="flex items-center justify-center gap-8 mt-2 mb-8 w-full max-w-3xl">
          {/* Step 1 (active) */}
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full border-2 border-[#EBD5BD] flex items-center justify-center text-[#1C232E] bg-[#EBD5BD] font-bold">
              1
            </div>
            <span className="mt-2 text-xs text-[#EBD5BD] font-semibold">
              Basic Pet Info
            </span>
          </div>
          <div className="border-t border-dashed border-[#EBD5BD] flex-1 mt-4"></div>
          {/* Step 2 */}
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full border-2 border-[#EBD5BD] flex items-center justify-center text-[#EBD5BD] font-bold bg-transparent">
              2
            </div>
            <span className="mt-2 text-xs text-[#EBD5BD]">Health Basics</span>
          </div>
          <div className="border-t border-dashed border-[#EBD5BD] flex-1 mt-4"></div>
          {/* Step 3 */}
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full border-2 border-[#EBD5BD] flex items-center justify-center text-[#EBD5BD] font-bold bg-transparent">
              3
            </div>
            <span className="mt-2 text-xs text-[#EBD5BD]">Safety & ID</span>
          </div>
          <div className="border-t border-dashed border-[#EBD5BD] flex-1 mt-4"></div>
          {/* Step 4 */}
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full border-2 border-[#EBD5BD] flex items-center justify-center text-[#EBD5BD] font-bold bg-transparent">
              4
            </div>
            <span className="mt-2 text-xs text-[#EBD5BD]">Human Info</span>
          </div>
        </div>
        {/* Subtitle */}
        <h2 className="text-2xl font-[Cabin,sans-serif] text-[#EBD5BD] font-normal mb-8 mt-2">
          Let's start with your pet's details
        </h2>
        {/* Form */}
        <form
          className="w-full max-w-2xl flex flex-col gap-5"
          onSubmit={(e) => {
            e.preventDefault();
            setStep(2);
          }}
        >
          <div>
            <label className="block text-[#EBD5BD] text-base mb-2">
              What's your pet's name?
            </label>
            <input
              type="text"
              placeholder="Type here"
              className="w-full rounded-md px-4 py-3 text-base bg-white text-black focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-[#EBD5BD] text-base mb-2">
              How old are they?
            </label>
            <select className="w-full rounded-md px-4 py-3 text-base bg-white text-black focus:outline-none">
              <option>Select age</option>
            </select>
          </div>
          <div>
            <label className="block text-[#EBD5BD] text-base mb-2">
              What species are they?
            </label>
            <select className="w-full rounded-md px-4 py-3 text-base bg-white text-black focus:outline-none">
              <option>Select species</option>
            </select>
          </div>
          <div>
            <label className="block text-[#EBD5BD] text-base mb-2">
              What breed are they?
            </label>
            <select className="w-full rounded-md px-4 py-3 text-base bg-white text-black focus:outline-none">
              <option>Select breed</option>
            </select>
          </div>
          <div>
            <label className="block text-[#EBD5BD] text-base mb-2">
              Upload a profile picture!{" "}
              <span className="font-normal">(Make it boop-worthy!)</span>
            </label>
            <label className="w-full flex items-center justify-between rounded-md px-4 py-3 bg-white text-gray-500 cursor-pointer border border-gray-200">
              <span className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5-5m0 0l5 5m-5-5v12"
                  />
                </svg>
                Upload image
              </span>
              <input type="file" className="hidden" />
            </label>
          </div>
          <button
            type="submit"
            className="w-full mt-4 py-3 rounded-md bg-[#FFB23E] text-black text-lg font-semibold font-[Cabin,sans-serif] hover:bg-[#ffb733] transition-colors"
          >
            Next
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileCreationStep1;
