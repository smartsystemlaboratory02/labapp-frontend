import { Card, CardContent } from "~/components/ui/card";

const BentoSkeleton = () => (
  <div className="animate-pulse">
    <Card className="border-none shadow-sm bg-white rounded-3xl overflow-hidden py-2 h-full">
      <CardContent className="p-4 flex items-center gap-4 h-full">
        <div className="p-2 rounded-2xl bg-zinc-200">
          <div className="w-6 h-6 bg-zinc-300 rounded-md" />
        </div>

        <div className="flex flex-col gap-2">
          <div className="h-3 w-20 bg-zinc-200 rounded" />
          <div className="h-6 w-12 bg-zinc-300 rounded" />
        </div>
      </CardContent>
    </Card>
  </div>
);

export default BentoSkeleton;
