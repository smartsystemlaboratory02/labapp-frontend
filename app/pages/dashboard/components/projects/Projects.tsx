import React from "react";
import DashboardCard from "../DashboardCard";
import { Briefcase } from "iconsax-reactjs";
import { DEMO_DATA } from "~/dashboardDemo";
import ProjectItem from "./ProjectItem";

const Projects = () => {
  return (
    <DashboardCard title="Active Projects" icon={Briefcase} href="/projects">
      <div className="space-y-1">
        {DEMO_DATA.projects.map((project) => (
          <ProjectItem key={project._id} project={project} />
        ))}
      </div>
    </DashboardCard>
  );
};

export default Projects;
