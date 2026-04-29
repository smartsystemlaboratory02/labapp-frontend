import { motion } from "framer-motion";
import { Clock, Trash } from "iconsax-reactjs";
import { cn } from "~/lib/utils";
import { itemVariants } from "~/motionVariants";

const BroadcastCard = ({ broadcast }: { broadcast: any }) => {
  return (
    <motion.div
      className="p-6 bg-white border border-zinc-100 rounded-[2rem] hover:border-primary/20 transition-all group shadow-sm"
      variants={itemVariants}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div
            className={cn(
              "size-2 rounded-full",
              broadcast.target === "all" ? "bg-primary" : "bg-secondary",
            )}
          />
          <span className="text-[9px] font-black uppercase text-zinc-400 tracking-wider">
            Target: {broadcast.target}
          </span>
        </div>
        <span className="text-[9px] font-bold text-zinc-400 flex items-center gap-1 uppercase">
          <Clock size="10" /> {broadcast.timestamp}
        </span>
      </div>

      <p className="text-xs font-bold text-zinc-600 leading-relaxed mb-4">
        {broadcast.message}
      </p>

      <div className="flex items-center justify-between pt-4 border-t border-zinc-50">
        <p className="text-[9px] font-black uppercase text-primary">
          Sent by {broadcast.author}
        </p>
        <button className="text-zinc-400 hover:text-red-500 transition-colors">
          <Trash size="20" />
        </button>
      </div>
    </motion.div>
  );
};

export default BroadcastCard;
