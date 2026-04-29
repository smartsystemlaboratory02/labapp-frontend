"use client";

import React, { useMemo, useState } from "react";
import { ArrowLeft2 } from "iconsax-reactjs";

import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { cn } from "~/lib/utils";
import PersonnelCard from "./components/PersonnelCard";
import { useNavigate } from "react-router";
import PageHeader from "~/components/ui/PageHeader";
import { motion } from "framer-motion";
import { containerVariants } from "~/motionVariants";
import { useGetAllPersonnelInfoQuery } from "~/services/personnels/queries";
import { PersonnelDirectorySkeleton } from "./components/PersonnelDirectorySkeleton";
import type { PersonnelInfo } from "~/services/personnels/types";
import Personnel from "../../../uuaug";
import PersonnelDirectorySection from "./components/PersonnelDirectorySection";

const MOCK_PERSONNEL = {
  admins: [
    {
      uid: "1",
      name: "Prof. Dahunsi",
      role: "Admin",
      stack: "Management",
      niche: "Administration",
      initial: "DA",
      color: "bg-primary text-white",
    },
  ],
  software: {
    leads: [
      {
        uid: "2",
        name: "Sarah Chen",
        role: "Lead",
        stack: "Software",
        niche: "Backend",
        initial: "SC",
        color: "bg-blue-100 text-blue-600",
      },
      {
        uid: "2",
        name: "Sarah Chen",
        role: "Lead",
        stack: "Software",
        niche: "Backend",
        initial: "SC",
        color: "bg-blue-100 text-blue-600",
      },
    ],
    interns: [
      {
        uid: "3",
        name: "Samuel Okon",
        role: "Intern",
        stack: "Software",
        niche: "Frontend",
        initial: "SO",
        color: "bg-zinc-100 text-zinc-600",
      },
      {
        uid: "4",
        name: "James Watt",
        role: "Intern",
        stack: "Software",
        niche: "DevOps",
        initial: "JW",
        color: "bg-zinc-100 text-zinc-600",
      },
    ],
  },
  hardware: {
    leads: [
      {
        uid: "5",
        name: "Ibrahim Sule",
        role: "Lead",
        stack: "Hardware",
        niche: "Embedded",
        initial: "IS",
        color: "bg-orange-100 text-orange-600",
      },
    ],
    interns: [
      {
        uid: "6",
        name: "Elena Rodriguez",
        role: "Intern",
        stack: "Hardware",
        niche: "Robotics",
        initial: "ER",
        color: "bg-zinc-100 text-zinc-600",
      },
    ],
  },
};

type GroupedPersonnel = {
  admins: PersonnelInfo[];
  software: {
    leads: PersonnelInfo[];
    interns: PersonnelInfo[];
  };
  hardware: {
    leads: PersonnelInfo[];
    interns: PersonnelInfo[];
  };
};

export default function PersonnelDirectory() {
  const navigate = useNavigate();
  const [stack, setStack] = useState<"software" | "hardware">("software");

  const {
    data: personnelInfo,
    isLoading,
    isError,
    error,
  } = useGetAllPersonnelInfoQuery();

  const groupedPersonnel = useMemo(() => {
    if (!personnelInfo) return null;

    const grouped: GroupedPersonnel = {
      admins: [],
      software: { leads: [], interns: [] },
      hardware: { leads: [], interns: [] },
    };

    for (const person of personnelInfo) {
      const stack = person.stack;
      const role = person.role;

      if (!grouped[stack]) continue;

      if (role === "admin") grouped["admins"].push(person);
      else if (role === "lead") grouped[stack].leads.push(person);
      else grouped[stack].interns.push(person);
    }

    return grouped;
  }, [personnelInfo]);

  if (isLoading) return <PersonnelDirectorySkeleton />;
  if (isError || !groupedPersonnel) return null;

  return (
    <div className="p-6 lg:p-10 mx-auto space-y-10 selection:bg-primary/10">
      <div className="flex items-center gap-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(-1)}
          className="rounded-2xl hover:bg-zinc-100 items-center justify-center flex ml-0 mt-0 border"
        >
          <ArrowLeft2 size="32" />
        </Button>

        <PageHeader title="personnel directory" description="" />
      </div>

      <motion.section variants={containerVariants} className="space-y-6">
        <PersonnelDirectorySection
          personnel={groupedPersonnel.admins}
          role="admin"
        />
      </motion.section>

      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-zinc-100/50 rounded-[2rem] border border-zinc-200 w-fit">
          <div className="flex p-1 gap-1">
            <div className="flex justify-center">
              <button
                onClick={() => setStack("software")}
                className={cn(
                  "px-8 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all",
                  stack === "software"
                    ? "bg-white text-primary shadow-sm"
                    : "text-zinc-400",
                )}
              >
                Software
              </button>
              <button
                onClick={() => setStack("hardware")}
                className={cn(
                  "px-8 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all",
                  stack === "hardware"
                    ? "bg-white text-primary shadow-sm"
                    : "text-zinc-400",
                )}
              >
                Hardware
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-10">
          <PersonnelDirectorySection
            personnel={groupedPersonnel[stack].leads}
            role="lead"
          />
          {/* Interns column */}
          <PersonnelDirectorySection
            personnel={groupedPersonnel[stack].interns}
            role="intern"
          />
        </div>
      </div>
    </div>
  );
}
