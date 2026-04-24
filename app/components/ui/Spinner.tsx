import { cn } from "~/lib/utils";

const Spinner = ({ className }: { className?: string }) => (
  <div
    className={cn(
      "w-7 h-7 border-[3px] border-primary border-t-white border-b-white rounded-full animate-spin",
      className,
    )}
  />
);

export default Spinner;
