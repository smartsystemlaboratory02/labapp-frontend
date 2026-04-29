import { ArrowRight } from "iconsax-reactjs";
import React from "react";
import { cn } from "~/lib/utils";

const ResourceLink = ({
  title,
  icon,
  type,
}: {
  title: string;
  icon: React.ReactNode;
  type: "doc" | "link";
}) => (
  <button className="flex items-center justify-between p-4 bg-white border border-zinc-100 rounded-2xl hover:border-zinc-300 group transition-all text-left">
    <div className="flex items-center gap-3 overflow-hidden">
      <span
        className={cn(
          "group-hover:scale-110 transition-transform",
          type === "doc" ? "text-secondary" : "text-primary",
        )}
      >
        {icon}
      </span>
      <span className="text-xs font-bold text-zinc-600 truncate">{title}</span>
    </div>
    <ArrowRight
      size="14"
      className="text-zinc-300 group-hover:text-zinc-900 group-hover:translate-x-1 transition-all"
    />
  </button>
);

export default ResourceLink;
