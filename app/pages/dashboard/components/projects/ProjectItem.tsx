import { Link } from "react-router";
import { cn } from "~/lib/utils";

const ProjectItem = ({ project }: { project: any }) => (
  <Link
    to={`/home/projects/${project._id}`}
    className="group block p-4 rounded-2xl hover:bg-white dark:hover:bg-zinc-900 border border-transparent hover:border-zinc-200 dark:hover:border-zinc-800 hover:shadow-lg hover:shadow-zinc-200/20 transition-all duration-300"
  >
    <div className="flex items-center justify-between mb-1">
      <span className="font-bold text-zinc-900 dark:text-zinc-50 truncate group-hover:text-primary transition-colors">
        {project.name}
      </span>
      <div
        className={cn(
          "size-2 rounded-full",
          project.status === "Completed"
            ? "bg-emerald-500"
            : "bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]",
        )}
      />
    </div>
    <p className="text-xs text-zinc-500 line-clamp-1">{project.description}</p>
  </Link>
);

export default ProjectItem;
