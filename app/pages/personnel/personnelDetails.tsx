import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { motion } from "framer-motion";
import {
  ArrowLeft2,
  Edit,
  Trash,
  Lock,
  Sms,
  Call,
  Calendar,
  Briefcase,
  Personalcard,
  Global,
  Copy,
  TickCircle,
} from "iconsax-reactjs";
import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import BackButton from "~/components/ui/BackButton";
import PageHeader from "~/components/ui/PageHeader";
import { containerVariants, itemVariants } from "~/motionVariants";
import { toast } from "sonner";
import { useGetUserDataQuery } from "~/services/onboarding/queries";
import { getInitials } from "~/utils/utils";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import type { PersonnelInfo } from "~/services/personnels/types";
import { set } from "date-fns";
import ContactDetails from "./components/details/ContactDetails";
import Hero from "./components/details/Hero";

// Mocking the data structure based on your directory code
// interface PersonnelInfo {
//   id: string;
//   first_name: string;
//   last_name: string;
//   role: "admin" | "lead" | "intern";
//   stack: "software" | "hardware";
//   niche: string;
//   email: string;
//   phone: string;
//   gender: string;
//   dob: string;
//   date_joined: string;
//   bio?: string;
//   colour?: string;
//   avatar_url?: string;
// }

export default function PersonnelProfileDetails() {
  const navigate = useNavigate();

  const params = useParams<{ id: string }>();
  const user_id = params.id || "";

  const state = useLocation().state;
  const statePersonnel: PersonnelInfo = state?.personnel;

  const { data: user } = useGetUserDataQuery();
  const userIsAdmin = user?.role === "admin";

  useEffect(() => {
    if (!statePersonnel) {
      toast.error("Failed to load personnel details. Please try again.");

      setTimeout(() => {
        navigate("/personnel");
      }, 2000);
    }
  }, []);

  // Replace this with your actual query: const { data: person } = useGetPersonnelByIdQuery(id);
  const person: PersonnelInfo = {
    id: "1",
    first_name: "Ogunjirin",
    last_name: "Boluwatife Mercy",
    role: "intern",
    stack: "software",
    niche: "UX Designer",
    email: "yesgirl@gmail.com",
    phone_number: "09076323421",
    profile_img:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
    // gender: "Female",
    // dob: "28th May",
    // date_joined: "20/01/24",
    bio: "Passionate about creating seamless user experiences and modern interfaces. Currently exploring the intersection of AI and design systems within the Smart Systems Research Lab.",
    colour: "#E0F2FE",
  };

  return (
    <div className="p-6 lg:p-10 mx-auto max-w-400 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-6">
          <BackButton />
          <PageHeader title="personnel profile" description="" />
        </div>

        {userIsAdmin && !(user.id === statePersonnel.id) && (
          <div className="flex items-center gap-2 mr-12">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-2xl hover:bg-zinc-100 items-center justify-center flex ml-0 mt-0 border"
            >
              <Edit size="32" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-2xl hover:bg-destructive/10 items-center justify-center flex ml-0 mt-0 border border-destructive text-destructive hover:text-destructive "
            >
              <Trash size="32" />
            </Button>
          </div>
        )}
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 lg:grid-cols-12 gap-6"
      >
        <motion.div variants={itemVariants} className="lg:col-span-4 space-y-6">
          <Hero personnel={statePersonnel} />
          <ContactDetails personnel={statePersonnel} />
        </motion.div>

        <motion.div variants={itemVariants} className="lg:col-span-8 space-y-6">
          {/* Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* <InfoCard
              icon={<Personalcard size="20" variant="Bold" />}
              label="Gender"
              value={person.gender}
            /> */}
            {/* <InfoCard
              icon={<Calendar size="20" variant="Bold" />}
              label="Birthday"
              value={person.dob}
            /> */}
            {/* <InfoCard
              icon={<Briefcase size="20" variant="Bold" />}
              label="Date Joined"
              value={person.date_joined}
            /> */}
            <InfoCard
              icon={<Global size="20" variant="Bold" />}
              label="Account Status"
              value="Active"
              valueClassName="text-green-600"
            />
          </div>

          <div className="bg-white border border-zinc-200 rounded-[2.5rem] p-8 shadow-sm">
            <div className="flex items-center gap-3 border-l-4 border-secondary pl-4 mb-6">
              <h3 className="text-xs font-black uppercase tracking-widest text-zinc-500">
                Professional Bio
              </h3>
            </div>
            <p
              className={cn(
                "text-sm leading-relaxed text-zinc-600 font-medium",
                !statePersonnel.bio && "italic text-zinc-400",
              )}
            >
              {statePersonnel.bio ||
                "No biography provided for this personnel."}
            </p>
          </div>

          {/* Security / Admin Actions Area */}
          <div className="bg-zinc-900 rounded-[2.5rem] p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="size-12 rounded-2xl bg-white/10 flex items-center justify-center">
                <Lock size="24" variant="Bold" />
              </div>
              <div>
                <p className="font-bold">Account Security</p>
                <p className="text-xs text-zinc-400">
                  Manage login access and permissions
                </p>
              </div>
            </div>
            <Button className="bg-white text-zinc-900 hover:bg-zinc-200 rounded-xl font-black text-xs uppercase px-8">
              Suspend Account
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

const InfoCard = ({
  icon,
  label,
  value,
  valueClassName,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  valueClassName?: string;
}) => (
  <div className="bg-white border border-zinc-200 rounded-[2rem] p-6 flex items-center gap-4 shadow-sm">
    <div className="size-12 rounded-2xl bg-zinc-100 flex items-center justify-center text-zinc-500">
      {icon}
    </div>
    <div>
      <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest leading-none mb-1">
        {label}
      </p>
      <p className={cn("text-sm font-bold text-zinc-900", valueClassName)}>
        {value}
      </p>
    </div>
  </div>
);
