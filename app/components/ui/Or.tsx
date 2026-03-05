import { Separator } from "./separator";

const Or = () => {
  return (
    <div className="my-8 flex items-center gap-3">
      <Separator className="flex-1 opacity-50" />
      <span className="text-[10px] uppercase tracking-widest font-bold text-zinc-400">
        OR
      </span>
      <Separator className="flex-1 opacity-50" />
    </div>
  );
};

export default Or;
