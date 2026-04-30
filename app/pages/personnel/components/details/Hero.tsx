import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Badge } from "~/components/ui/badge";
import type { PersonnelInfo } from "~/services/personnels/types";
import { getInitials } from "~/utils/utils";

const Hero = ({ personnel }: { personnel: PersonnelInfo }) => {
  return (
    <div className="bg-white border border-zinc-200 rounded-[2.5rem] p-8 flex flex-col items-center text-center shadow-sm space-y-6" >
      <Avatar className="size-32">
        <AvatarImage src={personnel.profile_img || undefined} />
        <AvatarFallback>
          <div
            className="size-32 rounded-[2rem] flex items-center justify-center shadow-inner"
            style={{
              backgroundColor: personnel.color || "#f4f4f5",
            }}
          >
            <span className="text-4xl font-black text-zinc-800">
              {getInitials(personnel.first_name, personnel.last_name)}
            </span>
          </div>
        </AvatarFallback>
      </Avatar>

      <h2 className="text-xl font-black text-zinc-900 leading-tight">
        {personnel.first_name} <br /> {personnel.last_name}
      </h2>

      <Badge className="bg-zinc-900 text-white hover:bg-zinc-800 rounded-full px-4 py-1 text-[10px] font-black uppercase tracking-widest">
        {personnel.role}
      </Badge>

      <div className="w-full grid grid-cols-2 gap-3">
        <div className="bg-zinc-50 p-4 rounded-3xl border border-zinc-100">
          <p className="text-[10px] font-black text-zinc-400 uppercase">
            Stack
          </p>
          <p className="text-xs font-bold text-zinc-800 capitalize">
            {personnel.stack}
          </p>
        </div>
        <div className="bg-zinc-50 p-4 rounded-3xl border border-zinc-100">
          <p className="text-[10px] font-black text-zinc-400 uppercase">
            Niche
          </p>
          <p className="text-xs font-bold text-zinc-800 capitalize">
            {personnel.niche}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
