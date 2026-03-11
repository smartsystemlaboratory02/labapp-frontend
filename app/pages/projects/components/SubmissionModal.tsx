"use client";

import React, { useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "~/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
  Add,
  DocumentCloud,
  Link1,
  CloudPlus,
  DocumentText,
} from "iconsax-reactjs";
import { cn } from "~/lib/utils";

export function SubmissionModal() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="p-1.5 text-secondary bg-secondary/10 rounded-lg hover:scale-110 transition-transform active:scale-95">
          <Add size="20" variant="Bold" />
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-120 border-none rounded-[2rem] p-8 shadow-2xl overflow-hidden selection:bg-primary/10">
        <DialogHeader className="space-y-4">
          <div className="size-12 rounded-2xl bg-zinc-50 flex items-center justify-center text-zinc-900 border border-zinc-100">
            <CloudPlus size="24" variant="Bold" />
          </div>
          <div>
            <DialogTitle className="text-2xl font-black uppercase tracking-tighter">
              Add Resource
            </DialogTitle>
            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mt-1">
              Project Archive & Submission
            </p>
          </div>
        </DialogHeader>

        <Tabs defaultValue="file" className="mt-8">
          <TabsList className="grid w-full grid-cols-2 bg-zinc-200 rounded-xl p-1 h-11">
            <TabsTrigger
              value="file"
              className="rounded-lg font-black text-[10px] uppercase tracking-widest data-[state=active]:bg-white data-[state=active]:text-primary"
            >
              Document
            </TabsTrigger>
            <TabsTrigger
              value="link"
              className="rounded-lg font-black text-[10px] uppercase tracking-widest data-[state=active]:bg-white data-[state=active]:text-primary"
            >
              External Link
            </TabsTrigger>
          </TabsList>

          <TabsContent
            value="file"
            className="space-y-6 pt-6 animate-in fade-in zoom-in-95 duration-200"
          >
            <div
              onClick={() => fileInputRef.current?.click()}
              className="group cursor-pointer border-2 border-dashed border-zinc-100 rounded-[2rem] p-10 flex flex-col items-center justify-center gap-4 hover:border-primary/30 hover:bg-primary/5 transition-all"
            >
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
              />
              <div className="size-14 rounded-full bg-zinc-50 flex items-center justify-center text-zinc-300 group-hover:text-primary group-hover:bg-white transition-all shadow-sm">
                <DocumentCloud size="28" variant="Bold" />
              </div>
              <div className="text-center">
                <p className="text-sm font-bold text-zinc-600">
                  {selectedFile ? selectedFile.name : "Select technical file"}
                </p>
                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-tighter">
                  PDF, DOCX, or ZIP (Max 10MB)
                </p>
              </div>
            </div>
            <Button className="w-full bg-primary h-12 rounded-xl font-black text-[10px] uppercase tracking-widest">
              Upload Document
            </Button>
          </TabsContent>

          <TabsContent
            value="link"
            className="space-y-6 pt-6 animate-in fade-in zoom-in-95 duration-200"
          >
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-zinc-400 tracking-widest ml-1">
                  Reference Title
                </label>
                <Input
                  placeholder="e.g., GitHub Repository"
                  className="h-12 bg-zinc-50 border-none rounded-xl px-5 font-bold text-sm focus-visible:ring-2 focus-visible:ring-primary/20"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-zinc-400 tracking-widest ml-1">
                  Universal Resource Locator (URL)
                </label>
                <div className="relative">
                  <Link1
                    size="18"
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-300"
                  />
                  <Input
                    placeholder="https://..."
                    className="h-12 bg-zinc-50 border-none rounded-xl pl-12 pr-5 font-medium text-sm focus-visible:ring-2 focus-visible:ring-primary/20"
                  />
                </div>
              </div>
            </div>
            <Button className="w-full bg-primary h-12 rounded-xl font-black text-[10px] uppercase tracking-widest">
              Connect Resource
            </Button>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
