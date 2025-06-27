import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Components/Layout/Navbar";
import { Input } from "../../Components/ui/input";
import { Button } from "../../Components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../Components/ui/select";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "../../Components/ui/tabs";
import DeleteDocumentModal from "../../Components/Document/DeleteDocumentModal";
import RenameDocumentModal from "../../Components/Document/RenameDocumentModal";
import petServices from "../../Services/petServices";

const DocumentCard: React.FC<{
  document: any;
  onEdit?: () => void;
  onDelete?: () => void;
}> = ({ document, onEdit, onDelete }) => {
  const type =
    document.file_type && document.file_type.toLowerCase() === "pdf"
      ? "pdf"
      : "img";
  const uploader =
    document.human_owner && document.human_owner.human_owner_name
      ? document.human_owner.human_owner_name
      : "You";
  return (
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
          <span className="text-[var(--color-white)] text-base">PNG</span>
        )}
      </div>
      <div className="flex-1 min-w-0 flex flex-col gap-0.5">
        <span className="truncate text-lg font-semibold text-[var(--color-white)]">
          {document.document_name}
          <span className="ml-2 text-xs text-gray-300 font-normal align-middle">
            3.2 MB
          </span>
        </span>
        <span className="text-xs text-gray-400 font-normal truncate max-w-xs mt-0.5">
          Uploaded By:{" "}
          <span className="font-semibold text-white">{uploader}</span>
        </span>
      </div>
      <div className="flex items-center gap-1 ml-2">
        <a
          href={document.document_url}
          download
          className="text-[var(--color-primary)] hover:text-[var(--color-accent-hover)] p-2 rounded-lg"
          aria-label="Download Document"
          title="Download"
        >
          <svg
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
        </a>
        <button
          className="text-[var(--color-primary)] hover:text-[var(--color-accent-hover)] p-2 rounded-lg"
          aria-label="Edit Document"
          title="Rename"
          onClick={onEdit}
        >
          <svg
            width="18"
            height="18"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
          >
            <path d="M12 20h9" />
            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19.5 3 21l1.5-4L16.5 3.5z" />
          </svg>
        </button>
        <button
          className="text-gray-400 hover:text-[var(--color-danger)] p-2 rounded-lg"
          aria-label="Delete Document"
          title="Delete"
          onClick={onDelete}
        >
          <svg
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
          >
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
          </svg>
        </button>
      </div>
    </div>
  );
};

