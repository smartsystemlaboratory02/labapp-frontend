import { formatDistance, subDays } from "date-fns";

const NotificationItem = ({ notification }: { notification: any }) => (
  <div className="flex gap-4 group cursor-default">
    <div className="relative flex flex-col items-center">
      <div className="size-2.5 rounded-full bg-primary ring-4 ring-primary/10 shrink-0 z-10" />
      <div className="w-px h-full bg-zinc-100 dark:bg-zinc-800 absolute top-2.5" />
    </div>
    <div className="pb-4">
      <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 leading-snug group-hover:text-primary transition-colors duration-200">
        {notification.title}
      </p>
      <p className="text-[10px] text-zinc-400 mt-1.5 uppercase font-black tracking-widest">
        {formatDistance(
            subDays(new Date(notification.time), 3),
            new Date(),
            {
              addSuffix: true,
            },
          )}
      </p>
    </div>
  </div>
);

export default NotificationItem;
