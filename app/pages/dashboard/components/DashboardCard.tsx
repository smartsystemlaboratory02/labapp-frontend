import { motion, AnimatePresence } from "framer-motion";
import { itemVariants } from "~/motionVariants";
import { cn } from "~/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Link } from "react-router";
import { ArrowUpRight } from "lucide-react";
import type { ChildrenProps } from "~/types";

type DashboardCardProps = ChildrenProps & {
  title: string;
  icon: React.ElementType;
  href?: string;
  className?: string;
};

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  icon: Icon,
  children,
  href,
  className,
}) => {
  return (
    <motion.div variants={itemVariants} className={cn(className, "relative overflow-hidden")}>
      <Card className="border-zinc-200/50  bg-white/50 shadow-sm hover:shadow-md transition-all duration-300 rounded-[2rem] overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-900">
              <Icon className="size-4 text-zinc-600 dark:text-zinc-400" />
            </div>
            <CardTitle className="text-sm font-bold uppercase tracking-wider text-zinc-500">
              {title}
            </CardTitle>
          </div>
          {href && (
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-900"
            >
              <Link to={href} className="flex items-center">
                <ArrowUpRight className="size-4" />
              </Link>
            </Button>
          )}
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>
    </motion.div>
  );
};

export default DashboardCard;
