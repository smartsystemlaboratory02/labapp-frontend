const Skeleton = ({ className }: { className?: string }) => (
  <div className={`animate-pulse bg-zinc-200/60 rounded-xl ${className}`} />
);

export const PersonnelDirectorySkeleton = () => {
  return (
    <div className="p-6 lg:p-10 mx-auto space-y-10">
      {/* Header */}
      <div className="flex items-center gap-6">
        <Skeleton className="h-10 w-10 rounded-2xl" />
        <Skeleton className="h-6 w-40" />
      </div>

      {/* Admins */}
      <section className="space-y-6">
        <Skeleton className="h-4 w-32" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-40 rounded-[2rem]" />
          ))}
        </div>
      </section>

      {/* Toggle */}
      <Skeleton className="h-12 w-full rounded-[2rem]" />

      {/* Leads */}
      <section className="space-y-6">
        <Skeleton className="h-4 w-32" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-40 rounded-[2rem]" />
          ))}
        </div>
      </section>

      {/* Interns */}
      <section className="space-y-6">
        <Skeleton className="h-4 w-32" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-40 rounded-[2rem]" />
          ))}
        </div>
      </section>
    </div>
  );
};
