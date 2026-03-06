import React from "react";

const SectionHeader = ({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) => (
  <div className="flex items-center gap-2.5 opacity-80">
    <span className="text-primary">{icon}</span>
    <h2 className="text-xs font-black uppercase tracking-[0.25em] text-zinc-600">
      {label}
    </h2>
  </div>
);

export default SectionHeader;
