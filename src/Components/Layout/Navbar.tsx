import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import PetWellLogo from "../../Assets/PetWell.png";
import petServices from "../../Services/petServices";

interface NavbarProps {
  onEditProfile?: () => void;
  onSwitchProfile?: () => void;
  onSettings?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSwitchProfile }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { petId } = useParams<{ petId: string }>();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [petName, setPetName] = useState<string>("Pet");
  const [petImage, setPetImage] = useState<string>(
    "https://randomuser.me/api/portraits/men/32.jpg"
  );

  const handleDropdownToggle = () => setIsDropdownOpen((open) => !open);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const petsRes = await petServices.getPetsByOwner();
        let petsArr = Array.isArray(petsRes) ? petsRes : petsRes.data;
        if (!petsArr) petsArr = [];
        if (!Array.isArray(petsArr)) petsArr = [petsArr];
        if (petsArr.length > 0) {
          setPetName(petsArr[0].pet_name || "Pet");
          // If profile_picture is a string (URL), use it. If not, fallback.
          const profilePic = petsArr[0].profile_picture;
          if (profilePic && typeof profilePic === "string") {
            setPetImage(profilePic);
          } else {
            setPetImage("https://randomuser.me/api/portraits/men/32.jpg");
          }
        }
      } catch {
        setPetName("Pet");
        setPetImage("https://randomuser.me/api/portraits/men/32.jpg");
      }
    })();
  }, []);

  return (
    <nav className="flex flex-col md:flex-row items-center justify-between px-4 sm:px-8 md:px-12 py-4 md:py-6 bg-transparent w-full">
      <div className="flex items-center space-x-4 mb-4 md:mb-0">
        <img
          src={PetWellLogo}
          alt="PetWell Logo"
          className="w-10 h-10 object-contain"
        />
      </div>
      <div className="flex flex-col md:flex-row md:space-x-16 space-y-2 md:space-y-0 text-base md:text-lg font-medium items-center mb-4 md:mb-0">
        <a
          href={`/petowner/pet/${petId}/home`}
          className={`hover:text-[var(--color-primary)] transition ${
            location.pathname === `/petowner/pet/${petId}/home`
              ? "text-[var(--color-primary)] font-bold underline underline-offset-8"
              : "text-[var(--color-text)]"
          }`}
        >
          Home
        </a>
        <a
          href={`/petowner/pet/${petId}/vaccine`}
          className={`hover:text-[var(--color-primary)] transition ${
            location.pathname === `/petowner/pet/${petId}/vaccine`
              ? "text-[var(--color-primary)] font-bold underline underline-offset-8"
              : "text-[var(--color-text)]"
          }`}
        >
          Vaccines
        </a>
        <a
          href={`/petowner/pet/${petId}/documents`}
          className={`hover:text-[var(--color-primary)] transition ${
            location.pathname === `/petowner/pet/${petId}/documents`
              ? "text-[var(--color-primary)] font-bold underline underline-offset-8"
              : "text-[var(--color-text)]"
          }`}
        >
          Documents
        </a>
        <a
          href={`/petowner/pet/${petId}/team`}
          className={`hover:text-[var(--color-primary)] transition ${
            location.pathname === `/petowner/pet/${petId}/team`
              ? "text-[var(--color-primary)] font-bold underline underline-offset-8"
              : "text-[var(--color-text)]"
          }`}
        >
          Team
        </a>
      </div>
      <div className="relative flex items-center space-x-3" ref={dropdownRef}>
        <span className="text-[var(--color-text)] font-semibold hidden sm:block">
          {petName}
        </span>
        <div className="relative">
          <button
            onClick={handleDropdownToggle}
            className="flex items-center space-x-2 focus:outline-none"
          >
            <img
              src={petImage}
              alt="Pet"
              className="w-10 h-10 rounded-full object-cover border-2 border-[var(--color-primary)]"
            />
            <svg
              className={`w-4 h-4 text-[var(--color-text)] transition-transform ${
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
          {isDropdownOpen && (
            <div
              className="absolute right-0 mt-2 w-64 rounded-xl shadow-2xl border border-[#EBD5BD]/30 z-50"
              style={{ background: "rgba(44, 44, 44, 0.98)" }}
            >
              <div className="px-4 pt-4 pb-2 border-b border-[#EBD5BD]/30">
                <div className="text-xs text-[#EBD5BD] font-semibold mb-2 tracking-wide text-center">
                  Syd's Code
                </div>
                <div className="flex gap-2 mb-2 justify-center items-center">
                  <span
                    className="inline-flex w-8 h-8 bg-[#fff] bg-opacity-80 text-[#23272f] text-lg font-extrabold rounded-lg items-center justify-center border-2 border-[#EBD5BD] shadow-sm tracking-widest select-all transition-all duration-150 hover:scale-105 text-center"
                    style={{ boxShadow: "0 2px 8px 0 rgba(44, 44, 44, 0.10)" }}
                  >
                    X
                  </span>
                  <span
                    className="inline-flex w-8 h-8 bg-[#fff] bg-opacity-80 text-[#23272f] text-lg font-extrabold rounded-lg items-center justify-center border-2 border-[#EBD5BD] shadow-sm tracking-widest select-all transition-all duration-150 hover:scale-105 text-center"
                    style={{ boxShadow: "0 2px 8px 0 rgba(44, 44, 44, 0.10)" }}
                  >
                    8
                  </span>
                  <span
                    className="inline-flex w-8 h-8 bg-[#fff] bg-opacity-80 text-[#23272f] text-lg font-extrabold rounded-lg items-center justify-center border-2 border-[#EBD5BD] shadow-sm tracking-widest select-all transition-all duration-150 hover:scale-105 text-center"
                    style={{ boxShadow: "0 2px 8px 0 rgba(44, 44, 44, 0.10)" }}
                  >
                    T
                  </span>
                  <span
                    className="inline-flex w-8 h-8 bg-[#fff] bg-opacity-80 text-[#23272f] text-lg font-extrabold rounded-lg items-center justify-center border-2 border-[#EBD5BD] shadow-sm tracking-widest select-all transition-all duration-150 hover:scale-105 text-center"
                    style={{ boxShadow: "0 2px 8px 0 rgba(44, 44, 44, 0.10)" }}
                  >
                    V
                  </span>
                  <span
                    className="inline-flex w-8 h-8 bg-[#fff] bg-opacity-80 text-[#23272f] text-lg font-extrabold rounded-lg items-center justify-center border-2 border-[#EBD5BD] shadow-sm tracking-widest select-all transition-all duration-150 hover:scale-105 text-center"
                    style={{ boxShadow: "0 2px 8px 0 rgba(44, 44, 44, 0.10)" }}
                  >
                    4
                  </span>
                </div>
                <div className="text-xs text-[#EBD5BD] text-opacity-70 mb-1 text-center">
                  Share with care providers to give access to the profile.
                </div>
              </div>
              <div className="flex flex-col py-1">
                <button
                  className="text-left px-4 py-2 text-sm text-[#EBD5BD] hover:bg-[#EBD5BD]/10 transition font-medium"
                  onClick={() => navigate(`/petowner/pet/${petId}/profile`)}
                >
                  View Profile
                </button>
                <button
                  className="text-left px-4 py-2 text-sm text-[#EBD5BD] font-semibold hover:bg-[#EBD5BD]/10 transition"
                  onClick={() => {
                    if (typeof onSwitchProfile === "function") {
                      onSwitchProfile();
                      setIsDropdownOpen(false);
                    } else {
                      navigate("/switch-profile");
                    }
                  }}
                >
                  Not Syd?{" "}
                  <span className="text-[#FFB23E]">Switch Profile</span>
                </button>
                <button className="text-left px-4 py-2 text-sm text-[#EBD5BD] hover:bg-[#EBD5BD]/10 transition font-medium">
                  Help Center
                </button>
                <button className="text-left px-4 py-2 text-sm text-[#EBD5BD] hover:bg-[#EBD5BD]/10 transition font-medium">
                  Billing Information
                </button>
                <button className="text-left px-4 py-2 text-sm text-[#EBD5BD] hover:bg-[#EBD5BD]/10 transition font-medium">
                  Settings
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
