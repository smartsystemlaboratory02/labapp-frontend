import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import type { ProjectInfoMember } from "~/services/projects/types";
import { getInitials } from "~/utils/utils";

export const TeamLead = ({ lead }: { lead: ProjectInfoMember }) => {
  return (
    <div className="flex items-center justify-between p-4 bg-primary/10 text-white rounded-2xl shadow-lg shadow-primary/10">
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarImage src={lead.profile_img || undefined} />
          <AvatarFallback>
            {lead.first_name || lead.last_name
              ? getInitials(lead.first_name, lead.last_name)
              : "?"}
          </AvatarFallback>
        </Avatar>
        <span className="text-xs font-black text-zinc-900 uppercase tracking-wider">
          {`${lead.first_name}  ${lead.last_name}`}
        </span>
      </div>
      <span className="text-[8px] font-black px-2 py-0.5 bg-white/80 rounded uppercase text-zinc-900">
        Lead
      </span>
    </div>
  );
};

export const TeamMember = ({ member }: { member: ProjectInfoMember }) => {
  return (
    <div className="flex items-center gap-3 p-4 bg-white border border-zinc-100 rounded-2xl">
      <Avatar>
        <AvatarImage src={member.profile_img || undefined} />
        <AvatarFallback>
          {member.first_name || member.last_name
            ? getInitials(member.first_name, member.last_name)
            : "?"}
        </AvatarFallback>
      </Avatar>
      <div className="size-1.5 rounded-full bg-zinc-300" />
      <span className="text-xs font-bold text-zinc-600">{`${member.first_name}  ${member.last_name}`}</span>
    </div>
  );
};
