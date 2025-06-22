import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Components/Layout/Navbar";
import TeamBox from "../../Components/Teams/TeamInfo";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "../../Components/ui/dialog";

const teams = [
	{
		name: "Vet Office of New York",
		type: "Vet",
		phone: "(555) 555-5555",
		email: "info@vetoffice.com",
		address: "78 Hudson St, New York",
		avatar: "/avatars/vet-office.jpg",
	},
	{
		name: "Clean Pup Groomers",
		type: "Groomer",
		phone: "(555) 555-5555",
		email: "info@vetoffice.com",
		address: "112 W 34th St, New York",
		avatar: "/avatars/groomer.jpg",
	},
	{
		name: "Happy Tails Boarding",
		type: "Boarding",
		phone: "(555) 123-4567",
		email: "contact@happytails.com",
		address: "200 Park Ave, New York",
		avatar: "/avatars/boarding.jpg",
	},
	{
		name: "Pawsitive Trainers",
		type: "Trainer",
		phone: "(555) 987-6543",
		email: "info@pawsitivetrainers.com",
		address: "55 Broadway, New York",
		avatar: "/avatars/trainer.jpg",
	},
	{
		name: "Pet Wellness Pharmacy",
		type: "Pharmacy",
		phone: "(555) 222-3333",
		email: "pharmacy@petwell.com",
		address: "300 5th Ave, New York",
		avatar: "/avatars/pharmacy.jpg",
	},
	{
		name: "Downtown Animal Hospital",
		type: "Vet",
		phone: "(555) 444-5555",
		email: "info@downtownvet.com",
		address: "400 6th Ave, New York",
		avatar: "/avatars/animal-hospital.jpg",
	},
];

const TeamsPage: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<any>(null);
  const navigate = useNavigate();

	const handleDelete = (index: number) => {
    setSelectedTeam(teams[index]);
    setOpen(true);
  };
  const confirmDelete = () => {
    // Implement actual delete logic here
    setOpen(false);
  };

	return (
		<div className="min-h-screen w-full bg-[var(--color-background)] text-[var(--color-text)]">
			<Navbar userName="Syd"
        userImage="https://randomuser.me/api/portraits/men/32.jpg" />
			<div className="container pt-8 pb-12 pr-8 pl-8 mx-auto max-w-8xl">
				<div className="flex justify-between items-center mb-8">
					<h1 className="text-3xl font-serif font-bold mb-2">Syd’s Team</h1>
					<button
						className="flex items-center gap-2 px-6 py-2 rounded-lg border border-[var(--color-primary)] text-[var(--color-primary)] bg-transparent font-medium text-lg min-w-[200px] justify-center transition-all duration-150 hover:bg-[var(--color-primary)] hover:text-black hover:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2"
						style={{ height: 48, boxShadow: 'none' }}
						onClick={() => navigate("/add-team")}
					>
						<span className="text-2xl font-bold">+</span> Add New Team
					</button>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{teams.map((team, index) => (
						<TeamBox
							key={index}
							{...team}
							onDelete={() => handleDelete(index)}
						/>
					))}
				</div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="bg-[var(--color-background)] border-[var(--color-modal-border)] max-w-md rounded-2xl p-8">
            <DialogHeader>
              <DialogTitle className="text-[var(--color-text)] text-3xl font-serif font-bold mb-2">Remove team?</DialogTitle>
            </DialogHeader>
            <DialogDescription className="text-[var(--color-text)] text-base mb-6">Are you sure you want to remove the following team from your profile?</DialogDescription>
            {selectedTeam && (
              <div className="flex items-center gap-4 bg-[var(--color-card)] rounded-lg px-4 py-3 mb-6">
                <img src={selectedTeam.avatar} alt={selectedTeam.name} className="w-12 h-12 rounded-full object-cover" />
                <div>
                  <div className="font-semibold text-lg text-[var(--color-text)]">{selectedTeam.name}</div>
                  <div className="text-sm text-[var(--color-text)] opacity-60">{selectedTeam.address}</div>
                </div>
              </div>
            )}
            <div className="flex gap-4 justify-end mt-2">
              <DialogClose asChild>
                <button className="px-8 py-2 rounded-lg border border-[var(--color-primary)] text-[var(--color-primary)] bg-transparent font-medium text-lg hover:bg-[var(--color-primary)] hover:text-black transition-all duration-150">Cancel</button>
              </DialogClose>
              <button onClick={confirmDelete} className="px-8 py-2 rounded-lg bg-[var(--color-primary)] text-[var(--color-primary-foreground)] font-medium text-lg hover:opacity-90 transition-all duration-150">Yes, remove</button>
            </div>
          </DialogContent>
        </Dialog>
			</div>
		</div>
	);
};

export default TeamsPage;
