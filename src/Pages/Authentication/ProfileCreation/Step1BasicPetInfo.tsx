import React from "react";
import PetWellLogo from "../../../Assets/PetWell.png";
import Stepper from "./Stepper";
import type { FormData } from "./types";

interface Step1BasicPetInfoProps {
  form: FormData;
  setForm: React.Dispatch<React.SetStateAction<FormData>>;
  error: string | null;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  onNext: () => void;
}

const Step1BasicPetInfo: React.FC<Step1BasicPetInfoProps> = ({
  form,
  setForm,
  error,
  setError,
  onNext,
}) => {
  const validateStep1 = () => {
    if (!form.pet_name.trim()) return "Pet name is required";
    if (
      !form.pet_age ||
      isNaN(Number(form.pet_age)) ||
      Number(form.pet_age) <= 0
    )
      return "Pet age must be a positive number";
    if (!form.pet_species.trim()) return "Pet species is required";
    if (!form.pet_breed.trim()) return "Pet breed is required";
    return null;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setError("Please upload an image file");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setError("Image size must be less than 5MB");
        return;
      }
      setForm((f) => ({ ...f, pet_profile_picture: file }));
      setError(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const error = validateStep1();
    if (error) {
      setError(error);
      return;
    }
    onNext();
  };

  return (
    <div className="min-h-screen bg-[#1C232E] flex flex-col items-center justify-center w-full relative">
      <img
        src={PetWellLogo}
        alt="PetWell Logo"
        className="w-16 h-16 object-contain absolute left-20 top-10"
        style={{ left: 80, top: 40 }}
      />
      <div className="flex justify-center w-full max-w-5xl mt-12 mb-6">
        <h1 className="text-[40px] font-[Alike,serif] text-[#EBD5BD] font-normal text-center">
          Welcome to your pet's new digital home.
        </h1>
      </div>
      <div className="flex flex-col items-center flex-1 w-full max-w-5xl mx-auto">
        <Stepper currentStep={1} />
        <h2 className="text-2xl font-[Cabin,sans-serif] text-[#EBD5BD] font-normal mb-8 mt-2">
          Let's start with your pet's details
        </h2>
        <form
          className="w-full max-w-2xl flex flex-col gap-5"
          onSubmit={handleSubmit}
        >
          <div>
            <label className="block text-[#EBD5BD] text-base mb-2">
              What's your pet's name?
            </label>
            <input
              type="text"
              placeholder="Type here"
              className="w-full rounded-md px-4 py-3 text-base bg-white text-black focus:outline-none"
              value={form.pet_name}
              onChange={(e) => {
                setForm((f) => ({ ...f, pet_name: e.target.value }));
                setError(null);
              }}
              required
            />
          </div>
          <div>
            <label className="block text-[#EBD5BD] text-base mb-2">
              How old are they?
            </label>
            <input
              type="number"
              placeholder="Age in years"
              className="w-full rounded-md px-4 py-3 text-base bg-white text-black focus:outline-none"
              value={form.pet_age}
              onChange={(e) => {
                setForm((f) => ({ ...f, pet_age: e.target.value }));
                setError(null);
              }}
              required
            />
          </div>
          <div>
            <label className="block text-[#EBD5BD] text-base mb-2">
              What species are they?
            </label>
            <input
              type="text"
              placeholder="Type species ID"
              className="w-full rounded-md px-4 py-3 text-base bg-white text-black focus:outline-none"
              value={form.pet_species}
              onChange={(e) => {
                setForm((f) => ({ ...f, pet_species: e.target.value }));
                setError(null);
              }}
              required
            />
          </div>
          <div>
            <label className="block text-[#EBD5BD] text-base mb-2">
              What breed are they?
            </label>
            <input
              type="text"
              placeholder="Type breed ID"
              className="w-full rounded-md px-4 py-3 text-base bg-white text-black focus:outline-none"
              value={form.pet_breed}
              onChange={(e) => {
                setForm((f) => ({ ...f, pet_breed: e.target.value }));
                setError(null);
              }}
              required
            />
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
                {form.pet_profile_picture
                  ? form.pet_profile_picture.name
                  : "Upload image"}
              </span>
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
              />
            </label>
          </div>
          {error && <div className="text-red-400 text-sm mb-2">{error}</div>}
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

export default Step1BasicPetInfo; 