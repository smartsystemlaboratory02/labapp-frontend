import React from "react";

export const TeamLead = ({ lead }: { lead: { name: string } }) => {
  return (
    <div className="flex items-center justify-between p-4 bg-primary/10 text-white rounded-2xl shadow-lg shadow-primary/10">
      <span className="text-xs font-black text-zinc-900 uppercase tracking-wider">
        {lead.name}
      </span>
      <span className="text-[8px] font-black px-2 py-0.5 bg-white/20 rounded uppercase text-zinc-900">
        Lead
      </span>
    </div>
  );
};

export const TeamMember = ({ member }: { member: { name: string } }) => {
  return (
    <div className="flex items-center gap-3 p-4 bg-white border border-zinc-100 rounded-2xl">
      <div className="size-1.5 rounded-full bg-zinc-300" />
      <span className="text-xs font-bold text-zinc-600">{member.name}</span>
    </div>
  );
};
