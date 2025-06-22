import React from "react";

interface TeamAddedModalProps {
  teamName: string;
  onClose: () => void;
  onGoHome: () => void;
  onAddMore: () => void;
}

const TeamAddedModal: React.FC<TeamAddedModalProps> = ({ teamName, onClose, onGoHome, onAddMore }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="relative bg-[#23272f] rounded-2xl shadow-2xl px-12 py-10 flex flex-col items-center w-[480px] max-w-full">
        {/* Close button */}
        <button onClick={onClose} className="absolute top-6 right-6 text-3xl text-[#EBD5BD] hover:text-[#FFA500] focus:outline-none">&times;</button>
        {/* Confetti/Party emoji */}
        <div className="text-6xl mb-4">🎉</div>
        {/* Heading */}
        <h2 className="text-3xl font-[Alike,serif] text-[#EBD5BD] mb-4 text-center">Team added!</h2>
        {/* Subtext */}
        <p className="text-base text-[#EBD5BD] text-center mb-8 max-w-xs"><span className="font-bold">{teamName}</span> has been added to your team!</p>
        {/* Buttons */}
        <div className="flex gap-4 w-full justify-center">
          <button onClick={onGoHome} className="flex-1 py-2 rounded-md border border-[#FFA500] text-[#EBD5BD] text-lg font-[Cabin,sans-serif] hover:bg-[#FFB23E] hover:text-black transition-colors bg-transparent">Go To Home</button>
          <button onClick={onAddMore} className="flex-1 py-2 rounded-md bg-[#FFB23E] text-black text-lg font-[Cabin,sans-serif] hover:bg-[#ffb733] transition-colors">Add More Teams</button>
        </div>
      </div>
    </div>
  );
};

export default TeamAddedModal;
