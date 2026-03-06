"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Plus,
  Trash,
  Users,
  Calendar as CalendarIcon,
  ClipboardList,
  ArrowRight,
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
import { motion } from "framer-motion";
import PageHeader from "~/components/ui/PageHeader";
import { Add, ArrowLeft2 } from "iconsax-reactjs";

const projectSchema = z.object({
  name: z.string().min(1, "Project name is required"),
  description: z.string().min(10, "Description too short"),
  deadline: z.string().min(1, "Deadline is required"),
  team: z.array(z.string()).min(1, "Assign at least one member"),
  leads: z.array(z.string()).min(1, "Assign at least one lead"),
});

const AddProject = () => {
  const navigate = useNavigate();
  const [objectives, setObjectives] = useState<string[]>([]);
  const [currentObjective, setCurrentObjective] = useState("");

  const form = useForm<z.infer<typeof projectSchema>>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: "",
      description: "",
      deadline: "",
      team: [],
      leads: [],
    },
  });

  const addObjective = () => {
    if (currentObjective.trim()) {
      setObjectives([...objectives, currentObjective.trim()]);
      setCurrentObjective("");
    }
  };

  const MOCK_MEMBERS = [
    { id: "1", name: "Dr. Arinze" },
    { id: "2", name: "Sarah Chen" },
    { id: "3", name: "Ibrahim Sule" },
  ];

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
          <form className="grid grid-cols-1 md:grid-cols-12 gap-8">
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

              <div className="space-y-4">
                <div className="flex items-center justify-between border-b-2 border-zinc-200 pb-1">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-600">
                    Project Milestones
                  </h3>
                  <Badge
                    variant="outline"
                    className="font-mono text-[10px] text-primary border-primary/20"
                  >
                    {objectives.length}
                  </Badge>
                </div>

                <div className="flex gap-2 shrink-0">
                  <Input
                    value={currentObjective}
                    onChange={(e) => setCurrentObjective(e.target.value)}
                    placeholder="Add objective..."
                    className="flex-1 h-11"
                  />
                  {/* TODO: Use arrayItems in react form */}
                  <Button
                    type="button"
                    onClick={addObjective}
                    className="bg-zinc-900 text-white h-10 w-10 p-0 rounded-lg"
                  >
                    <Plus size={16} />
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                {objectives.map((obj, i) => (
                  <div
                    key={i}
                    className="group flex items-center justify-between p-3 bg-white border border-zinc-100 rounded-lg hover:border-primary/30 transition-all shadow-sm"
                  >
                    <div className="flex items-center gap-4">
                      <span className="h-1 w-1 bg-primary rounded-full" />
                      <span className="text-sm text-zinc-600">{obj}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        setObjectives(objectives.filter((_, idx) => idx !== i))
                      }
                    >
                      <Trash
                        size={14}
                        className="text-zinc-300 group-hover:text-red-500"
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="md:col-span-5">
              <div className="sticky top-24 space-y-8 bg-zinc-50/50 border border-zinc-100 p-8 rounded-[2rem]">
                <FormField
                  control={form.control}
                  name="deadline"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[10px] font-black uppercase text-zinc-400 flex items-center gap-2 tracking-tighter">
                        <CalendarIcon size={12} /> Target Deadline
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          {...field}
                          className="border-zinc-200 bg-white h-11"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="space-y-8">
                  <FormField
                    control={form.control}
                    name="team"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-black uppercase text-zinc-400 flex items-center gap-2">
                          <Users size={12} /> Choose Team Members
                        </FormLabel>
                        <Select
                          onValueChange={(val) =>
                            !field.value.includes(val) &&
                            field.onChange([...field.value, val])
                          }
                        >
                          <FormControl>
                            <SelectTrigger className="h-11 bg-zinc-50/50 dark:bg-zinc-900/50">
                              <SelectValue placeholder="Assign personnel..." />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent position="popper">
                            {MOCK_MEMBERS.map((m) => (
                              <SelectItem key={m.id} value={m.id}>
                                {m.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>

                        <div className="flex flex-wrap gap-2 pt-2">
                          {field.value.map((id) => (
                            <button
                              key={id}
                              type="button"
                              onClick={() =>
                                field.onChange(
                                  field.value.filter((mId) => mId !== id),
                                )
                              }
                              className="group flex items-center gap-2 px-3 py-1 bg-white border border-zinc-200 rounded-full text-xs font-medium hover:border-red-200 hover:bg-red-50 transition-all"
                            >
                              {MOCK_MEMBERS.find((m) => m.id === id)?.name}
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

                  <FormField
                    control={form.control}
                    name="leads"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-black uppercase text-secondary">
                          Project Leads
                        </FormLabel>
                        <Select
                          onValueChange={(val) =>
                            !field.value.includes(val) &&
                            field.onChange([...field.value, val])
                          }
                        >
                          <SelectTrigger className="border-zinc-200 h-11 bg-white">
                            <SelectValue placeholder="Assign leads..." />
                          </SelectTrigger>
                          <SelectContent position="popper">
                            {MOCK_MEMBERS.filter((m) =>
                              form.watch("team").includes(m.id),
                            ).map((m) => (
                              <SelectItem key={m.id} value={m.id}>
                                {m.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <div className="flex flex-wrap gap-2 pt-2">
                          {field.value.map((id) => (
                            <Badge
                              key={id}
                              className="bg-secondary text-white border-none rounded-full px-3 py-1 text-[10px] flex gap-1 items-center shadow-md shadow-secondary/20 cursor-pointer"
                              onClick={() =>
                                field.onChange(
                                  field.value.filter((mId) => mId !== id),
                                )
                              }
                            >
                              {MOCK_MEMBERS.find((m) => m.id === id)?.name} ×
                            </Badge>
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

            <Button type="submit" className="flex items-center align-self-end" disabled> <Add className="text-white"/> Add Project</Button>
          </form>
        </Form>
      </main>
    </div>
  );
};

export default AddProject;
