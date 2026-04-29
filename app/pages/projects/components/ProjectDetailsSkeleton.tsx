import { Skeleton } from "~/components/ui/skeleton";

const ProjectDetailsSkeleton = () => {
  return (
    <div className="p-6 lg:p-10 mx-auto space-y-10 max-w-400">
      {/* HEADER */}
      <div className="flex items-center gap-6">
        <Skeleton className="h-10 w-10 rounded-2xl" />

        <div className="flex flex-col gap-3">
          <Skeleton className="h-6 w-64" />
          <Skeleton className="h-3 w-40" />
        </div>
      </div>

      {/* TOP BAR */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-zinc-100 pb-4">
        <Skeleton className="h-6 w-24 rounded-md" />

        <div className="flex gap-3">
          <Skeleton className="h-10 w-10 rounded-2xl" />
          <Skeleton className="h-10 w-10 rounded-2xl" />
          <Skeleton className="h-10 w-28 rounded-md" />
          <Skeleton className="h-10 w-32 rounded-md" />
        </div>
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-12 gap-12">
        {/* LEFT */}
        <div className="col-span-12 lg:col-span-8 space-y-12">
          {/* DESCRIPTION */}
          <div className="space-y-4">
            <Skeleton className="h-4 w-40" />

            <div className="bg-zinc-50/50 border border-zinc-200 p-4 rounded-[2rem] space-y-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-[90%]" />
              <Skeleton className="h-4 w-[80%]" />

              <div className="grid grid-cols-2 gap-8 mt-10 pt-8 border-t border-zinc-200/50">
                <div className="space-y-2">
                  <Skeleton className="h-3 w-20" />
                  <Skeleton className="h-4 w-32" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-3 w-20" />
                  <Skeleton className="h-4 w-32" />
                </div>
              </div>
            </div>
          </div>

          {/* OBJECTIVES */}
          <div className="space-y-4">
            <Skeleton className="h-4 w-40" />

            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 p-5 bg-white border border-zinc-100 rounded-3xl"
                >
                  <Skeleton className="size-8 rounded-xl" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-[80%]" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="col-span-12 lg:col-span-4 space-y-10">
          {/* TEAM */}
          <div className="space-y-4">
            <Skeleton className="h-4 w-32" />

            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-4 rounded-2xl border border-zinc-100"
                >
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <Skeleton className="h-4 w-28" />
                  </div>
                  <Skeleton className="h-8 w-16 rounded-md" />
                </div>
              ))}
            </div>
          </div>

          {/* SUBMISSIONS */}
          <div className="space-y-4">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-10 w-32 rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailsSkeleton;