const DocumentPage: React.FC = () => {
  const navigate = useNavigate();
  const [documents, setDocuments] = useState<any[]>([]);
  const [deleteIdx, setDeleteIdx] = useState<number | null>(null);
  const [renameIdx, setRenameIdx] = useState<number | null>(null);
  const [docName, setDocName] = useState<string>("");
  const [petId, setPetId] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPetAndDocuments = async () => {
      try {
        let petsRes = await petServices.getPetsByOwner();
        let petsArr = Array.isArray(petsRes) ? petsRes : petsRes.data;
        if (!petsArr) petsArr = [];
        if (!Array.isArray(petsArr)) petsArr = [petsArr];
        if (petsArr.length > 0) {
          setPetId(petsArr[0].id);
          // Fetch documents for the first pet
          const docsRes = await petServices.getPetDocuments(petsArr[0].id);
          let docsArr = Array.isArray(docsRes)
            ? docsRes
            : docsRes
            ? [docsRes]
            : [];
          setDocuments(docsArr);
          console.log("docArr:", docsArr);
        }
      } catch (err) {
        setDocuments([]);
      } finally {
        setLoading(false);
      }
    };
    fetchPetAndDocuments();
  }, []);

  return (
    <div className="min-h-screen w-full bg-[var(--color-background)] text-[var(--color-text)] font-sans">
      <Navbar
        userName="Syd"
        userImage="https://randomuser.me/api/portraits/men/32.jpg"
      />
      <div className="container mx-auto max-w-7xl pt-8 pb-12 px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <h1 className="text-4xl font-serif font-bold">Syd's Documents</h1>
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto justify-end">
            <div className="relative w-full sm:w-72">
              <Input
                type="search"
                placeholder="Search document"
                className="bg-[var(--color-card)] border-[var(--color-border)] rounded-lg w-full pl-10"
              />
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <Button
              className="border border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-[var(--color-background)] transition px-6 py-2 font-semibold rounded-lg w-full sm:w-auto"
              onClick={() => navigate("/upload")}
            >
              <span className="mr-2">↑</span> Upload New Document
            </Button>
          </div>
        </div>
        <Tabs defaultValue="all">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div className="flex gap-2 w-full sm:w-auto">
              <TabsList className="bg-transparent p-0 gap-2 w-full sm:w-auto">
                <TabsTrigger
                  value="all"
                  className="data-[state=active]:bg-[var(--color-primary)] data-[state=active]:text-[var(--color-background)] border border-[var(--color-border)] px-4 py-2 rounded-md font-medium text-base"
                >
                  All
                </TabsTrigger>
                <TabsTrigger
                  value="user"
                  className="data-[state=active]:bg-[var(--color-primary)] data-[state=active]:text-[var(--color-background)] border border-[var(--color-border)] px-4 py-2 rounded-md font-medium text-base"
                >
                  Uploaded by you
                </TabsTrigger>
                <TabsTrigger
                  value="team"
                  className="data-[state=active]:bg-[var(--color-primary)] data-[state=active]:text-[var(--color-background)] border border-[var(--color-border)] px-4 py-2 rounded-md font-medium text-base"
                >
                  Uploaded by your team
                </TabsTrigger>
              </TabsList>
            </div>
            <div className="flex justify-end w-full sm:w-auto">
              <Select defaultValue="recent">
                <SelectTrigger className="w-[180px] bg-[var(--color-card)] border-[var(--color-border)]">
                  <span className="mr-2 text-gray-400">Sort by:</span>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Recently Uploaded</SelectItem>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="size">Size</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <TabsContent value="all" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {loading ? (
                <div className="col-span-2 flex justify-center items-center h-40">
                  Loading documents...
                </div>
              ) : (
                documents.map((doc, idx) => (
                  <DocumentCard
                    key={doc.id}
                    document={doc}
                    onEdit={() => {
                      setRenameIdx(idx);
                      setDocName(doc.document_name);
                    }}
                    onDelete={() => setDeleteIdx(idx)}
                  />
                ))
              )}
            </div>
          </TabsContent>
          <TabsContent value="user" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {documents
                .filter(
                  (doc) =>
                    doc.human_owner &&
                    doc.human_owner.human_owner_name === "You"
                )
                .map((doc, idx) => (
                  <DocumentCard
                    key={doc.id}
                    document={doc}
                    onEdit={() => {
                      setRenameIdx(idx);
                      setDocName(doc.document_name);
                    }}
                    onDelete={() => setDeleteIdx(idx)}
                  />
                ))}
            </div>
          </TabsContent>
          <TabsContent value="team" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {documents
                .filter(
                  (doc) =>
                    doc.human_owner &&
                    doc.human_owner.human_owner_name !== "You"
                )
                .map((doc, idx) => (
                  <DocumentCard
                    key={doc.id}
                    document={doc}
                    onEdit={() => {
                      setRenameIdx(idx);
                      setDocName(doc.document_name);
                    }}
                    onDelete={() => setDeleteIdx(idx)}
                  />
                ))}
            </div>
          </TabsContent>
        </Tabs>
        {/* Delete Modal */}
        {deleteIdx !== null && (
          <DeleteDocumentModal
            open={true}
            documentName={documents[deleteIdx]?.document_name}
            onClose={() => setDeleteIdx(null)}
            onDelete={() => setDeleteIdx(null)}
          />
        )}
        {/* Rename Modal */}
        {renameIdx !== null && (
          <RenameDocumentModal
            open={true}
            initialName={docName}
            onClose={() => setRenameIdx(null)}
            onSave={async (newName: string) => {
              if (renameIdx === null) return;
              const doc = documents[renameIdx];
              try {
                await petServices.updateDocumentName(doc.id, newName);
                setDocuments((prevDocs) =>
                  prevDocs.map((d, i) =>
                    i === renameIdx ? { ...d, document_name: newName } : d
                  )
                );
              } catch (err) {
                // Optionally show error to user
                console.error("Failed to rename document", err);
              }
              setRenameIdx(null);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default DocumentPage;
