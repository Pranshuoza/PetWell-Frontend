import React from "react";

const Loader: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm">
      <div className="bg-[#232b3e] rounded-2xl shadow-xl px-12 py-10 flex flex-col items-center">
        <div className="mb-6">
          <svg
            className="animate-spin h-12 w-12 text-[#FFA500]"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="#FFA500"
              strokeWidth="4"
              fill="none"
            />
            <path
              className="opacity-75"
              fill="#FFA500"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            />
          </svg>
        </div>
        <div className="text-xl text-[#EBD5BD] text-center font-medium">
          Give us a moment while we
          <br />
          read your documents!
        </div>
      </div>
    </div>
  );
};

export default Loader;
