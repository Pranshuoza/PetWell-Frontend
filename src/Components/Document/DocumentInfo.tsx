import React, { useState } from "react";
import RenameDocumentModal from "./RenameDocumentModal";
import DeleteDocumentModal from "./DeleteDocumentModal";
import { Pencil, X as LucideX, Download } from "lucide-react";
import { Button } from "../ui/button";

interface DocumentBoxProps {
  name: string;
  type: "pdf" | "img";
  size: number; // in bytes
  uploader: string; // e.g. "Dr. Hemant Patel, Vet Office of New York" or "You"
  downloadUrl: string;
  onEdit?: (newName: string) => void;
  onDelete?: () => void;
}

function formatSize(bytes: number) {
  if (bytes >= 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  if (bytes >= 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${bytes} B`;
}

const DocumentBox: React.FC<DocumentBoxProps> = ({
  name,
  type,
  size,
  uploader,
  downloadUrl,
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
      <div className="flex flex-col sm:flex-row items-center bg-[var(--color-card)] rounded-2xl px-5 py-4 border border-[var(--color-border)] shadow-md gap-3 sm:gap-0">
        <div
          className={`w-10 h-10 flex items-center justify-center rounded-xl mr-4 font-bold text-xs shrink-0 ${
            type === "pdf"
              ? "bg-[var(--color-danger)]"
              : "bg-[var(--color-success)]"
          }`}
        >
          {type === "pdf" ? (
            <span className="text-[var(--color-white)] text-base">PDF</span>
          ) : (
            <span className="text-[var(--color-white)] text-base">IMG</span>
          )}
        </div>
        <div className="flex-1 min-w-0 flex flex-col gap-0.5">
          <span className="truncate text-lg font-semibold text-[var(--color-white)]">
            {docName}
            <span className="ml-2 text-xs text-gray-300 font-normal align-middle">
              {formatSize(size)}
            </span>
          </span>
          <span className="text-xs text-gray-400 font-normal truncate max-w-xs mt-0.5">
            Uploaded By:{" "}
            <span className="font-semibold text-white">{uploader}</span>
          </span>
        </div>
        <div className="flex items-center gap-1 ml-2">
          <a
            href={downloadUrl}
            download
            className="text-[var(--color-primary)] hover:text-[var(--color-accent-hover)] p-2 rounded-lg"
            aria-label="Download Document"
            title="Download"
          >
            <Download size={20} />
          </a>
          <Button
            variant="ghost"
            size="icon"
            className="text-[var(--color-primary)] hover:text-[var(--color-accent-hover)]"
            onClick={() => setShowRename(true)}
            aria-label="Edit Document"
            title="Rename"
          >
            <Pencil size={18} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-400 hover:text-[var(--color-danger)]"
            onClick={() => setShowDelete(true)}
            aria-label="Delete Document"
            title="Delete"
          >
            <LucideX size={20} />
          </Button>
        </div>
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
