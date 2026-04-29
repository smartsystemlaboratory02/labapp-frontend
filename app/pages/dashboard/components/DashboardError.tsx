import { Button } from "~/components/ui/button";
import { Warning2 } from "iconsax-reactjs";

const DashboardError = ({ onRetry }: { onRetry: () => void }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50/50 dark:bg-zinc-950 p-6">
      <div className="max-w-md w-full bg-white border border-zinc-200 rounded-[2rem] p-8 text-center shadow-sm space-y-6">
        <div className="flex justify-center">
          <div className="p-4 rounded-2xl bg-destructive/10 text-destructive">
            <Warning2 size={28} />
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="text-lg font-black text-zinc-800 uppercase tracking-wide">
            Something went wrong
          </h2>
          <p className="text-sm text-zinc-500 font-medium">
            We couldn't load your dashboard. Please try again.
          </p>
        </div>

        <Button onClick={onRetry} className="w-full h-11 rounded-xl font-bold">
          Retry
        </Button>
      </div>
    </div>
  );
};

export default DashboardError;
