import React, { useState } from "react";
import PetWellLogo from "../../../Assets/PetWell.png";
import ProfileCreationSuccessModal from "./ProfileCreationSuccessModal";
import { useNavigate } from "react-router-dom";
import authServices from "../../../Services/authServices";

interface FormData {
  pet_name: string;
  pet_age: string;
  pet_species: string;
  pet_breed: string;
  pet_profile_picture?: File;
  pet_weight: string;
  pet_spay_neuter: string;
  pet_color: string;
  pet_dob: string;
  pet_microchip: string;
  pet_notes: string;
  owner_name: string;
  owner_location: string;
  owner_phone: string;
  owner_email: string;
  owner_password: string;
  owner_username: string;
}

const ProfileCreation: React.FC = () => {
  const [step, setStep] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [otp, setOtp] = useState("");
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpError, setOtpError] = useState<string | null>(null);
  const [resentMessage, setResentMessage] = useState<string | null>(null);
  const navigate = useNavigate();
  const [form, setForm] = useState<FormData>({
    pet_name: "",
    pet_age: "",
    pet_species: "",
    pet_breed: "",
    pet_profile_picture: undefined,
    pet_weight: "",
    pet_spay_neuter: "",
    pet_color: "",
    pet_dob: "",
    pet_microchip: "",
    pet_notes: "",
    owner_name: "",
    owner_location: "",
    owner_phone: "",
    owner_email: "",
    owner_password: "",
    owner_username: "",
  });

  const goToStep = (newStep: number) => {
    setError(null);
    setOtpError(null);
    setResentMessage(null);
    setStep(newStep);
  };

  const resetForm = () => {
    setForm({
      pet_name: "",
      pet_age: "",
      pet_species: "",
      pet_breed: "",
      pet_profile_picture: undefined,
      pet_weight: "",
      pet_spay_neuter: "",
      pet_color: "",
      pet_dob: "",
      pet_microchip: "",
      pet_notes: "",
      owner_name: "",
      owner_location: "",
      owner_phone: "",
      owner_email: "",
      owner_password: "",
      owner_username: "",
    });
    setOtp("");
    setStep(1);
  };

  const Stepper = () => (
    <div className="flex items-center justify-center gap-8 mt-2 mb-8 w-full max-w-3xl">
      {[1, 2, 3, 4, 5].map((n) => (
        <React.Fragment key={n}>
          <div className="flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full border-2 border-[#EBD5BD] flex items-center justify-center font-bold ${
                step === n || step > n
                  ? "text-[#1C232E] bg-[#EBD5BD]"
                  : "text-[#EBD5BD] bg-transparent"
              }`}
            >
              {n}
            </div>
            <span
              className={`mt-2 text-xs text-[#EBD5BD]${
                step === n ? " font-semibold" : ""
              }`}
            >
              {n === 1 && "Basic Pet Info"}
              {n === 2 && "Health Basics"}
              {n === 3 && "Safety & ID"}
              {n === 4 && "Human Info"}
              {n === 5 && "OTP Verification"}
            </span>
          </div>
          {n < 5 && (
            <div className="border-t border-dashed border-[#EBD5BD] flex-1 mt-4"></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );

  // Step 1: Basic Pet Info
  if (step === 1) {
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
          <Stepper />
          <h2 className="text-2xl font-[Cabin,sans-serif] text-[#EBD5BD] font-normal mb-8 mt-2">
            Let's start with your pet's details
          </h2>
          <form
            className="w-full max-w-2xl flex flex-col gap-5"
            onSubmit={(e) => {
              e.preventDefault();
              setError(null);
              const error = validateStep1();
              if (error) {
                setError(error);
                return;
              }
              goToStep(2);
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
  }

  // Step 2: Health Basics
  if (step === 2) {
    const validateStep2 = () => {
      if (
        !form.pet_weight ||
        isNaN(Number(form.pet_weight)) ||
        Number(form.pet_weight) <= 0
      )
        return "Pet weight must be a positive number";
      if (!form.pet_spay_neuter) return "Spay/neuter status is required";
      if (!form.pet_color.trim()) return "Pet color is required";
      if (!form.pet_dob) return "Date of birth is required";
      return null;
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
          <Stepper />
          <h2 className="text-2xl font-[Cabin,sans-serif] text-[#EBD5BD] font-normal mb-8 mt-2">
            Now a few quick health details...
          </h2>
          <form
            className="w-full max-w-2xl flex flex-col gap-5"
            onSubmit={(e) => {
              e.preventDefault();
              setError(null);
              const error = validateStep2();
              if (error) {
                setError(error);
                return;
              }
              goToStep(3);
            }}
          >
            <div>
              <label className="block text-[#EBD5BD] text-base mb-2">
                What's your pet's weight?
              </label>
              <input
                type="number"
                step="0.1"
                placeholder="Weight in kg"
                className="w-full rounded-md px-4 py-3 text-base bg-white text-black focus:outline-none"
                value={form.pet_weight}
                onChange={(e) => {
                  setForm((f) => ({ ...f, pet_weight: e.target.value }));
                  setError(null);
                }}
                required
              />
            </div>
            <div>
              <label className="block text-[#EBD5BD] text-base mb-2">
                What's your pet's spay/neuter status?
              </label>
              <select
                className="w-full rounded-md px-4 py-3 text-base bg-white text-black focus:outline-none"
                value={form.pet_spay_neuter}
                onChange={(e) => {
                  setForm((f) => ({ ...f, pet_spay_neuter: e.target.value }));
                  setError(null);
                }}
                required
              >
                <option value="">Select status</option>
                <option value="true">Spayed/Neutered</option>
                <option value="false">Intact</option>
              </select>
            </div>
            <div>
              <label className="block text-[#EBD5BD] text-base mb-2">
                What's your pet's colour?
              </label>
              <input
                type="text"
                placeholder="Type colour"
                className="w-full rounded-md px-4 py-3 text-base bg-white text-black focus:outline-none"
                value={form.pet_color}
                onChange={(e) => {
                  setForm((f) => ({ ...f, pet_color: e.target.value }));
                  setError(null);
                }}
                required
              />
            </div>
            <div>
              <label className="block text-[#EBD5BD] text-base mb-2">
                What's your pet's date of birth?
              </label>
              <input
                type="date"
                className="w-full rounded-md px-4 py-3 text-base bg-white text-black focus:outline-none"
                value={form.pet_dob}
                onChange={(e) => {
                  setForm((f) => ({ ...f, pet_dob: e.target.value }));
                  setError(null);
                }}
                required
              />
            </div>
            {error && <div className="text-red-400 text-sm mb-2">{error}</div>}
            <div className="flex gap-4 mt-4">
              <button
                type="button"
                className="w-1/2 py-3 rounded-md border border-[#FFB23E] text-[#FFB23E] text-lg font-semibold font-[Cabin,sans-serif] hover:bg-[#FFB23E] hover:text-black transition-colors bg-transparent"
                onClick={() => goToStep(3)}
              >
                Skip For Now
              </button>
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
  }

  // Step 3: Safety & ID
  if (step === 3) {
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
          <Stepper />
          <h2 className="text-2xl font-[Cabin,sans-serif] text-[#EBD5BD] font-normal mb-8 mt-2">
            Next, a quick check for safety & ID
          </h2>
          <form
            className="w-full max-w-2xl flex flex-col gap-5"
            onSubmit={(e) => {
              e.preventDefault();
              setError(null);
              goToStep(4);
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
                value={form.pet_microchip}
                onChange={(e) => {
                  setForm((f) => ({ ...f, pet_microchip: e.target.value }));
                  setError(null);
                }}
              />
            </div>
            <div>
              <label className="block text-[#EBD5BD] text-base mb-2">
                Any quirks, meds, or special needs?
              </label>
              <textarea
                placeholder="Type here"
                rows={3}
                className="w-full rounded-md px-4 py-3 text-base bg-white text-black focus:outline-none resize-none"
                value={form.pet_notes}
                onChange={(e) => {
                  setForm((f) => ({ ...f, pet_notes: e.target.value }));
                  setError(null);
                }}
              />
            </div>
            <div className="flex gap-4 mt-4">
              <button
                type="button"
                className="w-1/2 py-3 rounded-md border border-[#FFB23E] text-[#FFB23E] text-lg font-semibold font-[Cabin,sans-serif] hover:bg-[#FFB23E] hover:text-black transition-colors bg-transparent"
                onClick={() => goToStep(4)}
              >
                Skip For Now
              </button>
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
  }

  // Step 4: Human Info
  if (step === 4) {
    const validateStep4 = () => {
      if (!form.owner_name.trim()) return "Owner name is required";
      if (!form.owner_location.trim()) return "Location is required";
      if (!/^\+?[1-9]\d{1,14}$/.test(form.owner_phone))
        return "Invalid phone number";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.owner_email))
        return "Invalid email address";
      if (form.owner_password.length < 8)
        return "Password must be at least 8 characters";
      if (!form.owner_username.trim()) return "Username is required";
      return null;
    };

    const handleStep4Submit = async (e: React.FormEvent) => {
      e.preventDefault();
      setError(null);
      // Validation
      const error = validateStep4();
      if (error) {
        setError(error);
        return;
      }
      setLoading(true);
      try {
        console.log("=== DEBUGGING FORM SUBMISSION ===");
        console.log("Form state before FormData:", form);
        // Check if required fields are present
        const requiredFields = [
          "owner_name",
          "owner_email",
          "owner_location",
          "owner_phone",
          "owner_password",
          "owner_username",
          "pet_name",
          "pet_age",
          "pet_species",
          "pet_breed",
        ];
        const missingFields = requiredFields.filter(
          (field) => !form[field as keyof typeof form]
        );
        if (missingFields.length > 0) {
          throw new Error(
            `Missing required fields: ${missingFields.join(", ")}`
          );
        }
        const formData = new FormData();
        // Human owner data
        formData.append("human_owner_name", form.owner_name.trim());
        formData.append("email", form.owner_email.trim());
        formData.append("location", form.owner_location.trim());
        formData.append("phone", form.owner_phone.trim());
        formData.append("password", form.owner_password);
        formData.append("username", form.owner_username.trim());
        // Pet data - ensure proper field names match backend expectations
        formData.append("pet_name", form.pet_name.trim());
        formData.append("pet_age", form.pet_age.toString());
        formData.append("pet_species_id", form.pet_species.trim());
        formData.append("pet_breed_id", form.pet_breed.trim());
        // Optional pet data - only append if not empty
        if (form.pet_weight && form.pet_weight.trim()) {
          formData.append("pet_weight", form.pet_weight.toString());
        }
        if (form.pet_spay_neuter) {
          formData.append("pet_spay_neuter", form.pet_spay_neuter);
        }
        if (form.pet_color && form.pet_color.trim()) {
          formData.append("pet_color", form.pet_color.trim());
        }
        if (form.pet_dob && form.pet_dob.trim()) {
          formData.append("pet_dob", form.pet_dob);
        }
        if (form.pet_microchip && form.pet_microchip.trim()) {
          formData.append("pet_microchip", form.pet_microchip.trim());
        }
        if (form.pet_notes && form.pet_notes.trim()) {
          formData.append("pet_notes", form.pet_notes.trim());
        }
        // Profile picture handling
        if (form.pet_profile_picture) {
          formData.append("profile_picture", form.pet_profile_picture);
          formData.append(
            "document_name",
            `${form.pet_name.trim()} Profile Picture`
          );
          const fileExtension =
            form.pet_profile_picture.name.split(".").pop()?.toUpperCase() ||
            "JPG";
          formData.append("file_type", fileExtension);
        }
        // Debug FormData
        console.log("FormData entries:");
        const entries = Array.from(formData.entries());
        entries.forEach(([key, value]) => {
          console.log(
            `${key}: ${
              value instanceof File
                ? `FILE: ${value.name} (${value.size} bytes)`
                : value
            }`
          );
        });
        if (entries.length === 0) {
          throw new Error("FormData is empty. Please check form inputs.");
        }
        console.log("About to make API call...");
        // console.log("SERVER_BASE_URL:", SERVER_BASE_URL); // Make sure this is defined
        // Make the API call with enhanced error handling
        const response = await authServices.signupHumanOwnerWithPet(formData);
        console.log("API call successful!", response);
        goToStep(5);
      } catch (err: any) {
        console.error("=== SIGNUP ERROR DETAILS ===");
        console.error("Error object:", err);
        console.error("Error name:", err.name);
        console.error("Error message:", err.message);
        console.error("Error stack:", err.stack);
        if (err.response) {
          console.error("Response status:", err.response.status);
          console.error("Response data:", err.response.data);
          console.error("Response headers:", err.response.headers);
        } else if (err.request) {
          console.error("Request made but no response:", err.request);
        } else {
          console.error("Error setting up request:", err.message);
        }
        // Specific error messages based on error type
        let errorMessage = "Failed to create profile. Please try again.";
        if (!err.response && !err.request) {
          errorMessage =
            "Network error. Please check your internet connection.";
        } else if (err.code === "NETWORK_ERROR") {
          errorMessage =
            "Network error. Please check your connection and try again.";
        } else if (err.code === "TIMEOUT") {
          errorMessage = "Request timed out. Please try again.";
        } else if (err.response?.status === 400) {
          errorMessage =
            err.response.data?.message ||
            "Invalid data provided. Please check your inputs.";
        } else if (err.response?.status === 409) {
          errorMessage =
            "Email or username already exists. Please use different credentials.";
        } else if (err.response?.status >= 500) {
          errorMessage = "Server error. Please try again later.";
        } else if (err.response?.data?.message) {
          errorMessage = err.response.data.message;
        }
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
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
          <Stepper />
          <h2 className="text-2xl font-[Cabin,sans-serif] text-[#EBD5BD] font-normal mb-2 mt-2">
            Now, a little about you.
          </h2>
          <p className="text-sm text-[#EBD5BD] mb-8">
            Required to assign ownership and enable sharing
          </p>
          <form
            className="w-full max-w-2xl flex flex-col gap-5"
            onSubmit={handleStep4Submit}
          >
            <div>
              <label className="block text-[#EBD5BD] text-base mb-2">
                What is your name?
              </label>
              <input
                type="text"
                placeholder="Type here"
                className="w-full rounded-md px-4 py-3 text-base bg-white text-black focus:outline-none"
                value={form.owner_name}
                onChange={(e) => {
                  setForm((f) => ({ ...f, owner_name: e.target.value }));
                  setError(null);
                }}
                required
              />
            </div>
            <div>
              <label className="block text-[#EBD5BD] text-base mb-2">
                What is your location?
              </label>
              <input
                type="text"
                placeholder="Type here"
                className="w-full rounded-md px-4 py-3 text-base bg-white text-black focus:outline-none"
                value={form.owner_location}
                onChange={(e) => {
                  setForm((f) => ({ ...f, owner_location: e.target.value }));
                  setError(null);
                }}
                required
              />
            </div>
            <div>
              <label className="block text-[#EBD5BD] text-base mb-2">
                What is your phone number?
              </label>
              <input
                type="text"
                placeholder="Type here"
                className="w-full rounded-md px-4 py-3 text-base bg-white text-black focus:outline-none"
                value={form.owner_phone}
                onChange={(e) => {
                  setForm((f) => ({ ...f, owner_phone: e.target.value }));
                  setError(null);
                }}
                required
              />
            </div>
            <div>
              <label className="block text-[#EBD5BD] text-base mb-2">
                What is your email ID?
              </label>
              <input
                type="email"
                placeholder="Type here"
                className="w-full rounded-md px-4 py-3 text-base bg-white text-black focus:outline-none"
                value={form.owner_email}
                onChange={(e) => {
                  setForm((f) => ({ ...f, owner_email: e.target.value }));
                  setError(null);
                }}
                required
              />
            </div>
            <div>
              <label className="block text-[#EBD5BD] text-base mb-2">
                Choose a username
              </label>
              <input
                type="text"
                placeholder="Username"
                className="w-full rounded-md px-4 py-3 text-base bg-white text-black focus:outline-none"
                value={form.owner_username}
                onChange={(e) => {
                  setForm((f) => ({ ...f, owner_username: e.target.value }));
                  setError(null);
                }}
                required
              />
            </div>
            <div>
              <label className="block text-[#EBD5BD] text-base mb-2">
                Set a password
              </label>
              <input
                type="password"
                placeholder="Password"
                className="w-full rounded-md px-4 py-3 text-base bg-white text-black focus:outline-none"
                value={form.owner_password}
                onChange={(e) => {
                  setForm((f) => ({ ...f, owner_password: e.target.value }));
                  setError(null);
                }}
                required
              />
            </div>
            {error && <div className="text-red-400 text-sm mb-2">{error}</div>}
            <button
              type="submit"
              className="w-full mt-4 py-3 rounded-md bg-[#FFB23E] text-black text-lg font-semibold font-[Cabin,sans-serif] hover:bg-[#ffb733] transition-colors"
              disabled={loading}
            >
              {loading ? "Creating..." : "Next"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Step 5: OTP Verification
  if (step === 5) {
    const validateOTP = () => {
      if (!/^\d{6}$/.test(otp)) return "OTP must be a 6-digit number";
      return null;
    };

    const handleOTPSubmit = async (e: React.FormEvent): Promise<void> => {
      e.preventDefault();
      setOtpError(null);

      const error = validateOTP();
      if (error) {
        setOtpError(error);
        return;
      }

      setOtpLoading(true);
      try {
        console.log("Submitting OTP:", {
          identifier: form.owner_email,
          otp_code: otp,
        });
        await authServices.verifyOTP({
          identifier: form.owner_email,
          otp_code: otp,
        });

        setShowSuccess(true);
      } catch (err: any) {
        console.error("OTP verification error:", err);
        setOtpError(
          err.response?.data?.message || "Invalid OTP. Please try again."
        );
      } finally {
        setOtpLoading(false);
      }
    };

    const handleResendOTP = async () => {
      setOtpError(null);
      setResentMessage(null);
      setOtpLoading(true);

      try {
        console.log("Resending OTP for:", { email: form.owner_email });
        await authServices.resendOTP({
          email: form.owner_email,
          otp_type: "Registration",
        });
        setResentMessage("New OTP sent successfully!");
      } catch (err: any) {
        console.error("Resend OTP error:", err);
        setOtpError(err.response?.data?.message || "Failed to resend OTP.");
      } finally {
        setOtpLoading(false);
      }
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
          <Stepper />
          <h2 className="text-2xl font-[Cabin,sans-serif] text-[#EBD5BD] font-normal mb-2 mt-2">
            Verify your email
          </h2>
          <div className="bg-[#23272f] rounded-xl p-8 w-full max-w-md flex flex-col items-center mt-4">
            <p className="text-[#EBD5BD] mb-4 text-center">
              Enter the OTP sent to{" "}
              <span className="font-semibold">{form.owner_email}</span>
            </p>
            <form
              className="w-full flex flex-col gap-4"
              onSubmit={handleOTPSubmit}
            >
              <input
                type="text"
                placeholder="Enter 6-digit OTP"
                className="w-full rounded-md px-4 py-3 text-base bg-white text-black focus:outline-none text-center tracking-widest"
                value={otp}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, ""); // Only digits
                  setOtp(value);
                  setOtpError(null);
                }}
                required
                maxLength={6}
                disabled={otpLoading}
              />
              {otpError && (
                <div className="text-red-400 text-sm mb-2 text-center">
                  {otpError}
                </div>
              )}
              {resentMessage && (
                <div className="text-green-400 text-sm mb-2 text-center">
                  {resentMessage}
                </div>
              )}
              <button
                type="submit"
                className="w-full py-3 rounded-md bg-[#FFB23E] text-black text-lg font-semibold font-[Cabin,sans-serif] hover:bg-[#ffb733] transition-colors"
                disabled={otpLoading}
              >
                {otpLoading ? "Verifying..." : "Verify OTP"}
              </button>
            </form>
            <button
              className="mt-4 text-[#FFB23E] hover:underline text-sm"
              onClick={handleResendOTP}
              disabled={otpLoading}
            >
              Resend OTP
            </button>
          </div>
        </div>
        {showSuccess && (
          <ProfileCreationSuccessModal
            onClose={() => {
              setShowSuccess(false);
              resetForm();
              navigate("/home");
            }}
            onGoHome={() => {
              resetForm();
              navigate("/home");
            }}
            onUploadRecords={() => {
              resetForm();
              navigate("/upload");
            }}
          />
        )}
      </div>
    );
  }

  // Fallback UI for unexpected step values
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1C232E] text-red-400 text-lg">
      Something went wrong. Please refresh the page or start again.
    </div>
  );
};

export default ProfileCreation;
