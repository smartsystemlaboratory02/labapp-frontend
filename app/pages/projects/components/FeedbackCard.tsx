import { motion } from "framer-motion";
import { Calendar, QuoteUp, User } from "iconsax-reactjs";
import { itemVariants } from "~/motionVariants";

const FeedbackCard = ({ item }: { item: any }) => {
  return (
    <motion.div
      className="relative pl-12"
      variants={itemVariants}
    >
      <div className="absolute left-0 top-1 size-8 rounded-full bg-white border-2 border-zinc-100 flex items-center justify-center textprimary z-10">
        <QuoteUp size="16" variant="Bold" />
      </div>

      <div className="bg-zinc-50/50 border border-zinc-100 p-6 rounded-[2rem] hover:borderprimary/20 transition-all group">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="size-8 rounded-lg bg-zinc-900 flex items-center justify-center text-white">
              <User size="14" variant="Bold" />
            </div>
            <div>
              <p className="text-sm font-black text-zinc-900 uppercase tracking-tight">
                {item.sender}
              </p>
              <p className="text-[9px] font-bold text-zinc-400 uppercase flex items-center gap-1">
                <Calendar size={10} />{" "}
                {new Date(item.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
        <p className="text-sm font-medium text-zinc-600 leading-relaxed italic">
          "{item.message}"
        </p>
      </div>
    </motion.div>
  );
};

export default FeedbackCard;
