import React from "react";
import DocumentBox from "./DocumentInfo";

interface Document {
  name: string;
  size: string;
  type: "img" | "pdf";
}

interface DocumentSectionProps {
  documents: Document[];
  onAddDocument?: () => void;
  onEditDocument?: (index: number) => void;
  onDeleteDocument?: (index: number) => void;
}

const DocumentSection: React.FC<DocumentSectionProps> = ({
  documents,
  onAddDocument,
  onEditDocument,
  onDeleteDocument,
}) => {
  return (
    <section className="mb-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h2 className="text-xl font-serif font-semibold mb-2 md:mb-0">
          Recently Uploaded Documents
        </h2>
        <button
          className="border border-[var(--color-primary)] text-[var(--color-primary)] px-5 py-2 rounded-lg font-semibold flex items-center gap-2 hover:bg-[var(--color-primary)] hover:text-[var(--color-background)] transition"
          onClick={onAddDocument}
        >
          <span className="text-lg">+</span> Upload New Document
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-2">
        {documents.map((doc, idx) => (
          <DocumentBox
            key={idx}
            name={doc.name}
            type={doc.type}
            onEdit={onEditDocument ? () => onEditDocument(idx) : undefined}
            onDelete={
              onDeleteDocument ? () => onDeleteDocument(idx) : undefined
            }
          />
        ))}
      </div>
      <div className="mt-2">
        <a
          href="#"
          className="text-[var(--color-primary)] font-medium hover:underline text-base"
        >
          View All Documents &gt;
        </a>
      </div>
    </section>
  );
};

export default DocumentSection;
