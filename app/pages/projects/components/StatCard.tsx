import { motion } from "framer-motion";
import { Card, CardContent } from "~/components/ui/card";
import type { MOCK_STATS } from "~/dashboardDemo";
import { cn } from "~/lib/utils";
import { itemVariants } from "~/motionVariants";

const StatCard = ({ stat }: { stat: (typeof MOCK_STATS)[0] }) => (
  <motion.div variants={itemVariants}>
    <Card className="border-none shadow-sm bg-white rounded-3xl overflow-hidden hover:shadow-md transition-shadow py-2 h-full">
      <CardContent className="p-4 flex items-center gap-4 h-full">
        <div className={cn("p-2 rounded-2xl", stat.bg)}>
          <stat.icon size="24" className={stat.color} variant="Bold" />
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-zinc-400">
            {stat.label}
          </p>
          <p className="text-2xl font-black text-zinc-900">{stat.count}</p>
        </div>
      </CardContent>
    </Card>
  </motion.div>
);

export default StatCard;
