import DashboardCard from "../DashboardCard";
import { Briefcase } from "iconsax-reactjs";
import ProjectItem from "./ProjectItem";
import type { ActiveProject } from "~/services/dashboard/types";

const Projects = ({ projects }: { projects: ActiveProject[] }) => {
  const projectSlice = projects.slice(0, 5);

  return (
    <DashboardCard title="Active Projects" icon={Briefcase} href="/projects">
      <div className="space-y-1">
        {projectSlice.map((project) => (
          <ProjectItem key={project.id} project={project} />
        ))}
      </div>
    </DashboardCard>
  );
};

export default Projects;
