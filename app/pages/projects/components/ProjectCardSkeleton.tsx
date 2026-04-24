import { Card } from "~/components/ui/card";

const ProjectCardSkeleton = () => (
  <div className="h-full min-w-60 animate-pulse">
    <Card className="h-full border border-zinc-100 bg-white rounded-[2rem] p-6 shadow-sm relative overflow-hidden">
      {/* top badge */}
      <div className="flex justify-between items-start mb-4">
        <div className="h-5 w-16 bg-zinc-200 rounded-full" />
      </div>

      {/* title */}
      <div className="h-5 w-3/4 bg-zinc-300 rounded mb-3" />

      {/* description */}
      <div className="space-y-2 mb-6">
        <div className="h-3 w-full bg-zinc-200 rounded" />
        <div className="h-3 w-5/6 bg-zinc-200 rounded" />
      </div>

      {/* footer */}
      <div className="flex items-center justify-between mt-auto pt-4 border-t border-zinc-50">
        {/* avatars */}
        <div className="flex -space-x-2">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="size-8 rounded-full border-2 border-white bg-zinc-300"
            />
          ))}
        </div>

        {/* deadline */}
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 bg-zinc-300 rounded-full" />
          <div className="h-3 w-16 bg-zinc-200 rounded" />
        </div>
      </div>
    </Card>
  </div>
);

export default ProjectCardSkeleton;
