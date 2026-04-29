import React from "react";
import DashboardCard from "../DashboardCard";
import { TaskSquare } from "iconsax-reactjs";
import ComingSoonMask from "~/components/ui/ComingSoonMask";
import { DEMO_DATA } from "~/dashboardDemo";
import TodoItem from "./TodoItem";

const Todos = () => {
  return (
    <DashboardCard title="My Tasks" icon={TaskSquare} href="#">
      <div className="relative overflow-hidden">
        <ComingSoonMask />
        <div className="space-y-2">
          {DEMO_DATA.todos.map((t) => (
            <TodoItem key={t._id} todo={t} />
          ))}
        </div>
      </div>
    </DashboardCard>
  );
};

export default Todos;
