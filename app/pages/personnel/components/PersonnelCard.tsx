import { motion } from "framer-motion";
import { Link } from "react-router";
import { cn } from "~/lib/utils";
import { itemVariants } from "~/motionVariants";
import type { PersonnelInfo } from "~/services/personnels/types";
import { getInitials } from "~/utils/utils";

const PersonnelCard = ({ person }: { person: PersonnelInfo }) => (
  <Link to={`/personnel/${person.id}`} state={{ personnel: person }}>
    <motion.div
      variants={itemVariants}
      className="flex items-center gap-4 p-4 bg-white border border-zinc-100 rounded-[1.5rem] hover:border-primary/20 transition-all shadow-sm"
    >
      <div
        style={{ backgroundColor: person.colour || "#f4f4f5" }}
        className={cn(
          "size-10 rounded-xl flex items-center justify-center font-black text-xs shrink-0",
        )}
      >
        {getInitials(person.first_name, person.last_name)}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-bold text-sm text-zinc-900 truncate">
          {person.first_name} {person.last_name}
        </p>
        <p className="text-[10px] uppercase font-black text-zinc-400 tracking-wider">
          {person.niche} {"  "} • {"  "} {person.role}
        </p>
      </div>
    </motion.div>
  </Link>
);

export default PersonnelCard;
