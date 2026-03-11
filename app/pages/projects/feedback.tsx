"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft2,
  MessageAdd,
  QuoteUp,
  User,
  Calendar,
  SearchNormal1,
} from "iconsax-reactjs";
import { useNavigate } from "react-router";

import { Input } from "~/components/ui/input";
import { AddFeedbackModal } from "./components/FeedbackModal";
import { Button } from "~/components/ui/button";
import PageHeader from "~/components/ui/PageHeader";
import BackButton from "~/components/ui/BackButton";
import { containerVariants, itemVariants } from "~/motionVariants";
import FeedbackCard from "./components/FeedbackCard";

const MOCK_FEEDBACK = [
  {
    id: 1,
    sender: "Prof. Dahunsi",
    created_at: "2026-03-01T10:00:00Z",
    message:
      "I'm impressed with the progress on this project. The team has been hard at work, and the results are impressive.",
  },
  {
    id: 2,
    sender: "JSON Silver",
    created_at: "2026-02-28T14:30:00Z",
    message:
      "We need more UI developers on this project. The current dashboard is not intuitive for the lab technicians.",
  },
];

export default function ProjectFeedbackPage() {
  return (
    <div className="p-6 lg:p-10 mx-auto space-y-10 max-w-400">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-zinc-100 pb-8">
        <div className="flex items-center gap-6">
          <BackButton />

          <PageHeader
            title="Feedback"
            description="Review and document insights, critiques, and instructions related to this project."
          />
        </div>
        <motion.span
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="self-end"
        >
          <AddFeedbackModal />
        </motion.span>
      </div>

      <motion.div
        className="space-y-8 relative before:absolute before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-zinc-200"
        initial="hidden"
        animate="show"
        variants={containerVariants}
      >
        {MOCK_FEEDBACK.map((item) => (
          <FeedbackCard item={item} key={item.id} />
        ))}

        {MOCK_FEEDBACK.length === 0 && (
          <div className="py-20 text-center border-2 border-dashed border-zinc-200 rounded-[2rem]">
            <p className="text-[10px] font-black uppercase text-zinc-500 tracking-widest">
              No feedback entries recorded
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
