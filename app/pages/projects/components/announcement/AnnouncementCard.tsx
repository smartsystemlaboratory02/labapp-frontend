import { formatDistance, subDays } from "date-fns";
import { motion } from "framer-motion";
import { Clock, Edit, Trash } from "iconsax-reactjs";
import { cn } from "~/lib/utils";
import { itemVariants } from "~/motionVariants";
import type { ProjectAnnouncement } from "~/services/projects/types";

const AnnouncementCard = ({
  announcement,
}: {
  announcement: ProjectAnnouncement;
}) => {
  const target = "all";
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
              target === "all" ? "bg-primary" : "bg-secondary",
            )}
          />
          <span className="text-[9px] font-black uppercase text-zinc-400 tracking-wider">
            Target: {target}
          </span>
        </div>
        <span className="text-[9px] font-bold text-zinc-400 flex items-center gap-1 uppercase">
          <Clock size="10" />{" "}
          {formatDistance(
            subDays(new Date(announcement.created_at), 3),
            new Date(),
            {
              addSuffix: true,
            },
          )}
        </span>
      </div>
      <h2 className="text-lg font-black text-zinc-700 mb-2">
        {announcement.title}
      </h2>
      <p className="text-xs font-bold text-zinc-600 leading-relaxed mb-4">
        {announcement.content}
      </p>

      <div className="flex items-center justify-between pt-4 border-t border-zinc-50">
        <p className="text-[9px] font-black uppercase text-zinc-400">
          Sent by {announcement.created_by.first_name}{" "}
          {announcement.created_by.last_name}
        </p>
        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all shrink-0">
          <button
            type="button"
            // onClick={() => setIsEditing(true)}
            className="p-2 rounded-xl border border-zinc-200 hover:bg-zinc-50 transition"
          >
            <Edit size={16} />
          </button>

          <button
            type="button"
            className="p-2 rounded-xl border border-destructive text-destructive hover:bg-red-50 transition"
          >
            <Trash size={16} />
          </button>

          {/* <DeleteObjectiveModal
            projectId={projectId}
            objectiveId={objective.id}
          /> */}
        </div>
      </div>
    </motion.div>
  );
};

export default AnnouncementCard;
