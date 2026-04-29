import React from "react";
import { Clock, TickCircle, ArrowRight2 } from "iconsax-reactjs";
import { cn } from "~/lib/utils";

const RequestItem = ({ req }: { req: any }) => (
  <div className="group flex items-center justify-between p-4 rounded-2xl border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-950/50 hover:bg-zinc-50 dark:hover:bg-zinc-900 hover:border-primary/20 hover:shadow-md hover:shadow-zinc-200/10 transition-all duration-300">
    <div className="flex items-center gap-4 min-w-0">
      <div
        className={cn(
          "p-2.5 rounded-xl border shadow-sm transition-colors duration-300",
          req.status === "Pending"
            ? "bg-amber-50 dark:bg-amber-500/5 border-amber-100 dark:border-amber-500/20 text-amber-500"
            : "bg-emerald-50 dark:bg-emerald-500/5 border-emerald-100 dark:border-emerald-500/20 text-emerald-500",
        )}
      >
        {req.status === "Pending" ? (
          <Clock size="20" variant="TwoTone" />
        ) : (
          <TickCircle size="20" variant="Bulk" />
        )}
      </div>
      <div className="min-w-0">
        <p className="font-bold text-sm text-zinc-900 dark:text-zinc-50 truncate group-hover:text-primary transition-colors">
          {req.title}
        </p>
        <div className="flex items-center gap-1.5 mt-0.5">
          <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
            {req.type}
          </span>
          <span className="size-1 rounded-full bg-zinc-300 dark:bg-zinc-700" />
          <span
            className={cn(
              "text-[10px] font-bold",
              req.status === "Pending"
                ? "text-amber-600/80"
                : "text-emerald-600/80",
            )}
          >
            {req.status}
          </span>
        </div>
      </div>
    </div>
    <div className="ml-4 p-1 rounded-full group-hover:bg-primary group-hover:text-white text-zinc-300 transition-all duration-300">
      <ArrowRight2 size="16" variant="Outline" />
    </div>
  </div>
);

export default RequestItem;
