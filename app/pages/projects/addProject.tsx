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
import { useNavigate } from "react-router";

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
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Calendar } from "~/components/ui/calendar";
import { format } from "date-fns";
import { useGetAllPersonnelQuery } from "~/services/personnels/queries";
import Spinner from "~/components/ui/Spinner";
import { toast } from "sonner";
import { type Personnel } from "~/services/personnels/types";
import { getInitials } from "~/utils/utils";
import { useCreateProjectMutation } from "~/services/projects/queries";

const projectSchema = z.object({
  name: z.string().min(1, "Project name is required"),
  description: z.string().min(10, "Description too short"),
  target_deadline: z.date().refine((val) => val !== null && val !== undefined, {
    message: "Deadline is required",
  }),
  project_members: z
    .array(
      z.object({
        user_id: z.string(),
        role: z.enum(["intern", "lead"]),
      }),
    )
    .min(1, "At least one team member is required"),
  project_objectives: z
    .array(
      z.object({
        objective: z
          .string()
          .min(1, "At least one project objective is required"),
        status: z.string(),
      }),
    )
    .min(1, "At least one project objective is required"),
});

const AddProject = () => {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof projectSchema>>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: "",
      description: "",
      target_deadline: new Date(),
      project_members: [],
      project_objectives: [{ objective: "", status: "in_progress" }],
    },
  });

  const {
    append: teamMembersAppend,
    remove: teamMembersRemove,
    replace: teamMemberReplace,
  } = useFieldArray({
    control: form.control,
    name: "project_members",
  });

  const {
    fields: projectObjsFields,
    append: projectObjsAppend,
    remove: projectObjsRemove,
  } = useFieldArray({
    control: form.control,
    name: "project_objectives",
  });

  const teamMembers = useWatch({
    control: form.control,
    name: "project_members",
  });

  const {
    data: allPersonnel = [],
    isFetching: isGettingAllPersonnel,
    isError: isGettingAllPersonnelError,
    error: getAllPersonnelError,
  } = useGetAllPersonnelQuery();

  const {
    mutate: createProject,
    isPending: isCreatingProject,
    isError: isCreatingProjectError,
    error: createProjectError,
    isSuccess: projectCreated,
  } = useCreateProjectMutation();

  useEffect(() => {
    console.log(allPersonnel);

    if (isGettingAllPersonnelError) {
      toast.error(
        getAllPersonnelError.message ||
          "Something went wrong. Please try again.",
      );

      setTimeout(() => {
        navigate("/projects");
      }, 2000);
    }

    if (isCreatingProjectError) {
      toast.error(
        createProjectError.message || "Something went wrong. Please try again.",
      );
    }

    if (projectCreated) {
      toast.success("Project created successfully");

      setTimeout(() => {
        navigate("/projects");
      }, 2000);
    }
  }, [
    isGettingAllPersonnelError,
    getAllPersonnelError,
    isCreatingProjectError,
    createProjectError,
    projectCreated,
  ]);

  const personnelMap = useMemo(() => {
    return new Map(allPersonnel.map((p) => [p.id, p]));
  }, [allPersonnel]);

  const onSubmit = (data: z.infer<typeof projectSchema>) => {
    createProject({
      ...data,
      target_deadline: data.target_deadline.toISOString(),
    });
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
          title="initialize"
          description="Let's get the project started"
        />
      </div>

      <main className="max-w-300 mx-auto p-6 ">
        <Form {...form}>
          <form
            className="grid grid-cols-1 md:grid-cols-12 gap-8"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className="md:col-span-7 space-y-12">
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

              {/* Project Objectives */}
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b-2 border-zinc-200 pb-1">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-600">
                    Project Milestones
                  </h3>
                  <Badge
                    variant="outline"
                    className="font-mono text-xs text-primary border-primary/20 font-semibold"
                  >
                    {form.watch(`project_objectives`).length}
                  </Badge>
                </div>

                {projectObjsFields.map((field, index) => (
                  <div className="flex items-center gap-5" key={field.id}>
                    <div className="flex-1">
                      <FormField
                        control={form.control}
                        name={`project_objectives.${index}.objective`}
                        render={({ field }) => (
                          <FormItem>
                            <Input
                              {...field}
                              placeholder="Add objective..."
                              className="flex-1 h-9 shrink-0 grow w-full"
                            />
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => projectObjsRemove(index)}
                      className="p-0 text-zinc-400 hover:text-red-500 rounded-2xl hover:bg-zinc-100 items-center justify-center flex ml-0 mt-0 border"
                    >
                      <Trash size={12} />
                    </Button>
                  </div>
                ))}

                <Button
                  type="button"
                  size="sm"
                  onClick={() =>
                    projectObjsAppend({ objective: "", status: "in_progress" })
                  }
                  className="h-8 w-12 rounded-full border-dashed border-zinc-300 bg-primary text-white hover flex items-center"
                >
                  <Add size={18} />
                </Button>
              </div>
            </div>

            <div className="md:col-span-5">
              <div className="sticky top-24 space-y-8 bg-zinc-50/50 border border-zinc-100 p-8 rounded-[2rem]">
                <FormField
                  control={form.control}
                  name="target_deadline"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className="text-xs font-black uppercase text-zinc-400 flex items-center gap-2 tracking-tighter">
                        <CalendarIcon size={12} /> Target Deadline
                      </FormLabel>

                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <button
                              type="button"
                              className={`flex w-full items-center gap-3 rounded-2xl border-2 bg-slate-50/50 px-5 py-4 text-left transition-all hover:border-slate-200 focus:border-primary outline-none ${
                                !field.value
                                  ? "text-slate-400"
                                  : "text-slate-900"
                              } border-slate-200 h-full`}
                            >
                              <CalendarIcon
                                size={18}
                                className="text-slate-400"
                              />
                              <span className="text-xs font-medium">
                                {field.value
                                  ? format(field.value, "PPP")
                                  : "Target Deadline"}
                              </span>
                            </button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent
                          className="w-auto p-0 rounded-2xl border-slate-200 shadow-2xl"
                          align="start"
                        >
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

                {/* Team members */}
                <div className="space-y-8">
                  <FormField
                    control={form.control}
                    name="project_members"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-black uppercase text-zinc-400 flex items-center gap-2">
                          <Users size={12} /> Choose Team Members
                        </FormLabel>
                        <Select
                          onValueChange={(val) => {
                            const existsInList = teamMembers.some(
                              (member) => member.user_id === val,
                            );

                            if (!existsInList) {
                              teamMembersAppend({
                                user_id: val,
                                role: "intern",
                              });
                            }
                          }}
                        >
                          <FormControl>
                            <SelectTrigger className="h-11 bg-zinc-50/50 dark:bg-zinc-900/50">
                              <SelectValue
                                placeholder={
                                  isGettingAllPersonnel
                                    ? "Loading members..."
                                    : "Assign members"
                                }
                              />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent position="popper">
                            {isGettingAllPersonnel ? (
                              <Spinner className="mx-auto my-4" />
                            ) : (
                              allPersonnel.map((member: Personnel) => (
                                <SelectItem
                                  key={member.id}
                                  value={member.id}
                                  className="flex items-center gap-6"
                                >
                                  <Avatar>
                                    <AvatarImage
                                      src={member.profile_img || undefined}
                                    />
                                    <AvatarFallback>
                                      {member.first_name || member.last_name
                                        ? getInitials(
                                            member.first_name,
                                            member.last_name,
                                          )
                                        : "?"}
                                    </AvatarFallback>
                                  </Avatar>
                                  {member.first_name} {member.last_name}
                                </SelectItem>
                              ))
                            )}
                          </SelectContent>
                        </Select>

                        <div className="flex flex-wrap gap-2 pt-2">
                          {teamMembers
                            .filter((member) => member.role === "intern")
                            .map((member) => (
                              <button
                                key={member.user_id}
                                type="button"
                                onClick={() => {
                                  const index = teamMembers.findIndex(
                                    (teamMember) =>
                                      teamMember.user_id === member.user_id,
                                  );

                                  if (index !== -1) {
                                    teamMembersRemove(index);
                                  }
                                }}
                                className="group flex items-center gap-2 px-3 py-1 bg-white border border-zinc-200 rounded-full text-xs font-medium hover:border-red-200 hover:bg-red-50 transition-all"
                              >
                                {(() => {
                                  const selectedMember = personnelMap.get(
                                    member.user_id,
                                  );

                                  return selectedMember
                                    ? `${selectedMember.first_name ?? ""} ${selectedMember.last_name ?? ""}`.trim()
                                    : "Unknown";
                                })()}
                                <Plus
                                  size={12}
                                  className="rotate-45 text-zinc-400 group-hover:text-red-500"
                                />
                              </button>
                            ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Team leads */}
                  <FormField
                    control={form.control}
                    name="project_members"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-black uppercase text-secondary">
                          Project Leads
                        </FormLabel>
                        <Select
                          onValueChange={(val) => {
                            const index = teamMembers.findIndex(
                              (member) => member.user_id === val,
                            );

                            if (index !== -1) {
                              const updated = [...teamMembers];
                              updated[index].role = "lead";

                              teamMemberReplace(updated);
                            }
                          }}
                        >
                          <SelectTrigger className="border-zinc-200 h-11 bg-white">
                            <SelectValue
                              placeholder={
                                isGettingAllPersonnel
                                  ? "Loading leads..."
                                  : "Assign leads"
                              }
                            />
                          </SelectTrigger>
                          <SelectContent position="popper">
                            {allPersonnel
                              .filter((member) =>
                                teamMembers.some(
                                  (teamMemeber) =>
                                    teamMemeber.user_id === member.id,
                                ),
                              )
                              .map((member) => (
                                <SelectItem
                                  key={member.id}
                                  value={member.id}
                                  className="flex items-center gap-6"
                                >
                                  <Avatar>
                                    <AvatarImage
                                      src={member.profile_img || undefined}
                                    />
                                    <AvatarFallback>
                                      {member.first_name || member.last_name
                                        ? getInitials(
                                            member.first_name,
                                            member.last_name,
                                          )
                                        : "?"}
                                    </AvatarFallback>
                                  </Avatar>
                                  {member.first_name} {member.last_name}
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>

                        <div className="flex flex-wrap gap-2 pt-2">
                          {teamMembers
                            .filter((member) => member.role === "lead")
                            .map((member) => (
                              <button
                                key={member.user_id}
                                type="button"
                                onClick={(event) => {
                                  const index = teamMembers.findIndex(
                                    (teamMember) =>
                                      teamMember.user_id === member.user_id,
                                  );

                                  if (index !== -1) {
                                    const updated = [...teamMembers];
                                    updated[index].role = "intern";

                                    teamMemberReplace(updated);
                                  }
                                }}
                                className="group flex items-center gap-2 px-3 py-1 bg-white border border-zinc-200 rounded-full text-xs font-medium hover:border-red-200 hover:bg-red-50 transition-all"
                              >
                                {(() => {
                                  const selectedMember = allPersonnel.find(
                                    (m) => m.id === member.user_id,
                                  );

                                  return selectedMember
                                    ? `${selectedMember.first_name ?? ""} ${selectedMember.last_name ?? ""}`.trim()
                                    : "Unknown";
                                })()}
                                <Plus
                                  size={12}
                                  className="rotate-45 text-zinc-400 group-hover:text-red-500"
                                />
                              </button>
                            ))}
                        </div>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="bg-white p-4 rounded-xl border border-zinc-100 flex items-start gap-3 shadow-sm">
                  <Info size={16} className="text-primary shrink-0 mt-0.5" />
                  <p className="text-[10px] text-zinc-500 leading-normal">
                    Assigned leads will receive notifications for all project
                    updates and research submissions.
                  </p>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              className="align-self-end mt-4 ml-auto flex items-center gap-2"
              disabled={isCreatingProject}
            >
              {isCreatingProject ? (
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
