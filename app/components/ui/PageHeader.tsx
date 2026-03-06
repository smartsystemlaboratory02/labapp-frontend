import { motion } from "framer-motion";
import React from "react";

const PageHeader = ({
  title,
  description,
}: {
  title: string;
  description?: string;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex flex-col md:flex-row md:items-center justify-between gap-4 overflow-hidden"
    >
      <div>
        <h1 className="text-4xl font-black tracking-tighter text-zinc-900 uppercase truncate text-ellipsis word-break max-w-[60vw]">
          {title}
        </h1>
        <p className="flex items-center gap-6 text-xs font-bold text-zinc-500 uppercase tracking-[0.15em] mt-1">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

export default PageHeader;
