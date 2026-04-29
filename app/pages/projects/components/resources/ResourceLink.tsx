import { ArrowRight, Document, Link1 } from "iconsax-reactjs";
import React from "react";
import { Link } from "react-router";
import { cn } from "~/lib/utils";

const ResourceLink = ({
  title,
  type,
  url
}: {
  title: string;
  type: "doc" | "link";
  url: string;
}) => (
  <Link to={url} target="_blank" className="flex items-center justify-between p-4 bg-white border border-zinc-100 rounded-2xl hover:border-zinc-300 group transition-all text-left">
    <div className="flex items-center gap-3 overflow-hidden">
      <span
        className={cn(
          "group-hover:scale-110 transition-transform",
          type === "doc" ? "text-secondary" : "text-primary",
        )}
      >
        {type === "link" ? <Link1 size="18" /> : <Document size="18" />}
      </span>
      <span className="text-xs font-bold text-zinc-600 truncate">{title}</span>
    </div>
    <ArrowRight
      size="14"
      className="text-zinc-300 group-hover:text-zinc-900 group-hover:translate-x-1 transition-all"
    />
  </Link>
);

export default ResourceLink;
