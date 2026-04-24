import { motion } from "framer-motion";
import type { Icon } from "iconsax-reactjs";
import { Card, CardContent } from "~/components/ui/card";
import { cn } from "~/lib/utils";
import { itemVariants } from "~/motionVariants";

const StatCard = ({
  label,
  count,
  Icon,
  color,
  bg,
}: {
  label: string;
  count: number;
  Icon: Icon;
  color: string;
  bg: string;
}) => (
  <motion.div variants={itemVariants}>
    <Card className="border-none shadow-sm bg-white rounded-3xl overflow-hidden hover:shadow-md transition-shadow py-2 h-full">
      <CardContent className="p-4 flex items-center gap-4 h-full">
        <div className={cn("p-2 rounded-2xl", bg)}>
          <Icon size="24" className={color} variant="Bold" />
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-zinc-400">
            {label}
          </p>
          <p className="text-2xl font-black text-zinc-900">{count}</p>
        </div>
      </CardContent>
    </Card>
  </motion.div>
);

export default StatCard;
