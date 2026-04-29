import React from "react";
import MemberAvatar from "~/components/ui/MemberAvatar";
import type { ProjectInfoMember } from "~/services/projects/types";
import { UpdateMemberRoleModal } from "./UpdateMemberRoleModal";
import { DeleteProjectMemberModal } from "./DeleteProjectMemberModal";

export const TeamMember = ({
  projectId,
  member,
}: {
  projectId: string;
  member: ProjectInfoMember;
}) => {
  if (member.role === "lead") {
    return (
      <div className="flex items-center  p-4 bg-primary/10 text-white rounded-2xl shadow-lg shadow-primary/10 gap-3 group">
        <div className="flex items-center gap-3">
          <MemberAvatar member={member} />
          <span className="text-xs font-black text-zinc-900 uppercase tracking-wider">
            {`${member.first_name}  ${member.last_name}`}
          </span>
        </div>
        <span className="text-[8px] font-black px-2 py-0.5 bg-white/80 rounded uppercase text-zinc-900">
          Lead
        </span>
        <TeamMemberActions projectId={projectId} member={member} />
      </div>
    );
  } else {
    return (
      <div className="group flex items-center gap-3 p-4 bg-white border border-zinc-100 rounded-2xl">
        <MemberAvatar member={member} />
        <div className="size-1.5 rounded-full bg-zinc-300" />
        <span className="text-xs font-bold text-zinc-600">{`${member.first_name}  ${member.last_name}`}</span>
        <TeamMemberActions projectId={projectId} member={member} />
      </div>
    );
  }
};

const TeamMemberActions = ({
  projectId,
  member,
}: {
  projectId: string;
  member: ProjectInfoMember;
}) => {
  {
    return (
      <div className="flex items-center gap-3 ml-auto opacity-0 group-hover:opacity-100 transition-all">
        <UpdateMemberRoleModal
          memberId={member.id}
          role={member.role}
          projectId={projectId}
        />
        <DeleteProjectMemberModal
          projectId={projectId}
          memberId={member.id}
          first_name={member.first_name}
        />
      </div>
    );
  }
};
