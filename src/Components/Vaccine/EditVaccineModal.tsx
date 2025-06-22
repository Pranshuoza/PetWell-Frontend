import { Syringe } from "lucide-react";

const EditVaccineModal = ({
  open,
  onClose,
  vaccine,
}: {
  open: boolean;
  onClose: () => void;
  vaccine: any;
}) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="relative bg-[#232b3e] rounded-2xl shadow-2xl px-10 py-8 w-full max-w-md flex flex-col items-center">
        {/* Close button */}
        <button
          className="absolute top-4 right-4 text-2xl text-[#EBD5BD] hover:text-[#FFA500]"
          onClick={onClose}
        >
          &times;
        </button>
        {/* Syringe Icon */}
        <Syringe className="w-12 h-12 mb-4 text-[#EBD5BD]" />
        <h2 className="text-2xl font-serif font-semibold text-[#EBD5BD] mb-6">
          Edit Vaccine
        </h2>
        <form className="w-full flex flex-col gap-4">
          <div>
            <label className="block text-[#EBD5BD] text-sm mb-1">
              Vaccine Name
            </label>
            <input
              className="w-full rounded-lg px-4 py-2 bg-[#181f32] text-[#EBD5BD] font-semibold text-base border border-[#232b41] mb-2"
              value={vaccine.name}
              readOnly
            />
          </div>
          <div>
            <label className="block text-[#EBD5BD] text-sm mb-1">
              Date Administered
            </label>
            <input
              className="w-full rounded-lg px-4 py-2 bg-[#181f32] text-[#EBD5BD] border border-[#232b41] mb-2"
              type="text"
              value={vaccine.administered}
              readOnly
            />
          </div>
          <div>
            <label className="block text-[#EBD5BD] text-sm mb-1">
              Expiry Date
            </label>
            <input
              className="w-full rounded-lg px-4 py-2 bg-[#181f32] text-[#EBD5BD] border border-[#232b41] mb-2"
              type="text"
              value={vaccine.expires}
              readOnly
            />
          </div>
          <div>
            <label className="block text-[#EBD5BD] text-sm mb-1">
              Administered By
            </label>
            <input
              className="w-full rounded-lg px-4 py-2 bg-[#181f32] text-[#EBD5BD] border border-[#232b41] mb-2"
              type="text"
              value="Dr. John Doe"
              readOnly
            />
          </div>
          <div className="flex items-start gap-2 mt-2">
            <input
              type="checkbox"
              className="mt-1 accent-[#FFA500]"
              id="verify-checkbox"
            />
            <label htmlFor="verify-checkbox" className="text-[#EBD5BD] text-xs">
              By selecting this box, I verify that the information here is
              correct and verifiable by a third party if needed.
            </label>
          </div>
          <div className="flex justify-between gap-4 mt-6">
            <button
              type="button"
              className="flex-1 py-3 rounded-lg bg-transparent border border-red-600 text-red-600 font-semibold text-lg hover:bg-red-600 hover:text-white transition"
            >
              Delete Vaccine
            </button>
            <button
              type="submit"
              className="flex-1 py-3 rounded-lg bg-[#FFA500] text-white font-semibold text-lg hover:brightness-110 transition"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditVaccineModal;
