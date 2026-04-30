import { Call, Copy, Sms, TickCircle } from "iconsax-reactjs";
import React, { useState } from "react";
import { toast } from "sonner";
import type { PersonnelInfo } from "~/services/personnels/types";

const ContactDetails = ({ personnel }: { personnel: PersonnelInfo }) => {
  const [emailCopied, setEmailCopied] = useState(false);
  const [phoneCopied, setPhoneCopied] = useState(false);

  const handleCopy = async (
    text: string,
    setState: React.Dispatch<React.SetStateAction<boolean>>,
  ) => {
    try {
      await navigator.clipboard.writeText(text);
      setState(true);
      toast.success("Copied to clipboard");

      setTimeout(() => setState(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <div className="bg-primary/5 border border-primary/10 rounded-[2rem] p-6 space-y-4">
      <h3 className="text-xs font-black uppercase tracking-widest text-primary/60 px-2">
        Contact details
      </h3>
      <div className="space-y-2">
        <div
          className="flex items-center justify-between w-full p-3 bg-white rounded-2xl border border-primary/10 hover:border-primary/30 transition-all cursor-pointer group"
          onClick={() => handleCopy(personnel.email, setEmailCopied)}
        >
          <div className="flex items-center gap-3">
            <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
              <Sms size="18" variant="Bold" />
            </div>
            <span className="text-xs font-bold text-zinc-700 truncate">
              {personnel.email}
            </span>
          </div>

          <button className="ml-auto flex items-center justify-center p-1">
            {emailCopied ? (
              <TickCircle size="18" variant="Bold" className="text-green-500" />
            ) : (
              <Copy
                className="text-primary opacity-40 group-hover:opacity-100 transition-opacity"
                size="18"
                variant="Bulk"
              />
            )}
          </button>
        </div>
        <div
          className="flex items-center justify-between w-full p-3 bg-white rounded-2xl border border-primary/10 hover:border-primary/30 transition-all cursor-pointer group"
          onClick={() => handleCopy(personnel.phone_number, setPhoneCopied)}
        >
          <div className="flex items-center gap-3">
            <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
              <Call size="18" variant="Bold" />
            </div>
            <span className="text-xs font-bold text-zinc-700 truncate">
              {personnel.phone_number}
            </span>
          </div>

          <button className="ml-auto flex items-center justify-center p-1">
            {phoneCopied ? (
              <TickCircle size="18" variant="Bold" className="text-green-500" />
            ) : (
              <Copy
                className="text-primary opacity-40 group-hover:opacity-100 transition-opacity"
                size="18"
                variant="Bulk"
              />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactDetails;
