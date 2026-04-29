import React from "react";
import { Badge } from "~/components/ui/badge";
import type { PersonnelInfo } from "~/services/personnels/types";
import PersonnelCard from "./PersonnelCard";

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

const PersonnelDirectorySection = ({
  personnel,
  role,
}: {
  personnel: PersonnelInfo[];
  role: "admin" | "intern" | "lead";
}) => {
  const count = personnel.length;
  return (
    <div className="space-y-6">
      <SectionHeader title={`${role}s`} count={count} />
      {count === 0 ? (
        <div className="flex flex-col items-center justify-center text-center py-12 px-6 border border-dashed border-zinc-400 rounded-[2rem] bg-zinc-100/50">
          <div className="size-12 rounded-2xl bg-zinc-200 flex items-center justify-center mb-4">
            <span className="text-lg font-black text-zinc-400">0</span>
          </div>

          <p className="text-sm font-bold text-zinc-700 capitalize">
            No {role}s yet
          </p>

          <p className="text-xs text-zinc-400 mt-1">
            When {role}s are added, they'll appear here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {personnel.map((person) => (
            <PersonnelCard key={person.id} person={person} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PersonnelDirectorySection;
