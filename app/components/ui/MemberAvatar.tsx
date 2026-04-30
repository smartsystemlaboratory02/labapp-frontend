import React from "react";
import { getInitials } from "~/utils/utils";
import { Avatar, AvatarImage, AvatarFallback } from "./avatar";
import type { ProjectInfoMember } from "~/services/projects/types";
import type { Personnel, PersonnelInfo } from "~/services/personnels/types";

const MemberAvatar = ({ member }: { member: ProjectInfoMember | Personnel | PersonnelInfo}) => {
  return (
    <Avatar>
      <AvatarImage src={member.profile_img || undefined} />
      <AvatarFallback>
        {member.first_name || member.last_name
          ? getInitials(member.first_name, member.last_name)
          : "?"}
      </AvatarFallback>
    </Avatar>
  );
};

export default MemberAvatar;
