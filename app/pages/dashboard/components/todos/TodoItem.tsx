import React from "react";
import { TickCircle } from "iconsax-reactjs";
import { cn } from "~/lib/utils";

const TodoItem = ({ todo }: { todo: any }) => (
  <div className="flex items-center gap-3 p-3 rounded-2xl hover:bg-zinc-100/50 dark:hover:bg-zinc-900/50 transition-all duration-200 group border border-transparent hover:border-zinc-100 dark:hover:border-zinc-800">
    <div
      className={cn(
        "size-6 rounded-lg border-2 flex items-center justify-center transition-all duration-300 transform group-active:scale-90",
        todo.completed
          ? "bg-emerald-500 border-emerald-500 text-white shadow-lg shadow-emerald-500/20"
          : "border-zinc-300 dark:border-zinc-700 group-hover:border-primary group-hover:shadow-lg group-hover:shadow-primary/10",
      )}
    >
      {todo.completed && <TickCircle size="14" variant="Bold" />}
    </div>
    <span
      className={cn(
        "text-sm font-bold transition-all duration-300",
        todo.completed
          ? "text-zinc-400 line-through"
          : "text-zinc-700 dark:text-zinc-300 group-hover:text-zinc-900 dark:group-hover:text-white",
      )}
    >
      {todo.task}
    </span>
  </div>
);

export default TodoItem;
