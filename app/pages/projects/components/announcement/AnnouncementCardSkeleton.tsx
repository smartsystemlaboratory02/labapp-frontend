import { Skeleton } from "~/components/ui/skeleton";
import { motion } from "framer-motion";

const AnnouncementCardSkeleton = () => {
  return (
    <div className="p-6 bg-white border border-zinc-100 rounded-[2rem] shadow-sm">
      {/* TOP ROW */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Skeleton className="size-2 rounded-full" />
          <Skeleton className="h-2 w-20" />
        </div>

        <div className="flex items-center gap-1">
          <Skeleton className="h-2 w-16" />
        </div>
      </div>

      {/* TITLE */}
      <Skeleton className="h-5 w-3/4 mb-2" />

      {/* CONTENT */}
      <div className="space-y-2 mb-4">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-[90%]" />
        <Skeleton className="h-3 w-[80%]" />
      </div>

      {/* FOOTER */}
      <div className="flex items-center justify-between pt-4 border-t border-zinc-50">
        <Skeleton className="h-2 w-32" />
        <Skeleton className="h-6 w-6 rounded-md" />
      </div>
    </div>
  );
};

export default AnnouncementCardSkeleton;
