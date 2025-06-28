import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { FormData } from "./types";
import Step1BasicPetInfo from "./Step1BasicPetInfo";
import Step2HealthBasics from "./Step2HealthBasics";
import Step3SafetyAndID from "./Step3SafetyAndID";
import Stepper from "./Stepper";
import PetWellLogo from "../../../Assets/PetWell.png";
import petServices from "../../../Services/petServices";

const AddPetProfile: React.FC = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
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
    setStep(newStep);
  };

  const handleCreatePet = async () => {
    setLoading(true);
    setError(null);
    
    try {
      console.log("=== CREATING PET PROFILE ===");
      console.log("Form data:", form);

      // Validate required fields
      const requiredFields = [
        "pet_name",
        "pet_age", 
        "pet_species",
        "pet_breed"
      ];
      
      const missingFields = requiredFields.filter(
        (field) => !form[field as keyof typeof form]
      );
      
      if (missingFields.length > 0) {
        throw new Error(
          `Missing required fields: ${missingFields.join(", ")}`
        );
      }

      // Prepare pet data for createPet API
      const petData: any = {
        pet_name: form.pet_name.trim(),
        age: parseInt(form.pet_age),
        weight: form.pet_weight ? parseFloat(form.pet_weight) : 0,
        breed_species_id: form.pet_species.trim(),
        breed_id: form.pet_breed.trim(),
        location: "Default Location", // This might need to be provided or fetched
        latitude: 0, // Default values - might need to be provided
        longitude: 0, // Default values - might need to be provided
        spay_neuter: form.pet_spay_neuter === "true",
        color: form.pet_color.trim() || "",
        microchip: form.pet_microchip.trim() || "",
        notes: form.pet_notes.trim() || ""
      };

      // Only include dob if it has a valid value
      if (form.pet_dob && form.pet_dob.trim()) {
        petData.dob = form.pet_dob;
      }

      console.log("Pet data for creation:", petData);

      // Create pet using petServices
      const response = await petServices.createPet(petData);
      console.log("Pet creation response:", response);
      
      // If pet was created successfully and we have a profile picture, upload it
      if (response.data && form.pet_profile_picture && form.pet_profile_picture instanceof File) {
        try {
          const petId = (response.data as any).id;
          
          // Validate file
          if (form.pet_profile_picture.size > 5 * 1024 * 1024) {
            throw new Error("Profile picture must be less than 5MB");
          }
          
          if (!form.pet_profile_picture.type.startsWith("image/")) {
            throw new Error("Profile picture must be an image file");
          }
          
          // Upload profile picture as document
          const documentData = {
            document_name: `${form.pet_name.trim()} Profile Picture`,
            document_type: "Profile Picture",
            file_type: form.pet_profile_picture.name.split(".").pop()?.toUpperCase() || "JPG",
            description: "Pet profile picture",
            file: form.pet_profile_picture
          };
          
          console.log("Uploading profile picture for pet:", petId);
          const documentResponse = await petServices.createDocument(petId, documentData);
          console.log("Profile picture upload response:", documentResponse);
          
        } catch (uploadError: any) {
          console.error("Profile picture upload failed:", uploadError);
          // Don't fail the entire process if profile picture upload fails
          // The pet was created successfully
        }
      }
      
      setShowSuccess(true);
      
      // Navigate to home with pet ID after a short delay
      setTimeout(() => {
        const petId = (response.data as any).id;
        navigate(`/petowner/pet/${petId}/home`);
      }, 2000);
      
    } catch (err: any) {
      console.error("Pet creation error:", err);
      
      let errorMessage = "Failed to create pet profile. Please try again.";
      
      if (err.message) {
        errorMessage = err.message;
      }
      
      if (err.response) {
        console.error("Response status:", err.response.status);
        console.error("Response data:", err.response.data);
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const petSteps = [
    "Basic Pet Info",
    "Health Basics",
    "Safety & ID",
  ];

  // Render the appropriate step component
  switch (step) {
    case 1:
      return (
        <Step1BasicPetInfo
          form={form}
          setForm={setForm}
          error={error}
          setError={setError}
          onNext={() => goToStep(2)}
          steps={petSteps}
        />
      );
    case 2:
      return (
        <Step2HealthBasics
          form={form}
          setForm={setForm}
          error={error}
          setError={setError}
          onNext={() => goToStep(3)}
          steps={petSteps}
        />
      );
    case 3:
      return (
        <>
          <Step3SafetyAndID
            form={form}
            setForm={setForm}
            error={error}
            setError={setError}
            onNext={handleCreatePet}
            steps={petSteps}
            loading={loading}
          />
          
          {/* Success Modal */}
          {showSuccess && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-[#23272f] rounded-xl p-8 max-w-md mx-4 text-center">
                <div className="text-green-400 text-6xl mb-4">✓</div>
                <h3 className="text-[#EBD5BD] text-xl font-semibold mb-2">
                  Pet Profile Created!
                </h3>
                <p className="text-[#EBD5BD] mb-6">
                  Your pet's profile has been successfully created. Redirecting to home...
                </p>
              </div>
            </div>
          )}
        </>
      );
    default:
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#1C232E] text-red-400 text-lg">
          Something went wrong. Please refresh the page or start again.
        </div>
      );
  }
};

export default AddPetProfile; 