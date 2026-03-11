"use client";

import React from "react";
import {
  ArrowLeft2,
  NotificationStatus,
  Send2,
  UserTick,
  Profile2User,
  Clock,
  Trash,
  InfoCircle,
} from "iconsax-reactjs";

import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";
import { Badge } from "~/components/ui/badge";
import BackButton from "~/components/ui/BackButton";
import PageHeader from "~/components/ui/PageHeader";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "~/motionVariants";
import BroadcastCard from "./components/BroadcastCard";

const MOCK_BROADCASTS = [
  {
    id: "AN-001",
    target: "all",
    message:
      "Weekly lab synchronization moved to 0900hrs tomorrow. Please ensure all hardware logs are uploaded before the session.",
    timestamp: "2 hours ago",
    author: "Dr. Arinze",
  },
  {
    id: "AN-002",
    target: "leads",
    message:
      "Quarterly safety audit documentation is now overdue. Please review project protocols by EOD.",
    timestamp: "1 day ago",
    author: "Admin Office",
  },
];

export default function ProjectBroadcasts() {
  const projectName = "Neural Mapping Protocol";

  return (
    <div className="p-6 lg:p-10 max-w-400 mx-auto space-y-8 selection:bg-primary/10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-zinc-100 pb-8">
        <div className="flex items-center gap-6">
          <BackButton />

          <PageHeader
            title="Broadcasts"
            description="Send a broadcast to memebers on this project."
          />
        </div>
      </div>

      <motion.div
        className="grid grid-cols-12 gap-12"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <motion.div
          className="col-span-12 lg:col-span-7 space-y-8"
          variants={itemVariants}
        >
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary rounded-lg text-white">
                <NotificationStatus size="18" variant="Bold" />
              </div>
              <h2 className="text-[11px] font-black uppercase tracking-[0.25em] text-zinc-400">
                New Broadcast
              </h2>
            </div>

            <div className="space-y-4">
              <Textarea
                placeholder="Send project announcments here ..."
                className="min-h-55 bg-zinc-50 border rounded-[2rem] p-8 text-base font-medium focus-visible:ring-2 focus-visible:border-0 focus-visible:ring-primary/20 resize-none shadow-inner"
              />

              <div className="flex flex-col sm:flex-row gap-3">
                <Button className="flex-1 bg-zinc-900 hover:bg-zinc-800 text-white h-12  font-black text-[10px] uppercase tracking-widest transition-all active:scale-95 flex gap-2">
                  <Profile2User size="18" variant="Bold" /> Broadcast to All
                </Button>
                <Button className="flex-1 bg-primary hover:bg-[#1a441a] text-white h-12  font-black text-[10px] uppercase tracking-widest transition-all active:scale-95 shadow-lg shadow-primary/10 flex gap-2">
                  <UserTick size="18" variant="Bold" /> Leads Only
                </Button>
              </div>
            </div>
          </section>

          <div className="p-4 bg-zinc-50 border border-zinc-200 rounded-[2rem] flex items-start gap-4 italic">
            <InfoCircle size={20} className="text-secondary shrink-0" />
            <p className="text-xs text-zinc-500 leading-relaxed font-medium">
              Boradcasts are pushed immediately to all assigned personnel via
              the lab internal notifications.
            </p>
          </div>
        </motion.div>

        <div className="col-span-12 lg:col-span-5 space-y-6">
          <h2 className="text-[11px] font-black uppercase tracking-[0.25em] text-zinc-400">
            Braodcast Log
          </h2>

          <div className="space-y-4">
            {MOCK_BROADCASTS.map((broadcast) => (
              <BroadcastCard broadcast={broadcast} key={broadcast.id} />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
