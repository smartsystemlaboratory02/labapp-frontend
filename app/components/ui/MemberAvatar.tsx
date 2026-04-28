import React from "react";
import type { Personnel } from "~/services/personnels/types";
import { getInitials } from "~/utils/utils";
import { Avatar, AvatarImage, AvatarFallback } from "./avatar";

const MemberAvatar = ({ member }: { member: Personnel }) => {
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
