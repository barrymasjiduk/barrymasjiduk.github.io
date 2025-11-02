// Donation.jsx
import * as React from "react";
import { Copy, CheckCircle2, Info } from "lucide-react";

const Donation = () => {
  const [copiedKey, setCopiedKey] = React.useState("");

  const details = [
    { label: "Account Name", value: "Barry Masjid & Islamic Centre", key: "name" },
    { label: "Bank", value: "Lloyds Bank", key: "bank" },
    { label: "Sort Code", value: "30-99-05", key: "sort" },
    { label: "Account Number", value: "28531062", key: "acc" },
  ];

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-10 text-black">
      <div className="w-full max-w-3xl bg-white shadow-md rounded-xl p-6 md:p-10">
        {/* Heading */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-primary">Donate</h1>
          <p className="text-sm md:text-base text-gray-600 mt-1">
            JazakAllahu khayran for supporting Barry Masjid & Islamic Centre. You can donate
            via bank transfer using the details below.
          </p>
        </div>

        {/* Bank Details */}
        <div className="space-y-3">
          {details.map(({ label, value, key }) => (
            <div
              key={key}
              className="flex items-center justify-between gap-3 rounded-lg border border-gray-200 px-3 py-2"
            >
              <div className="min-w-0">
                <div className="text-xs uppercase tracking-wide text-gray-500">{label}</div>
                <div className="font-medium text-sm md:text-base break-words">{value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Donation;
