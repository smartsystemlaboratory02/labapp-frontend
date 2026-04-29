"use client";

import { useEffect, useState } from "react";
import {
  NotificationStatus,
  UserTick,
  Profile2User,
  InfoCircle,
} from "iconsax-reactjs";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";
import BackButton from "~/components/ui/BackButton";
import PageHeader from "~/components/ui/PageHeader";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "~/motionVariants";
import AnnouncementCard from "./components/announcement/AnnouncementCard";
import {
  useCreateProjectAnnouncementMutation,
  useGetProjectAnnouncementsQuery,
} from "~/services/projects/queries";
import { useParams } from "react-router";
import { Input } from "~/components/ui/input";
import { toast } from "sonner";
import Spinner from "~/components/ui/Spinner";
import AnnouncementCardSkeleton from "./components/announcement/AnnouncementCardSkeleton";

const announcementSchema = z.object({
  title: z.string().min(1, "Announcement title is required"),
  content: z
    .string()
    .min(10, "Announcement content must be at least 10 characters long"),
  // target: z.enum(["all", "leads"]),
});

export default function ProjectAnnouncements() {
  const params = useParams<{ id: string }>();
  const projectId = params.id || "";

  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<z.infer<typeof announcementSchema>>({
    resolver: zodResolver(announcementSchema),
    defaultValues: { title: "", content: "" },
  });

  const {
    mutate: createAnnouncement,
    isPending: isCreating,
    isError: isCreateError,
    error: createError,
    isSuccess: isCreateSuccess,
  } = useCreateProjectAnnouncementMutation(projectId);

  const { data: announcementsData, isLoading: isAnnouncementsLoading } =
    useGetProjectAnnouncementsQuery(projectId);

  const announcements = announcementsData?.announcements || [];

  useEffect(() => {
    if (isCreateError) {
      toast.error(createError.message || "Failed to create announcement");
    }

    if (isCreateSuccess) {
      toast.success("Announcement created successfully");
      form.reset();
    }
  }, [isCreateError, isCreateSuccess, createError, form]);

  const onSubmit = (data: z.infer<typeof announcementSchema>) => {
    createAnnouncement(data);
  };

  return (
    <div className="p-6 lg:p-10 max-w-400 mx-auto space-y-8 selection:bg-primary/10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-zinc-100 pb-8">
        <div className="flex items-center gap-6">
          <BackButton />

          <PageHeader
            title="Announcements"
            description="Send an announcement to memebers on this project."
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
            <div className="flex items-center gap-3 mb-12">
              <div className="p-2 bg-primary rounded-lg text-white">
                <NotificationStatus size="18" variant="Bold" />
              </div>
              <h2 className="text-[11px] font-black uppercase tracking-[0.25em] text-zinc-400">
                New Announcement
              </h2>
            </div>

            <Form {...form}>
              <form
                className="space-y-8"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-bold uppercase tracking-[0.15em] text-zinc-500">
                        Announcement Title
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter announcement title ..."
                          {...field}
                          className="border-0 border-b border-zinc-200 rounded-none px-0 h-12 text-2xl font-medium focus-visible:ring-0 focus-visible:border-primary/20 focus-visible:border-b-2 transition-colors placeholder:text-zinc-400 shadow-none bg-transparent"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-bold uppercase tracking-[0.15em] text-zinc-500">
                        Announcement Content
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Send project announcments here ..."
                          className="min-h-55 bg-zinc-50 border rounded-[2rem] p-6 text-base font-medium focus-visible:ring-2 focus-visible:border-0 focus-visible:ring-primary/20 resize-none shadow-inner"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    className="flex-1 bg-zinc-900 hover:bg-zinc-800 text-white h-12  font-black text-[10px] uppercase tracking-widest transition-all active:scale-95 flex gap-2 items-center justify-center"
                    type="submit"
                    disabled={isCreating}
                  >
                    {isCreating ? (
                      <Spinner />
                    ) : (
                      <div className="flex items-center gap-2">
                        <Profile2User size="18" variant="Bold" /> Send to All
                      </div>
                    )}
                  </Button>

                  <Button
                    className="flex-1 bg-primary hover:bg-primary text-white h-12  font-black text-[10px] uppercase tracking-widest transition-all active:scale-95 shadow-lg shadow-primary/10 flex gap-2"
                    onClick={() => toast.info("Coming soon")}
                    type="button"
                  >
                    <UserTick size="18" variant="Bold" /> Leads Only
                  </Button>
                </div>
              </form>
            </Form>
          </section>

          <div className="p-4 bg-zinc-50 border border-zinc-200 rounded-[2rem] flex items-start gap-4 italic">
            <InfoCircle size={20} className="text-secondary shrink-0" />
            <p className="text-xs text-zinc-500 leading-relaxed font-medium">
              Announcements are pushed immediately to all assigned personnel via
              the lab internal notifications.
            </p>
          </div>
        </motion.div>

        <div className="col-span-12 lg:col-span-5 space-y-6">
          <h2 className="text-[11px] font-black uppercase tracking-[0.25em] text-zinc-400">
            Announcement Log
          </h2>

          <div className="space-y-4">
            {isAnnouncementsLoading ? (
              <div className="space-y-4">
                <AnnouncementCardSkeleton />
                <AnnouncementCardSkeleton />
              </div>
            ) : announcements.length === 0 ? (
              <div className="p-4 bg-zinc-50 border border-zinc-200 rounded-[2rem] flex items-start gap-4 italic">
                <InfoCircle size={20} className="text-secondary shrink-0" />
                <p className="text-xs text-zinc-500 leading-relaxed font-medium">
                  No announcements created for this project.
                </p>
              </div>
            ) : (
              announcements.map((announcement) => (
                <AnnouncementCard
                  projectId={projectId}
                  announcement={announcement}
                  key={announcement.id}
                />
              ))
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
