import React, { useState, useRef, useEffect } from "react";
import PetWellLogo from "../../Assets/PetWell.png";

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
          href="/home"
          className="hover:text-[var(--color-primary)] text-[var(--color-text)] transition"
        >
          Home
        </a>
        <a
          href="/vaccine"
          className="hover:text-[var(--color-primary)] text-[var(--color-text)] transition"
        >
          Vaccines
        </a>
        <a
          href="/documents"
          className="hover:text-[var(--color-primary)] text-[var(--color-text)] transition"
        >
          Documents
        </a>
        <a
          href="#"
          className="hover:text-[var(--color-primary)] text-[var(--color-text)] transition"
        >
          Team
        </a>
      </div>
      <div className="relative flex items-center space-x-3" ref={dropdownRef}>
        <span className="text-[var(--color-text)] font-semibold hidden sm:block">
          {userName}
        </span>
        <div className="relative">
          <button
            onClick={handleDropdownToggle}
            className="flex items-center space-x-2 focus:outline-none"
          >
            <img
              src={userImage}
              alt="User"
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
            <div className="absolute right-0 mt-2 w-48 bg-[var(--color-card)] rounded-lg shadow-lg border border-[var(--color-border)] z-50">
              <div className="py-2">
                <button
                  onClick={onEditProfile}
                  className="flex items-center w-full px-4 py-2 text-sm text-[var(--color-text)] hover:bg-[var(--color-accent)] hover:text-[var(--color-primary)] transition"
                >
                  Edit Profile Info
                </button>
                <button
                  onClick={onSwitchProfile}
                  className="flex items-center w-full px-4 py-2 text-sm text-[var(--color-text)] hover:bg-[var(--color-accent)] hover:text-[var(--color-primary)] transition"
                >
                  Not Syd? Switch Profile
                </button>
                <button
                  onClick={onSettings}
                  className="flex items-center w-full px-4 py-2 text-sm text-[var(--color-text)] hover:bg-[var(--color-accent)] hover:text-[var(--color-primary)] transition"
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
