"use client";

import React, { useState } from "react";
import { ArrowLeft2 } from "iconsax-reactjs";

import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { cn } from "~/lib/utils";
import PersonnelCard from "./components/PersonnelCard";
import { useNavigate } from "react-router";
import PageHeader from "~/components/ui/PageHeader";
import { motion } from "framer-motion";
import { containerVariants } from "~/motionVariants";

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

export default function PersonnelDirectory() {
  const navigate = useNavigate();
  const [stack, setStack] = useState<"software" | "hardware">("software");

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
        <SectionHeader title="Admins" count={MOCK_PERSONNEL.admins.length} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {MOCK_PERSONNEL.admins.map((admin) => (
            <PersonnelCard key={admin.uid} person={admin} />
          ))}
        </div>
      </motion.section>

      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-zinc-100/50 p-2 rounded-[2rem] border border-zinc-100">
          <div className="flex p-1 gap-1">
            <div className="flex justify-center">
              <button
                onClick={() => setStack("software")}
                className={cn(
                  "px-8 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all",
                  stack === "software"
                    ? "bg-white text-[#225522] shadow-sm"
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
                    ? "bg-white text-[#225522] shadow-sm"
                    : "text-zinc-400",
                )}
              >
                Hardware
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-10">
          <div className="space-y-6">
            <SectionHeader
              title="Leads"
              count={MOCK_PERSONNEL[stack].leads.length}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {MOCK_PERSONNEL[stack].leads.map((lead) => (
                <PersonnelCard key={lead.uid} person={lead} />
              ))}
            </div>
          </div>

          {/* Interns column */}
          <div className="space-y-6">
            <SectionHeader
              title="Interns"
              count={MOCK_PERSONNEL[stack].interns.length}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {MOCK_PERSONNEL[stack].interns.map((intern) => (
                <PersonnelCard key={intern.uid} person={intern} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const SectionHeader = ({ title, count }: { title: string; count: number }) => (
  <div className="flex items-center justify-between border-l-4 border-secondary pl-4 py-1">
    <h2 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500">
      {title}
    </h2>
    <Badge
      variant="outline"
      className="rounded-md font-mono text-xs border-zinc-300 text-zinc-400"
    >
      Count: {count}
    </Badge>
  </div>
);

const StackTab = ({
  active,
  label,
  icon,
  onClick,
}: {
  active: boolean;
  label: string;
  icon: any;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={cn(
      "flex items-center gap-2 px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all",
      active
        ? "bg-white text-primary shadow-sm"
        : "text-zinc-400 hover:text-zinc-600",
    )}
  >
    {icon} {label}
  </button>
);
