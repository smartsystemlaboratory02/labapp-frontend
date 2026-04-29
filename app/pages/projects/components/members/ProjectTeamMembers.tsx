"use client";

import { UserTick } from "iconsax-reactjs";

import SectionHeader from "~/components/ui/SectionHeader";
import { TeamMember } from "./TeamMember";
import { itemVariants } from "~/motionVariants";
import type { ProjectInfoMember } from "~/services/projects/types";
import { motion } from "framer-motion";
import { AddProjectMemberModal } from "./AddProjectMemberModal";

const ProjectTeamMembers = ({
  projectId,
  members,
}: {
  projectId: string;
  members: ProjectInfoMember[];
}) => {
  return (
    <motion.section className="space-y-5" variants={itemVariants}>
      <div className="flex items-center justify-between">
        <SectionHeader
          icon={<UserTick size="18" variant="Bold" />}
          label="Team Members"
        />
        <AddProjectMemberModal projectId={projectId} members={members} />
      </div>

      <div className="space-y-2">
        {members.map((member) => {
          return (
            <TeamMember key={member.id} member={member} projectId={projectId} />
          );
        })}
      </div>
    </motion.section>
  );
};

export default ProjectTeamMembers;
