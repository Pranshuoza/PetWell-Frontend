import React, { useState } from "react";
import RenameDocumentModal from "./RenameDocumentModal";
import DeleteDocumentModal from "./DeleteDocumentModal";

interface DocumentBoxProps {
  name: string;
  type: "pdf" | "img";
  onEdit?: (newName: string) => void;
  onDelete?: () => void;
}

const DocumentBox: React.FC<DocumentBoxProps> = ({
  name,
  type,
  onEdit,
  onDelete,
}) => {
  const [showRename, setShowRename] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [docName, setDocName] = useState(name);

  const handleSave = (newName: string) => {
    setDocName(newName);
    setShowRename(false);
    if (onEdit) onEdit(newName);
  };

  const handleDelete = () => {
    setShowDelete(false);
    if (onDelete) onDelete();
  };

  return (
    <>
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
          {docName}
        </span>
        <button
          className="ml-2 text-[var(--color-primary)] hover:text-[var(--color-accent-hover)] text-lg"
          onClick={() => setShowRename(true)}
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
        <button
          className="ml-2 text-gray-400 hover:text-[var(--color-danger)] text-xl"
          onClick={() => setShowDelete(true)}
          aria-label="Delete Document"
        >
          ×
        </button>
      </div>
      <RenameDocumentModal
        open={showRename}
        initialName={docName}
        onClose={() => setShowRename(false)}
        onSave={handleSave}
      />
      <DeleteDocumentModal
        open={showDelete}
        documentName={docName}
        onClose={() => setShowDelete(false)}
        onDelete={handleDelete}
      />
    </>
  );
};

export default DocumentBox;
