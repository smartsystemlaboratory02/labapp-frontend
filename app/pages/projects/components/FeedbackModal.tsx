"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";
import { MessageAdd, Edit, CloseCircle } from "iconsax-reactjs";

export function AddFeedbackModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex items-center self-end">
          <MessageAdd size="18" /> Record Feedback
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-125 border-none rounded-[2.5rem] p-8 shadow-2xl">
        <DialogHeader className="space-y-2">
          <div className="size-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
            <Edit size="24" variant="Bold" />
          </div>
          <DialogTitle className="text-2xl font-black uppercase tracking-tighter">
            New Feedback
          </DialogTitle>
          <p className="text-xs text-zinc-400 font-bold uppercase tracking-wider">
            Your entry will be timestamped and sent to visible to all team
            members.
          </p>
        </DialogHeader>

        <div className="py-6">
          <label className="text-[10px] font-black uppercase text-zinc-400 tracking-[0.2em] block mb-3">
            Observation Details
          </label>
          <Textarea
            placeholder="Document your feedback, critiques, or instructions here..."
            className="min-h-37.5 bg-zinc-50 border-none rounded-2xl p-5 text-sm font-medium focus-visible:ring-2 focus-visible:ring-primary/20 resize-none"
          />
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-3 ">
          <Button variant="outline" className="px-12 ml-0">
            Discard
          </Button>
          <Button className="ml-0">Transmit Feedback</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
