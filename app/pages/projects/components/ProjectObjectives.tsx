import React, { useEffect, useState } from "react";
import { containerVariants, itemVariants } from "~/motionVariants";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAddProjectObjectiveMutation } from "~/services/projects/queries";
import { motion } from "framer-motion";

import Spinner from "~/components/ui/Spinner";
import type { ProjectInfoObjective } from "~/services/projects/types";
import { Add, Direct } from "iconsax-reactjs";
import SectionHeader from "~/components/ui/SectionHeader";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "~/components/ui/form";
import ProjectObj from "./ProjectObj";
import { toast } from "sonner";
import * as z from "zod";
import { CheckCheck, Minus } from "lucide-react";

const objectiveSchema = z.object({
  objective: z.string().min(1, "No one wants an empty objective!"),
});

const ProjectObjectives = ({
  projectId,
  objectives,
}: {
  projectId: string;
  objectives: ProjectInfoObjective[];
}) => {
  const [isAddingObjectiveState, setIsAddingObjectiveState] = useState(false);

  const objectiveForm = useForm<z.infer<typeof objectiveSchema>>({
    resolver: zodResolver(objectiveSchema),
    defaultValues: {
      objective: "",
    },
  });

  const {
    mutate: addObjective,
    isPending: isAddingObjective,
    isError: isObjectiveError,
    error: objectiveError,
    isSuccess: isObjectiveSuccess,
  } = useAddProjectObjectiveMutation(projectId);

  useEffect(() => {
    if (isObjectiveError) {
      toast.error(
        objectiveError.message || "Could not add objective. Please try again.",
      );
    }

    if (isObjectiveSuccess) {
      toast.success("Objective added successfully!");
      objectiveForm.reset();
      setIsAddingObjectiveState(false);
    }
  }, [isObjectiveError, objectiveError, isObjectiveSuccess]);

  const onAddObjective = (data: z.infer<typeof objectiveSchema>) => {
    addObjective(data.objective);
  };

  return (
      <div className="col-span-12 lg:col-span-8 space-y-12">
        <motion.section className="space-y-4" variants={itemVariants}>
          <SectionHeader
            icon={<Direct size="18" variant="Bold" />}
            label="Project Objectives"
          />
          <div className="grid gap-3">
            {objectives.map((objective, index) => (
              <ProjectObj
                key={objective.id}
                objective={objective}
                index={index}
              />
            ))}
          </div>

          {isAddingObjectiveState && (
            <Form {...objectiveForm}>
              <form
                className="flex items-center gap-4"
                onSubmit={objectiveForm.handleSubmit(onAddObjective)}
              >
                <div className="flex-1">
                  <FormField
                    control={objectiveForm.control}
                    name="objective"
                    render={({ field }) => (
                      <FormItem>
                        <Input
                          {...field}
                          placeholder="Add objective..."
                          className="flex-1 h-9 shrink-0 grow w-full"
                        />
                        <FormMessage className="ml-4" />
                      </FormItem>
                    )}
                  />
                </div>

                <Button
                  type="submit"
                  size="sm"
                  className="h-8 w-12 rounded-full border-dashed border-zinc-300 bg-primary text-white hover flex items-center"
                >
                  {isAddingObjective ? <Spinner /> : <CheckCheck size={20} />}
                </Button>
              </form>
            </Form>
          )}
        </motion.section>

        <Button
          type="button"
          size="sm"
          onClick={() => setIsAddingObjectiveState((prev) => !prev)}
          className="h-8 w-12 rounded-full border-dashed border-zinc-300 bg-primary text-white hover flex items-center"
        >
          {isAddingObjectiveState ? <Minus size={20} /> : <Add size={20} />}
        </Button>
      </div>
  );
};

export default ProjectObjectives;
