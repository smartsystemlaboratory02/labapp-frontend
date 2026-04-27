"use client";

import React, { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import { MessageAdd, Edit, CloseCircle, Trash } from "iconsax-reactjs";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { useDeleteProjectMutation } from "~/services/projects/queries";
import Spinner from "~/components/ui/Spinner";
import { toast } from "sonner";
import { useNavigate } from "react-router";

export function DeleteProjectModal({ projectId }: { projectId: string }) {
  const navigate = useNavigate();

  const {
    mutate: deleteProject,
    isPending: isDeletingProject,
    isError: isProjectError,
    error: projectError,
    isSuccess: isProjectDeleted,
  } = useDeleteProjectMutation(projectId);

  useEffect(() => {
    if (isProjectError) {
      toast.error(
        projectError.message || "Failed to delete project. Please try again.",
      );
    }

    if (isProjectDeleted) {
      toast.success("Project deleted successfully.");

      setTimeout(() => {
        navigate("/projects");
      }, 2000);
    }
  }, [isProjectDeleted, isProjectError, projectError]);

  return (
    <Dialog>
      <Tooltip>
        <TooltipTrigger asChild>
          <DialogTrigger asChild>
            <div className="rounded-2xl items-center justify-center flex ml-0 mt-0 border text-destructive border-destructive hover:bg-destructive/10 hover:text-destructive p-2 hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5 transition-all">
              <Trash size="16" />
            </div>
          </DialogTrigger>
        </TooltipTrigger>
        <TooltipContent className="bg-destructive">
          <p className="bg-destructive text-white">Delete project</p>
        </TooltipContent>
      </Tooltip>
      <DialogContent className="sm:max-w-125 border-none rounded-[2rem] p-8 shadow-2xl">
        <DialogHeader className="space-y-2">
          <div className="size-12 rounded-2xl bg-destructive/10 flex items-center justify-center text-destructive">
            <Trash size="24" variant="Bold" />
          </div>
          <DialogTitle className="text-2xl font-black uppercase tracking-tighter">
            Are you sure you want to delete this project?
          </DialogTitle>
          <p className="text-xs text-zinc-400 font-bold uppercase tracking-wider">
            This action cannot be undone. All project data, including feedback
            and submissions, will be permanently deleted.
          </p>
        </DialogHeader>

        <DialogFooter className="flex flex-col sm:flex-row gap-3 ">
          <DialogClose asChild>
            <Button variant="outline" className="px-12 ml-0">
              Cancel
            </Button>
          </DialogClose>
          <Button
            className="ml-0 flex items-center justify-center hover:shadow-destructive/20"
            variant="destructive"
            onClick={() => deleteProject()}
            disabled={isDeletingProject}
          >
            {isDeletingProject ? (
              <Spinner className="border-l-destructive border-r-destructive" />
            ) : (
              "Delete Project"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
