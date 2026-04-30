import { Skeleton } from "~/components/ui/skeleton";

const PersonnelDetailsSkeleton = () => {
  return (
    <div className="p-6 lg:p-10 mx-auto max-w-400 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-6">
          <Skeleton className="size-10 rounded-2xl" />
          <Skeleton className="h-6 w-40 rounded-md" />
        </div>

        <Skeleton className="size-10 rounded-full" />
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left column */}
        <div className="lg:col-span-4 space-y-6">
          {/* Hero */}
          <div className="bg-white border border-zinc-200 rounded-[2.5rem] p-6 flex flex-col items-center gap-4">
            <Skeleton className="size-20 rounded-2xl" />

            <div className="space-y-2 text-center">
              <Skeleton className="h-4 w-32 mx-auto" />
              <Skeleton className="h-3 w-24 mx-auto" />
            </div>

            <Skeleton className="h-6 w-20 rounded-full" />
          </div>

          {/* Contact */}
          <div className="bg-primary/5 border border-primary/10 rounded-[2rem] p-6 space-y-4">
            <Skeleton className="h-3 w-32" />

            <div className="space-y-3">
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 bg-white rounded-2xl border border-primary/10"
                >
                  <div className="flex items-center gap-3">
                    <Skeleton className="size-8 rounded-lg" />
                    <Skeleton className="h-3 w-40" />
                  </div>

                  <Skeleton className="size-5 rounded" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="lg:col-span-8 space-y-6">
          {/* Info cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="bg-white border border-zinc-200 rounded-[2rem] p-6 flex items-center gap-4"
              >
                <Skeleton className="size-12 rounded-2xl" />
                <div className="space-y-2">
                  <Skeleton className="h-3 w-20" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>
            ))}
          </div>

          {/* Bio */}
          <div className="bg-white border border-zinc-200 rounded-[2.5rem] p-8 space-y-4">
            <Skeleton className="h-4 w-40" />

            <div className="space-y-2">
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-5/6" />
              <Skeleton className="h-3 w-2/3" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonnelDetailsSkeleton;
