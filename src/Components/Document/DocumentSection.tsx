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
  onEditDocument,
  onDeleteDocument,
}) => {
  return (
    <section className="mb-8">
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
