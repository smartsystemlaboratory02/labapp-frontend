"use client";

import { Calendar, MessageText, DocumentText, Brodcast } from "iconsax-reactjs";

import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import PageHeader from "~/components/ui/PageHeader";
import { Link, useLocation, useNavigate } from "react-router";
import { motion } from "framer-motion";
import SectionHeader from "~/components/ui/SectionHeader";
import { containerVariants, itemVariants } from "~/motionVariants";
import BackButton from "~/components/ui/BackButton";
import { toast } from "sonner";
import { useEffect } from "react";
import type { ProjectInfo } from "~/services/projects/types";
import { format } from "date-fns";
import { PROJECT_STATUS_MAP } from "~/services/projects/utils";
import { cn } from "~/lib/utils";
import { Edit } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { DeleteProjectModal } from "./components/DeleteProjectModal";
import ProjectObjectives from "./components/objectives/ProjectObjectives";
import ProjectTeamMembers from "./components/members/ProjectTeamMembers";
import { useParams } from "react-router";
import { useGetProjectQuery } from "~/services/projects/queries";
import ProjectDetailsSkeleton from "./components/ProjectDetailsSkeleton";
import Resources from "./components/resources/Resources";

export default function ProjectDetails() {
  const navigate = useNavigate();
  const params = useParams<{ id: string }>();
  const projectId = params.id || "";
  const state = useLocation().state;
  const stateProject: ProjectInfo = state?.project;

  const {
    data: project,
    isLoading,
    isError,
    error,
  } = useGetProjectQuery(projectId, stateProject);

  useEffect(() => {
    if (isError) {
      toast.error(
        error.message || "Failed to load project details. Please try again.",
      );

      setTimeout(() => {
        navigate("/projects");
      }, 2000);
    }
  }, [project, isError, error]);

  if (!project || isLoading) return <ProjectDetailsSkeleton />;

  const status = PROJECT_STATUS_MAP[project.status];

  return (
    <div className="p-6 lg:p-10 mx-auto space-y-10 selection:bg-primary/10 max-w-400">
      <div className="flex items-center gap-6">
        <BackButton />

        <div className="flex flex-col gap-2">
          <PageHeader title={project.title} />

          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4 text-xs font-bold text-zinc-500 uppercase tracking-[0.15em]"
          >
            <Calendar size="12" variant="Bold" /> Due:{" "}
            {format(new Date(project.deadline), "PPP")}
          </motion.span>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-zinc-100 pb-4"
      >
        <Badge
          className={cn(
            "bg-primary text-white rounded-md px-3 py-1 text-[9px] font-black uppercase tracking-widest border-none",
            status.className,
          )}
        >
          {status.label}
        </Badge>

        <div className="flex items-center gap-2 sm:gap-3 justify-end">
          <Tooltip>
            <TooltipTrigger>
              <Link
                to={`/projects/${project.id}/edit`}
                state={{ project }}
                className="ml-auto"
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-2xl hover:bg-zinc-100 items-center justify-center flex ml-0 mt-0 border"
                >
                  <Edit size="32" />
                </Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>Edit project</p>
            </TooltipContent>
          </Tooltip>

          <DeleteProjectModal projectId={project.id} />

          {/* <Link to={`/projects/${project.id}/feedback`} className="ml-auto"> */}
          <Button
            variant="outline"
            className="flex items-center ml-0"
            onClick={() => toast.info("Coming soon")}
          >
            <MessageText size="18" className="mr-2" /> Feedback
          </Button>
          {/* </Link> */}

          <Link
            to={`/projects/${project.id}/announcements`}
            className="ml-auto"
          >
            <Button className="flex items-center ml-0">
              <Brodcast size="18" className="mr-2" /> Announcements
            </Button>
          </Link>
        </div>
      </motion.div>

      <motion.div
        className="grid grid-cols-12 gap-12"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <div className="col-span-12 lg:col-span-8 space-y-12">
          <motion.section className="space-y-2" variants={itemVariants}>
            <SectionHeader
              icon={<DocumentText size="18" variant="Bold" />}
              label="Project Description"
            />
            <div className="bg-zinc-50/50 border border-zinc-200 p-4 rounded-[2rem]">
              <p className="text-zinc-600 leading-relaxed font-medium">
                {project.description}
              </p>
              <div className="grid grid-cols-2 gap-8 mt-10 pt-8 border-t border-zinc-200/50 ml-4">
                <MetaItem
                  label="Created By"
                  value={
                    `${project.created_by.first_name} ${project.created_by.last_name}` ||
                    "--"
                  }
                />
                <MetaItem
                  label="Created At"
                  value={
                    project.created_at
                      ? format(new Date(project.created_at), "PPP")
                      : "--"
                  }
                />
              </div>
            </div>
          </motion.section>

          <ProjectObjectives
            projectId={project.id}
            objectives={project.objectives}
          />
        </div>

        <motion.div className="col-span-12 lg:col-span-4 space-y-10">
          <ProjectTeamMembers
            projectId={project.id}
            members={project.members}
          />

          <Resources projectId={project.id} resources={project.resources} />
        </motion.div>
      </motion.div>
    </div>
  );
}

const MetaItem = ({ label, value }: { label: string; value: string }) => (
  <div className="space-y-1">
    <p className="text-[9px] font-black uppercase text-zinc-400 tracking-widest">
      {label}
    </p>
    <p className="font-bold text-zinc-800 text-sm">{value}</p>
  </div>
);
