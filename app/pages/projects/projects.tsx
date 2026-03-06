import { motion } from "framer-motion";
import { Add, ArrowRight } from "iconsax-reactjs";
import { Link } from "react-router";
import { Button } from "~/components/ui/button";
import { MOCK_PROJECTS, MOCK_STATS } from "~/dashboardDemo";
import { containerVariants, itemVariants } from "~/motionVariants";
import StatCard from "./components/StatCard";
import ProjectCard from "./components/ProjectCard";

const Projects = () => {
  return (
    <div className="p-6 lg:p-10 max-w-400 mx-auto space-y-8">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-4xl font-black tracking-tighter text-zinc-900 uppercase">
            PROJECTS
          </h1>
          <p className="text-zinc-500 font-medium mt-1">
            Manage and track your active laboratory initiatives.
          </p>
        </div>
      </motion.div>

      <motion.div
        variants={containerVariants}
        className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-2 mlg:grid-cols-3 gap-6 auto-rows-fr"
      >
        {MOCK_STATS.map((stat, idx) => (
          <StatCard key={idx} stat={stat} />
        ))}
      </motion.div>

      <div className="space-y-6">
        <h2 className="text-sm font-black uppercase tracking-[0.2em] text-zinc-400">
          Active Projects
        </h2>

        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 auto-rows-fr"
        >
          {MOCK_PROJECTS.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}

          <motion.div variants={itemVariants}>
            <Link
              to="/projects/add"
              className="flex flex-col items-center justify-center h-full min-h-70 border-2 border-dashed border-zinc-200 rounded-[2rem] hover:border-primary/30 hover:bg-zinc-50/50 transition-all group"
            >
              <div className="size-12 rounded-full bg-zinc-50 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                <Add
                  size="24"
                  className="text-zinc-300 group-hover:text-primary transition-colors"
                />
              </div>
              <p className="mt-4 text-xs font-bold uppercase tracking-widest text-zinc-400 group-hover:text-primary transition-colors">
                Start New Project
              </p>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Projects;
