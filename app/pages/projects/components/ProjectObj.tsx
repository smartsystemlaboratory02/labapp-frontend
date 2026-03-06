import React from "react";

const ProjectObj = ({
  index,
  objective,
  isComplted,
}: {
  index: number;
  objective: string;
  isComplted?: boolean;
}) => {
  return (
    <div className="flex items-center gap-5 p-5 bg-white border border-zinc-100 rounded-3xl hover:border-primary/20 transition-all group">
      <div className="size-8 rounded-xl bg-zinc-50 flex items-center justify-center text-[10px] font-black text-zinc-400 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
        {String(index + 1).padStart(2, "0")}
      </div>
      <span className="font-bold text-sm text-zinc-700">{objective}</span>
    </div>
  );
};

export default ProjectObj;
