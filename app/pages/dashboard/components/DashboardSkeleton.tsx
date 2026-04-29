import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "~/motionVariants";

const SkeletonBlock = ({ className }: { className?: string }) => (
  <div className={`animate-pulse bg-zinc-200/70 rounded-xl ${className} `} />
);

const DashboardSkeleton = () => {
  return (
    <div className="min-h-screen bg-zinc-50/50 dark:bg-zinc-950 p-4 sm:p-6 lg:p-10">
      <div className="max-w-400 mx-auto grid grid-cols-1 dt:grid-cols-3 gap-6 lg:gap-8">
        {/* LEFT */}
        <div className="space-y-6 lg:space-y-8 dt:col-span-2">
          {/* WelcomeHero */}
          <div>
            <SkeletonBlock className="h-54 w-full rounded-[2rem]" />
          </div>

          {/* Projects + Reports */}
          <div className="md:grid md:grid-cols-2 gap-6 lg:gap-8 space-y-6 lg:space-y-8 dt:space-y-0">
            {[1, 2].map((i) => (
              <div key={i}>
                <div className="p-6 bg-white rounded-[2rem] border border-zinc-100 space-y-4">
                  <SkeletonBlock className="h-4 w-32" />
                  <SkeletonBlock className="h-6 w-20" />
                  <SkeletonBlock className="h-6 w-20" />
                  <SkeletonBlock className="h-20 w-full" />
                </div>
              </div>
            ))}
          </div>

          {/* Requests */}
          <div>
            <div className="p-6 bg-white rounded-[2rem] border border-zinc-100 space-y-4">
              <SkeletonBlock className="h-4 w-32" />
              <SkeletonBlock className="h-4 w-32" />
              <SkeletonBlock className="h-10 w-full" />
              <SkeletonBlock className="h-10 w-full" />
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="md:grid md:grid-cols-2 gap-6 lg:gap-8 space-y-6 lg:space-y-8 dt:grid-cols-1 dt:flex dt:flex-col dt:space-y-0">
          {[1, 2].map((i) => (
            <div key={i}>
              <div className="p-6 bg-white rounded-[2rem] border border-zinc-100 space-y-4">
                <SkeletonBlock className="h-4 w-32" />
                <SkeletonBlock className="h-8 w-full" />
                <SkeletonBlock className="h-8 w-full" />
                <SkeletonBlock className="h-8 w-3/4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardSkeleton;
