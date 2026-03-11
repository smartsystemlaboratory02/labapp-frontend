import { motion } from "framer-motion";
import { cn } from "~/lib/utils";
import { itemVariants } from "~/motionVariants";

const PersonnelCard = ({ person }: any) => (
  <motion.div
    variants={itemVariants}
    className="flex items-center gap-4 p-4 bg-white border border-zinc-100 rounded-[1.5rem] hover:border-primary/20 transition-all shadow-sm"
  >
    <div
      className={cn(
        "size-10 rounded-xl flex items-center justify-center font-black text-xs shrink-0",
        person.color,
      )}
    >
      {person.initial}
    </div>
    <div className="flex-1 min-w-0">
      <p className="font-bold text-sm text-zinc-900 truncate">{person.name}</p>
      <p className="text-[10px] uppercase font-black text-zinc-400 tracking-wider">
        {person.niche} • {person.role}
      </p>
    </div>
  </motion.div>
);

export default PersonnelCard;
