import React from "react";

interface DocumentBoxProps {
  name: string;
  type: "pdf" | "img";
  onEdit?: () => void;
  onDelete?: () => void;
}

const DocumentBox: React.FC<DocumentBoxProps> = ({
  name,
  type,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="flex items-center bg-[var(--color-card)] rounded-xl px-4 py-3 border border-[var(--color-border)]">
      <div
        className={`w-8 h-8 flex items-center justify-center rounded-full mr-3 font-bold text-xs ${
          type === "pdf"
            ? "bg-[var(--color-danger)]"
            : "bg-[var(--color-success)]"
        }`}
      >
        {type === "pdf" ? (
          <span className="text-[var(--color-white)]">PDF</span>
        ) : (
          <span className="text-[var(--color-white)]">IMG</span>
        )}
      </div>
      <span className="flex-1 truncate text-base font-medium text-[var(--color-white)]">
        {name}
      </span>
      {onEdit && (
        <button
          className="ml-2 text-[var(--color-primary)] hover:text-[var(--color-accent-hover)] text-lg"
          onClick={onEdit}
          aria-label="Edit Document"
        >
          <svg
            width="18"
            height="18"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16.862 5.487a2.1 2.1 0 1 1 2.97 2.97l-9.193 9.193a2 2 0 0 1-.707.464l-3.11 1.037a.5.5 0 0 1-.633-.633l1.037-3.11a2 2 0 0 1 .464-.707l9.193-9.193z"
            />
          </svg>
        </button>
      )}
      {onDelete && (
        <button
          className="ml-2 text-gray-400 hover:text-[var(--color-danger)] text-xl"
          onClick={onDelete}
          aria-label="Delete Document"
        >
          ×
        </button>
      )}
    </div>
  );
};

export default DocumentBox;
