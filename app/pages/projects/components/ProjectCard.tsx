import { format } from "date-fns";
import { motion } from "framer-motion";
import { Timer1 } from "iconsax-reactjs";
import { Link } from "react-router";
import { Badge } from "~/components/ui/badge";
import { Card } from "~/components/ui/card";
import { cn } from "~/lib/utils";
import { itemVariants } from "~/motionVariants";
import type { ProjectInfo } from "~/services/projects/types";
import { PROJECT_STATUS_MAP } from "~/services/projects/utils";

const ProjectCard = ({ project }: { project: ProjectInfo }) => {
  const status = PROJECT_STATUS_MAP[project.status];

  return (
    <motion.div variants={itemVariants} className="h-full min-w-60">
      <Link
        to={`/projects/${project.id}`}
        className="block h-full group"
        state={{ project }}
      >
        <Card className="h-full border border-zinc-100 bg-white rounded-[2rem] p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
          <div className="flex justify-between items-start">
            <Badge
              variant="secondary"
              className={cn(
                "rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-tighter",
                status.className,
              )}
            >
              {status.label}
            </Badge>
          </div>

          <h3 className="text-xl font-bold text-zinc-900 mb-2 leading-tight group-hover:text-primary transition-colors">
            {project.title}
          </h3>
          <p className="text-sm text-zinc-500 line-clamp-2 mb-6 leading-relaxed">
            {project.description}
          </p>

          <div className="flex items-center justify-between mt-auto pt-4 border-t border-zinc-50">
            <div className="flex -space-x-2">
              {project.members.map((member, i) => (
                <div
                  key={i}
                  className="size-8 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-bold shadow-sm"
                  // style={{ backgroundColor: member.color }}
                >
                  {member.first_name[0] + member.last_name[0]}
                </div>
              ))}
            </div>
            <div className="flex items-center gap-1 text-zinc-400 text-xs font-medium">
              <Timer1 size="14" />
              <span>{format(new Date(project.deadline), "PPP")}</span>
            </div>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
};

export default ProjectCard;
