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
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
} from "~/components/ui/drawer";
import type { Icon } from "iconsax-reactjs";
import { BusIcon, X } from "lucide-react";

interface ActionModalProps {
  trigger: React.ReactNode;
  title: string;
  description?: string;
  children: (
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
  ) => React.ReactNode;
  Icon: Icon;
}

const ActionModal: React.FC<ActionModalProps> = ({
  trigger,
  title,
  children,
  description,
  Icon,
}) => {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const HeaderContent = () => (
    <div className="flex flex-col gap-2">
      <div className="size-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
        <Icon size="24" variant="Bold" />
      </div>
      <DialogTitle className="text-2xl font-black uppercase tracking-tighter">
        {title}
      </DialogTitle>
      {description && (
        <DialogDescription className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">
          {description}
        </DialogDescription>
      )}
    </div>
  );

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogContent
          className="sm:max-w-137.5 border-none  overflow-visible rounded-[2rem] p-8 shadow-2xl"
          showCloseButton={false}
        >
          <button
            onClick={() => setOpen(false)}
            className="absolute top-6 right-6 p-2 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-400 transition-colors"
          >
            <X size="20" />
          </button>

          <div className="">
            <DialogHeader className="mb-8">
              <HeaderContent />
            </DialogHeader>
            <div className="relative">{children(setOpen)}</div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent className="sm:max-w-137.5 border-none bg-transparent overflow-visible rounded-[2rem] p-8 shadow-2xl">
        <div className="mx-auto w-12 h-1.5 shrink-0 rounded-full bg-zinc-200 dark:bg-zinc-800 my-4" />
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
