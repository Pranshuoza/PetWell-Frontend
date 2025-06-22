import React from "react";
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
import DocumentInfo from "../../Components/Document/DocumentInfo";

const documents = [
  { name: "Full Med Record_2025.pdf", size: "3.2 MB", type: "pdf" },
  { name: "Training Plan_Syd.pdf", size: "3.2 MB", type: "pdf" },
  { name: "Syd left jaw.png", size: "3.2 MB", type: "img" },
  { name: "Dog Daze Report Card 2/15.pdf", size: "3.2 MB", type: "pdf" },
  { name: "Full Med Record_2025.pdf", size: "3.2 MB", type: "pdf" },
  { name: "Syd left jaw.png", size: "3.2 MB", type: "img" },
  { name: "Dog Daze Report Card 2/15.pdf", size: "3.2 MB", type: "pdf" },
];

const DocumentPage: React.FC = () => {
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
            <Button className="border border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-[var(--color-background)] transition px-6 py-2 font-semibold rounded-lg w-full sm:w-auto">
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
              {documents.map((doc, idx) => (
                <DocumentInfo
                  key={idx}
                  name={doc.name}
                  type={doc.type as "pdf" | "img"}
                  onEdit={() => {}}
                  onDelete={() => {}}
                />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="user" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {documents.map((doc, idx) => (
                <DocumentInfo
                  key={idx}
                  name={doc.name}
                  type={doc.type as "pdf" | "img"}
                  onEdit={() => {}}
                  onDelete={() => {}}
                />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="team" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {documents.map((doc, idx) => (
                <DocumentInfo
                  key={idx}
                  name={doc.name}
                  type={doc.type as "pdf" | "img"}
                  onEdit={() => {}}
                  onDelete={() => {}}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DocumentPage;
