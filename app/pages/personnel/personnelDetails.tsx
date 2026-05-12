import React, { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { motion } from "framer-motion";
import {
  Global,
  UserRemove,
  More,
  Personalcard,
  Calendar,
  Briefcase,
} from "iconsax-reactjs";
import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import BackButton from "~/components/ui/BackButton";
import PageHeader from "~/components/ui/PageHeader";
import { containerVariants, itemVariants } from "~/motionVariants";
import { toast } from "sonner";
import { useGetUserDataQuery } from "~/services/onboarding/queries";
import type { PersonnelInfo } from "~/services/personnels/types";
import ContactDetails from "./components/details/ContactDetails";
import Hero from "./components/details/Hero";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "~/components/ui/hover-card";
import { ChangeUserRoleModal } from "./components/details/ChangeUserRoleModal";
import { useGetPersonnelInfoByIdQuery } from "~/services/personnels/queries";
import PersonnelDetailsSkeleton from "./components/details/PersonnelDetailsSkeleton";
import { DeactivateUserModal } from "./components/details/DeactivateUserModal";
import { ActivateUserModal } from "./components/details/ActivateUserModal";
import { format } from "date-fns";

export default function PersonnelProfileDetails() {
  const navigate = useNavigate();
  const params = useParams<{ id: string }>();
  const userId = params.id || "";
  const state = useLocation().state;
  const statePersonnel: PersonnelInfo = state?.personnel;

  const {
    data: personnel,
    isLoading,
    isError,
    error,
  } = useGetPersonnelInfoByIdQuery(userId, statePersonnel);

  const { data: user } = useGetUserDataQuery();
  const userIsAdmin = user?.role === "admin";

  useEffect(() => {
    if (isError) {
      toast.error(
        error.message || "Failed to load personnel details. Please try again.",
      );

      setTimeout(() => {
        navigate("/personnel");
      }, 2000);
    }
  }, [personnel, isError, error]);

  if (!personnel || isLoading) return <PersonnelDetailsSkeleton />;

  return (
    <div className="p-6 lg:p-10 mx-auto max-w-400 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-6">
          <BackButton />
          <PageHeader title="personnel profile" description="" />
        </div>

        {userIsAdmin && user.id !== personnel.id && (
          <HoverCard openDelay={100} closeDelay={100}>
            <HoverCardTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-zinc-100 flex items-center justify-center border shadow-sm size-10 transition-all active:scale-95"
              >
                <More size="24" className="text-zinc-600" />
              </Button>
            </HoverCardTrigger>

            <HoverCardContent
              side="bottom"
              align="end"
              className="w-56 p-2 rounded-[1.5rem] border-zinc-200 shadow-xl bg-white animate-in fade-in zoom-in-95 duration-200"
            >
              <div className="flex flex-col gap-1">
                <ChangeUserRoleModal
                  userId={personnel.id}
                  role={personnel.role}
                />

                {personnel.is_active ? (
                  <DeactivateUserModal userId={userId} />
                ) : (
                  <ActivateUserModal userId={userId} />
                )}

                {personnel.role !== "admin" && (
                  <button
                    className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-red-50 text-red-500 transition-colors group"
                    disabled
                  >
                    <div className="size-8 rounded-lg bg-red-100 flex items-center justify-center">
                      <UserRemove size="18" variant="Bold" />
                    </div>
                    <p className="text-xs font-bold">
                      Remove{" "}
                      {personnel.role.charAt(0).toUpperCase() +
                        personnel.role.slice(1)}
                    </p>
                  </button>
                )}
              </div>
            </HoverCardContent>
          </HoverCard>
        )}
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 lg:grid-cols-12 gap-6"
      >
        <motion.div variants={itemVariants} className="lg:col-span-4 space-y-6">
          <Hero personnel={personnel} />
          <ContactDetails personnel={personnel} />
        </motion.div>

        <motion.div variants={itemVariants} className="lg:col-span-8 space-y-6">
          {/* Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InfoCard
              icon={
                <Personalcard
                  size="24"
                  variant="Bold"
                  className="text-primary"
                />
              }
              label="Gender"
              value={personnel.gender.toLocaleUpperCase()}
            />
            <InfoCard
              icon={
                <Calendar size="24" variant="Bold" className="text-primary" />
              }
              label="Birthday"
              value={format(new Date(personnel.date_of_birth), "PPP")}
            />
            <InfoCard
              icon={
                <Briefcase size="24" variant="Bold" className="text-primary" />
              }
              label="Date Joined"
              value={format(new Date(personnel.created_at), "PPP")}
            />
            <InfoCard
              icon={
                <Global size="24" variant="Bold" className="text-primary" />
              }
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
                !personnel.bio && "italic text-zinc-400",
              )}
            >
              {personnel.bio || "No biography provided for this personnel."}
            </p>
          </div>

          {/* Security / Admin Actions Area */}
          {/* <div className="bg-zinc-900 rounded-[2.5rem] p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6">
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
          </div> */}
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
    <div className="size-12 rounded-2xl bg-primary/20 flex items-center justify-center text-zinc-500">
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
