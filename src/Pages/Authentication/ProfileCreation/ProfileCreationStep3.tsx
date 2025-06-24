import React from "react";
import PetWellLogo from "../../../Assets/PetWell.png";

interface ProfileCreationStep3Props {
  onNext: () => void;
}

const ProfileCreationStep3: React.FC<ProfileCreationStep3Props> = ({
  onNext,
}) => {
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
          {/* Step 1 (completed) */}
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full border-2 border-[#EBD5BD] flex items-center justify-center text-[#1C232E] bg-[#EBD5BD] font-bold">
              1
            </div>
            <span className="mt-2 text-xs text-[#EBD5BD] font-semibold">
              Basic Pet Info
            </span>
          </div>
          <div className="border-t border-dashed border-[#EBD5BD] flex-1 mt-4"></div>
          {/* Step 2 (completed) */}
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full border-2 border-[#EBD5BD] flex items-center justify-center text-[#1C232E] bg-[#EBD5BD] font-bold">
              2
            </div>
            <span className="mt-2 text-xs text-[#EBD5BD] font-semibold">
              Health Basics
            </span>
          </div>
          <div className="border-t border-dashed border-[#EBD5BD] flex-1 mt-4"></div>
          {/* Step 3 (active) */}
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full border-2 border-[#EBD5BD] flex items-center justify-center text-[#1C232E] bg-[#EBD5BD] font-bold">
              3
            </div>
            <span className="mt-2 text-xs text-[#EBD5BD] font-semibold">
              Safety & ID
            </span>
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
          Next, a quick check for safety & ID
        </h2>
        {/* Form */}
        <form
          className="w-full max-w-2xl flex flex-col gap-5"
          onSubmit={(e) => {
            e.preventDefault();
            onNext();
          }}
        >
          <div>
            <label className="block text-[#EBD5BD] text-base mb-2">
              What is your pet's microchip number?
            </label>
            <input
              type="text"
              placeholder="Type here"
              className="w-full rounded-md px-4 py-3 text-base bg-white text-black focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-[#EBD5BD] text-base mb-2">
              Any quirks, meds, or special needs?
            </label>
            <input
              type="text"
              placeholder="Type here"
              className="w-full rounded-md px-4 py-3 text-base bg-white text-black focus:outline-none"
            />
          </div>
          <div className="flex gap-4 mt-4">
            <button
              type="button"
              className="w-1/2 py-3 rounded-md border border-[#FFB23E] text-[#FFB23E] text-lg font-semibold font-[Cabin,sans-serif] hover:bg-[#FFB23E] hover:text-black transition-colors bg-transparent"
              onClick={onNext}
            >
              Skip For Now
            </button>{" "}
            <button
              type="submit"
              className="w-1/2 py-3 rounded-md bg-[#FFB23E] text-black text-lg font-semibold font-[Cabin,sans-serif] hover:bg-[#ffb733] transition-colors"
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileCreationStep3;
