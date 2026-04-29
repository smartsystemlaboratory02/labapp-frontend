import { ArrowUp, ArrowDown } from "iconsax-reactjs";

const ReportItem = ({ report }: { report: any }) => (
  <div className="flex items-center gap-4 p-3.5 rounded-2xl bg-zinc-50/80 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800 relative">
    <div className="p-2.5 rounded-xl bg-white dark:bg-zinc-950 shadow-sm border border-zinc-100 dark:border-zinc-800 text-zinc-400">
      {report.direction === "outgoing" ? (
        <ArrowUp size="18" />
      ) : (
        <ArrowDown size="18" />
      )}
    </div>
    <div className="flex-1 min-w-0">
      <p className="font-bold text-zinc-900 dark:text-zinc-50 text-sm truncate">
        {report.title}
      </p>
      <p className="text-[10px] uppercase font-black text-primary tracking-tighter opacity-80">
        {report.report_type}
      </p>
    </div>
  </div>
);

export default ReportItem;
