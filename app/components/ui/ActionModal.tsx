"use client";
import { useState } from "react";
import { useMediaQuery } from "~/hooks/use-media-query";
import { motion } from "framer-motion";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  // DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  // DrawerTitle,
  DrawerTrigger,
} from "~/components/ui/drawer";

interface ActionModalProps {
  trigger: React.ReactNode;
  title: string;
  description: string;
  children: (
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
  ) => React.ReactNode;
}

const ActionModal: React.FC<ActionModalProps> = ({
  trigger,
  title,
  children,
  description,
}) => {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  // Shared Header Logic to ensure consistency
  const HeaderContent = () => (
    <div className="flex flex-col gap-2">
      <DialogTitle className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
        {title}
      </DialogTitle>
      <DialogDescription className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">
        {description}
      </DialogDescription>
    </div>
  );

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogContent
          className="sm:max-w-[550px] p-0 border-none bg-transparent shadow-none overflow-visible"
          showCloseButton={false}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.2)] rounded-[2.5rem] overflow-hidden"
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400 transition-colors"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            <div className="p-10">
              <DialogHeader className="mb-8">
                <HeaderContent />
              </DialogHeader>
              <div className="relative">{children(setOpen)}</div>
            </div>
          </motion.div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent className="bg-white dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800 rounded-t-[2.5rem]">
        <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-zinc-200 dark:bg-zinc-800 my-4" />
        <DrawerHeader className="text-left px-6">
          <HeaderContent />
        </DrawerHeader>

        <div className="px-6 py-4">{children(setOpen)}</div>

        <DrawerFooter className="px-6 pb-8 pt-2">
          <DrawerClose asChild>
            <Button
              variant="ghost"
              className="rounded-xl h-12 text-zinc-500 font-medium"
            >
              Dismiss
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default ActionModal;