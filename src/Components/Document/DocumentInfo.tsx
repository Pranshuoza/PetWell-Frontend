import React, { useState } from "react";
import RenameDocumentModal from "./RenameDocumentModal";
import DeleteDocumentModal from "./DeleteDocumentModal";
import { Pencil, X as LucideX } from "lucide-react";
import { Button } from "../ui/button";

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
        <Button
          variant="ghost"
          size="icon"
          className="ml-2 text-[var(--color-primary)] hover:text-[var(--color-accent-hover)]"
          onClick={() => setShowRename(true)}
          aria-label="Edit Document"
        >
          <Pencil size={18} />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="ml-2 text-gray-400 hover:text-[var(--color-danger)]"
          onClick={() => setShowDelete(true)}
          aria-label="Delete Document"
        >
          <LucideX size={20} />
        </Button>
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
