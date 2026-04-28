"use client";

import React, { useEffect, useState } from "react";

import { Add, Minus, People } from "iconsax-reactjs";
import { UserTick } from "iconsax-reactjs";

import SectionHeader from "~/components/ui/SectionHeader";
import { TeamLead, TeamMember } from "./ProjectPersonnel";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { itemVariants } from "~/motionVariants";
import type { Project, ProjectInfoMember } from "~/services/projects/types";
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
          if (member.role === "lead") {
            return <TeamLead key={member.id} lead={member} />;
          }
          return <TeamMember key={member.id} member={member} />;
        })}
      </div>
    </motion.section>
  );
};

export default ProjectTeamMembers;
