import React, { useState, useRef, useEffect } from "react";
import PetWellLogo from "../Assets/PetWell.png";

interface NavbarProps {
  userName?: string;
  userImage?: string;
  onEditProfile?: () => void;
  onSwitchProfile?: () => void;
  onSettings?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({
  userName = "Syd",
  userImage = "",
  onEditProfile,
  onSwitchProfile,
  onSettings,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  return (
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
      <div className="relative flex items-center space-x-3" ref={dropdownRef}>
        <span className="text-white font-semibold">{userName}</span>
        <div className="relative">
          <button
            onClick={handleDropdownToggle}
            className="flex items-center space-x-2 focus:outline-none"
          >
            <img
              src={userImage}
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
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-[#2A3441] rounded-lg shadow-lg border border-[#3A4551] z-50">
              <div className="py-2">
                <button
                  onClick={onEditProfile}
                  className="flex items-center w-full px-4 py-2 text-sm text-[#EBD5BD] hover:bg-[#3A4551] hover:text-[#FFA500] transition"
                >
                  Edit Profile Info
                </button>
                <button
                  onClick={onSwitchProfile}
                  className="flex items-center w-full px-4 py-2 text-sm text-[#EBD5BD] hover:bg-[#3A4551] hover:text-[#FFA500] transition"
                >
                  Not Syd? Switch Profile
                </button>
                <button
                  onClick={onSettings}
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
  );
};

export default Navbar;
