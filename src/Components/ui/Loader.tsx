import React from "react";

const Loader: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50  flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-[#232b3e] rounded-2xl shadow-2xl px-20 py-16 flex flex-col items-center">
        <div className="mb-8 flex items-center justify-center">
          <div className="relative w-20 h-20">
            {[...Array(8)].map((_, i) => {
              const size = 0.25 + i * 0.125;
              const opacity = 0.3 + (i / 7) * 0.7;
              const radius = 32; // px, adjust so all circles sit on the same ring
              return (
                <span
                  key={i}
                  className={`absolute left-1/2 top-1/2 rounded-full bg-[#EBD5BD] animate-loader-dot`}
                  style={{
                    width: `${size}rem`,
                    height: `${size}rem`,
                    opacity: opacity,
                    transform: `rotate(${
                      i * 45
                    }deg) translate(0, -${radius}px)`,
                    animationDelay: `${i * 0.15}s`,
                  }}
                />
              );
            })}
          </div>
        </div>
        <div className="text-2xl text-[#EBD5BD] text-center font-serif font-medium">
          Give us a moment while we
          <br />
          read your documents!
        </div>
      </div>
      <style>{`
        @keyframes loader-dot {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        .animate-loader-dot {
          animation: loader-dot 1.2s infinite;
        }
      `}</style>
    </div>
  );
};

export default Loader;
