"use client";

import React, { useEffect, useState } from "react";
import type { ProjectInfoObjective } from "~/services/projects/types";
import { Edit, Trash } from "iconsax-reactjs";
import { CheckCheck, X } from "lucide-react";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import Spinner from "~/components/ui/Spinner";
import { toast } from "sonner";

import { useEditProjectObjectiveMutation } from "~/services/projects/queries";
import { DeleteObjectiveModal } from "./DeleteObjectiveModal";

const ProjectObj = ({
  projectId,
  objective,
  index,
}: {
  projectId: string;
  index: number;
  objective: ProjectInfoObjective;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(objective.objective);

  const {
    mutate: editObjective,
    isPending,
    isSuccess,
    isError,
    error,
  } = useEditProjectObjectiveMutation(projectId, objective.id);

  useEffect(() => {
    if (isError) {
      toast.error(error?.message || "Failed to update objective");
    }

    if (isSuccess) {
      toast.success("Objective updated successfully");
      setIsEditing(false);
    }
  }, [isSuccess, isError, error]);

  const handleSave = () => {
    if (!value.trim()) {
      toast.error("Objective cannot be empty");
      return;
    }

    if (value === objective.objective) {
      toast.info("You did not make any changes");
      return;
    }

    editObjective({ objective: value });
  };

  const handleCancel = () => {
    setValue(objective.objective);
    setIsEditing(false);
  };

  return (
    <div className="group flex items-start gap-4 p-5 bg-white border border-zinc-100 rounded-3xl hover:border-primary/20 transition-all">
      <div className="shrink-0 size-8 rounded-xl bg-zinc-50 flex items-center justify-center text-[10px] font-black text-zinc-400 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
        {String(index + 1).padStart(2, "0")}
      </div>

      <div className="flex-1 min-w-0">
        {isEditing ? (
          <div className="space-y-3">
            <Input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="h-10 border-0 border-b border-zinc-200 rounded-none px-0 bg-transparent focus-visible:ring-0 focus-visible:border-primary"
            />

            <div className="flex items-center gap-2 w-fit ml-auto flex-row-reverse">
              <Button onClick={handleSave} className="h-8 px-6">
                {isPending ? <Spinner /> : <CheckCheck size={16} />}
              </Button>

              <Button
                variant="ghost"
                onClick={handleCancel}
                className="h-8 px-3 border"
              >
                Nevermind
              </Button>
            </div>
          </div>
        ) : (
          <p className="font-medium text-sm text-zinc-700 leading-relaxed wrap-break-words whitespace-pre-wrap">
            {objective.objective}
          </p>
        )}
      </div>

      {!isEditing && (
        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all shrink-0">
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="p-2 rounded-xl border border-zinc-200 hover:bg-zinc-50 transition"
          >
            <Edit size={16} />
          </button>

         <DeleteObjectiveModal projectId={projectId} objectiveId={objective.id} />
        </div>
      )}
    </div>
  );
};

export default ProjectObj;
