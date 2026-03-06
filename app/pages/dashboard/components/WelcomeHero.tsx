import { motion } from "framer-motion";
import { Calendar1 } from "iconsax-reactjs";
import { Badge } from "~/components/ui/badge";
import { itemVariants } from "~/motionVariants";

const WelcomeHero = ({ name }: { name: string }) => {
  const date = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <motion.div
      variants={itemVariants}
      className="relative overflow-hidden p-6 md:p-10 md:py-4 rounded-[2.5rem] bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl shadow-zinc-200/50 dark:shadow-none flex items-center justify-between"
    >
      <div className="relative z-10 space-y-2">
        <Badge className="mb-4 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 border-none px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider">
          Overview • 2026
        </Badge>
        <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-3 text-zinc-900 dark:text-white">
          Hi, {name || "Intern"}
        </h1>
        <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400 font-medium bg-zinc-50 dark:bg-zinc-800/50 w-fit px-3 py-1 rounded-lg border border-zinc-100 dark:border-zinc-800">
          <Calendar1 size="18" variant="TwoTone" />
          <span className="text-sm">{date}</span>
        </div>
        {/* <p className="font-semibold text-zinc-500 text-sm ml-2">Let's get productive today!!!</p> */}
      </div>
      <img src="/workgif2.webp" alt="" className="rounded-[2.5rem] hidden mlg:inline" />
    </motion.div>
  );
};

export default WelcomeHero;
