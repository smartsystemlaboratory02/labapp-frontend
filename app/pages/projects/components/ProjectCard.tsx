import { motion } from "framer-motion";
import { More, Timer1 } from "iconsax-reactjs";
import { Link } from "react-router";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import type { MOCK_PROJECTS } from "~/dashboardDemo";
import { cn } from "~/lib/utils";
import { itemVariants } from "~/motionVariants";

const ProjectCard = ({ project }: { project: (typeof MOCK_PROJECTS)[0] }) => (
  <motion.div variants={itemVariants} className="h-full min-w-60">
    <Link to={`/projects/details`} className="block h-full group">
      <Card className="h-full border border-zinc-100 bg-white rounded-[2rem] p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
        <div className="flex justify-between items-start">
          <Badge
            variant="secondary"
            className={cn(
              "rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-tighter",
              project.status === "Completed"
                ? "bg-emerald-50 text-emerald-600"
                : "bg-amber-50 text-amber-600",
            )}
          >
            {project.status}
          </Badge>
        </div>

        <h3 className="text-xl font-bold text-zinc-900 mb-2 leading-tight group-hover:text-primary transition-colors">
          {project.name}
        </h3>
        <p className="text-sm text-zinc-500 line-clamp-2 mb-6 leading-relaxed">
          {project.description}
        </p>

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-zinc-50">
          <div className="flex -space-x-2">
            {project.team.map((member, i) => (
              <div
                key={i}
                className="size-8 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-bold shadow-sm"
                style={{ backgroundColor: member.color }}
              >
                {member.id}
              </div>
            ))}
          </div>
          <div className="flex items-center gap-1 text-zinc-400 text-xs font-medium">
            <Timer1 size="14" />
            <span>{project.deadline}</span>
          </div>
        </div>
      </Card>
    </Link>
  </motion.div>
);

export default ProjectCard;
