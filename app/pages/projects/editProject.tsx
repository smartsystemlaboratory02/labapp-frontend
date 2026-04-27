"use client";

import React, { useEffect, useMemo } from "react";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Plus,
  Trash,
  Users,
  Calendar as CalendarIcon,
  Info,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { Badge } from "~/components/ui/badge";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import PageHeader from "~/components/ui/PageHeader";
import { Add, ArrowLeft2 } from "iconsax-reactjs";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { Calendar } from "~/components/ui/calendar";
import { format } from "date-fns";
import Spinner from "~/components/ui/Spinner";
import { toast } from "sonner";
import { useEditProjectMutation } from "~/services/projects/queries";
import type { ProjectInfo } from "~/services/projects/types";
import { PROJECT_STATUS_MAP } from "~/services/projects/utils";
import { is } from "date-fns/locale";

const projectSchema = z.object({
  name: z.string().min(1, "Project name is required").optional(),
  description: z.string().min(10, "Description too short").optional(),
  deadline: z.date().optional(),
  status: z.enum(["in_progress", "completed", "cancelled"]).optional(),
});

const AddProject = () => {
  const navigate = useNavigate();
  const state = useLocation().state;
  const project: ProjectInfo = state?.project || null;

  useEffect(() => {
    if (!project) {
      toast.error("Something went wrong. Please try again.");

      setTimeout(() => {
        navigate("/projects");
      }, 2000);
    }
  }, [project]);

  const status = project?.status ? PROJECT_STATUS_MAP[project.status] : null;

  const form = useForm<z.infer<typeof projectSchema>>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: project?.title || "",
      description: project?.description || "",
      deadline: project?.deadline ? new Date(project.deadline) : new Date(),
      status: project?.status || "in_progress",
    },
  });

  const {
    mutate: editProject,
    isPending: isEditingProject,
    isError: isEditingProjectError,
    error: editProjectError,
    isSuccess: projectEdited,
  } = useEditProjectMutation(project.id);

  useEffect(() => {
    if (isEditingProjectError) {
      toast.error(
        editProjectError.message || "Something went wrong. Please try again.",
      );
    }

    if (projectEdited) {
      toast.success("Project edited successfully");

      setTimeout(() => {
        navigate("/projects");
      }, 2000);
    }
  }, [isEditingProjectError, editProjectError, projectEdited]);

  const onSubmit = (data: z.infer<typeof projectSchema>) => {
    const payload: Record<string, any> = {};

    for (const key in form.formState.dirtyFields) {
      const value = data[key as keyof z.infer<typeof projectSchema>];

      if (value === undefined) continue;

      payload[key] =
        key === "deadline" && value instanceof Date
          ? value.toISOString()
          : value;
    }

    editProject(payload);
  };

  return (
    <div className="p-6 lg:p-10 max-w-400 mx-auto space-y-8">
      <div className="flex items-center gap-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(-1)}
          className="rounded-2xl hover:bg-zinc-100 items-center justify-center flex ml-0 mt-0 border"
        >
          <ArrowLeft2 size="32" />
        </Button>

        <PageHeader
          title="Edit Project"
          description="Make changes to your project details and update its status."
        />
      </div>

      <main className="max-w-300 mx-auto p-6 ">
        <Form {...form}>
          <form
            className="grid grid-cols-1 md:grid-cols-12 gap-8"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className="md:col-span-7 space-y-8">
              <section className="space-y-6">
                <div className="grid gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="Enter project name..."
                            {...field}
                            className="border-0 border-b border-zinc-200 rounded-none px-0 h-12 text-2xl font-medium focus-visible:ring-0 focus-visible:border-primary transition-colors placeholder:text-zinc-400 shadow-none bg-transparent"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-bold uppercase tracking-widest text-zinc-600">
                          Description
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Detailed description of the project."
                            className="min-h-30 placeholder:text-zinc-400 s"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </section>
            </div>

            <div className="md:col-span-5">
              <div className="sticky top-24 space-y-6 bg-zinc-50/70 border border-zinc-100 p-6 rounded-[2rem]">
                {/* STATUS */}
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-black uppercase text-zinc-400 tracking-tight">
                        Status
                      </FormLabel>

                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="h-11 bg-white">
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                        </FormControl>

                        <SelectContent>
                          <SelectItem value="in_progress">
                            In Progress
                          </SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                          <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* DEADLINE */}
                <FormField
                  control={form.control}
                  name="deadline"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className="text-xs font-black uppercase text-zinc-400 flex items-center gap-2 tracking-tight">
                        <CalendarIcon size={12} /> Deadline
                      </FormLabel>

                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <button
                              type="button"
                              className={`flex w-full items-center gap-3 rounded-2xl border px-4 py-3 text-left transition-all hover:border-slate-300 focus:border-primary outline-none ${
                                !field.value
                                  ? "text-slate-400"
                                  : "text-slate-900"
                              }`}
                            >
                              <CalendarIcon
                                size={16}
                                className="text-slate-400"
                              />
                              <span className="text-sm">
                                {field.value
                                  ? format(field.value, "PPP")
                                  : "Select deadline"}
                              </span>
                            </button>
                          </FormControl>
                        </PopoverTrigger>

                        <PopoverContent className="w-auto p-0 rounded-2xl border shadow-xl">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                          />
                        </PopoverContent>
                      </Popover>

                      <FormMessage className="text-xs text-rose-500 ml-1" />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <Button
              type="submit"
              className="align-self-end mt-4 ml-auto flex items-center gap-2"
              disabled={isEditingProject}
            >
              {isEditingProject ? (
                <Spinner />
              ) : (
                <div className="flex items-center ">
                  <Add className="text-white" /> Add Project{" "}
                </div>
              )}
            </Button>
          </form>
        </Form>
      </main>
    </div>
  );
};

export default AddProject;
