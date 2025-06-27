import React, { useState } from "react";

interface RenameDocumentModalProps {
  open: boolean;
  initialName: string;
  onClose: () => void;
  onSave: (newName: string) => void;
}

const RenameDocumentModal: React.FC<RenameDocumentModalProps> = ({
  open,
  initialName,
  onClose,
  onSave,
}) => {
  const [name, setName] = useState(initialName);

  React.useEffect(() => {
    setName(initialName);
  }, [initialName, open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--color-modal)]/30 backdrop-blur-sm">
      <div className="bg-[var(--color-modal)] rounded-2xl px-10 py-8 min-w-[340px] max-w-[90vw] shadow-2xl relative flex flex-col items-start border border-[var(--color-modal-border)]">
        <button
          className="absolute right-8 top-8 text-4xl text-[var(--color-modal-foreground)] hover:text-[var(--color-danger)] font-bold"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
        <h2 className="text-2xl left-8 top-8 font-serif font-bold mb-8 text-[var(--color-modal-foreground)] text-center">
          Rename document
        </h2>
        <div className="w-full">
          <label className="block text-[var(--color-modal-foreground)] mb-2 font-medium text-base">
            Document Name
          </label>
          <input
            className="w-full rounded-lg px-4 py-2 mb-8 bg-[var(--color-background)] border border-[var(--color-modal-border)] text-[var(--color-modal-foreground)] focus:outline-none focus:border-[var(--color-primary)] text-base"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="flex gap-4 justify-end w-full mt-2">
          <button
            className="flex-1 border border-[var(--color-primary)] text-[var(--color-primary)] px-6 py-2 rounded-lg font-semibold hover:bg-[var(--color-primary)] hover:text-[var(--color-background)] transition"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="flex-1 bg-[var(--color-primary)] text-[var(--color-background)] px-6 py-2 rounded-lg font-semibold hover:bg-[var(--color-primary-foreground)] hover:text-[var(--color-primary)] transition"
            onClick={() => onSave(name)}
            disabled={!name.trim()}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default RenameDocumentModal;
