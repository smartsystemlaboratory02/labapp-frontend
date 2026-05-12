import React from "react";
import Spinner from "~/components/ui/Spinner";

const AuthenticatedLoading = () => {
  const [dotCount, setDotCount] = React.useState(0);

  React.useEffect(() => {
    const interval = window.setInterval(() => {
      setDotCount((current) => (current + 1) % 4);
    }, 300);

    return () => window.clearInterval(interval);
  }, []);

  const dots = ".".repeat(dotCount);

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-900 px-4">
      <section className="max-w-md w-full rounded-3xl border border-slate-200 bg-white p-10 shadow-[0_25px_60px_rgba(15,23,42,0.08)]">
        <div className="flex flex-col items-center gap-6 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-slate-100 shadow-inner shadow-slate-200/70">
            <Spinner className="w-10 h-10 border-4" />
          </div>
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
              Loading your workspace {" "} {dots}
            </h1>
            <p className="mt-3 text-sm leading-6 text-slate-500">
              We're preparing your workspace. This will only take a moment.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AuthenticatedLoading;
