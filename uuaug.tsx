"use client";

import React, { useState } from "react";
import { UserAdd, SearchNormal1, Code, Cpu, More } from "iconsax-reactjs";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Badge } from "~/components/ui/badge";
import { cn } from "~/lib/utils";
import PersonnelCard from "~/pages/personnel/components/PersonnelCard";

export default function Personnel() {
  const [stack, setStack] = useState<"software" | "hardware">("software");

  return (
    <div className="p-6 lg:p-10 mx-auto space-y-12">
      {/* Header & Global Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <h1 className="text-4xl font-black tracking-tighter text-zinc-900 uppercase">
          Personnel
        </h1>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <SearchNormal1
              className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
              size="16"
            />
            <Input
              placeholder="Search name..."
              className="pl-10 h-10 border-zinc-200 rounded-xl bg-zinc-50"
            />
          </div>
          <Button className="rounded-xl bg-[#225522] text-white h-10 px-5 font-bold text-xs uppercase tracking-wider">
            <UserAdd size={18} className="mr-2" /> Add Member
          </Button>
        </div>
      </div>

      <hr className="border-zinc-100" />

      {/* Admin Section */}
      <section className="space-y-6">
        <h2 className="text-[11px] font-black uppercase tracking-[0.2em] text-zinc-400">
          Admins
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <PersonnelCard
            name="Dr. Arinze"
            role="Admin"
            niche="Director"
            initial="DA"
            color="bg-[#225522] text-white"
          />
        </div>
      </section>

      {/* Stack Toggle */}
      

      {/* Leads & Interns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Leads */}
        <div className="space-y-6">
          <h2 className="text-[11px] font-black uppercase tracking-[0.2em] text-zinc-400">
            Leads
          </h2>
          <div className="space-y-3">
            <PersonnelCard
              name="Sarah Chen"
              role="Lead"
              niche="Backend"
              initial="SC"
              color="bg-zinc-100 text-zinc-600"
            />
          </div>
        </div>

        {/* Interns */}
        <div className="space-y-6">
          <h2 className="text-[11px] font-black uppercase tracking-[0.2em] text-zinc-400">
            Interns
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <PersonnelCard
              name="Samuel Okon"
              role="Intern"
              niche="Frontend"
              initial="SO"
              color="bg-zinc-50 text-zinc-400"
            />
            <PersonnelCard
              name="James Watt"
              role="Intern"
              niche="DevOps"
              initial="JW"
              color="bg-zinc-50 text-zinc-400"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
