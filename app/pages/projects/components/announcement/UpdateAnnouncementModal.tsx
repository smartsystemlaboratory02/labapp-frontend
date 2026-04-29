import { Button } from "~/components/ui/button";
import { Edit, UserEdit } from "iconsax-reactjs";
import { useEffect } from "react";
import { toast } from "sonner";
import {
  useUpdateProjectAnnouncementMutation,
  useUpdateProjectMemberRoleMutation,
} from "~/services/projects/queries";
import ActionModal from "~/components/ui/ActionModal";
import Spinner from "~/components/ui/Spinner";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

import { CheckCheck } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import {
  Form,
  FormField,
  FormItem,
  FormMessage,
  FormControl,
  FormLabel,
} from "~/components/ui/form";
import type { ProjectAnnouncement } from "~/services/projects/types";
import { getChangedFields } from "~/services/projects/utils";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";

export const UpdateAnnouncementModal = ({
  projectId,
  announcement,
}: {
  projectId: string;
  announcement: ProjectAnnouncement;
}) => {
  return (
    <ActionModal
      title="Update Announcement"
      Icon={Edit}
      description=""
      trigger={
        <button
          type="button"
          className="p-2 rounded-xl border border-zinc-200 hover:bg-zinc-50 transition"
        >
          <Edit size={16} />
        </button>
      }
    >
      {(setOpen) => (
        <UpdateAnnouncementSchema
          projectId={projectId}
          announcement={announcement}
          setOpen={setOpen}
        />
      )}
    </ActionModal>
  );
};

const announcementSchema = z.object({
  title: z.string().min(1, "Announcement title is required"),
  content: z
    .string()
    .min(10, "Announcement content must be at least 10 characters long"),
  // target: z.enum(["all", "leads"]),
});

const UpdateAnnouncementSchema = ({
  projectId,
  announcement,
  setOpen,
}: {
  projectId: string;
  announcement: ProjectAnnouncement;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const {
    mutate: updateAnnouncement,
    isPending,
    isSuccess,
    isError,
    error,
  } = useUpdateProjectAnnouncementMutation(projectId, announcement.id);

  useEffect(() => {
    if (isError)
      toast.error(
        error.message || "Failed to update announcement. Please try again.",
      );
    if (isSuccess) {
      toast.success("Announcement updated successfully.");
      setOpen(false);
    }
  }, [isError, isSuccess, error]);

  const form = useForm<z.infer<typeof announcementSchema>>({
    resolver: zodResolver(announcementSchema),
    defaultValues: {
      title: announcement.title || "",
      content: announcement.content || "",
    },
  });

  const onSubmit = (data: z.infer<typeof announcementSchema>) => {
    const payload = getChangedFields(data, {
      title: announcement.title,
      content: announcement.content,
    }) as { title?: string; content?: string };

    if (Object.keys(payload).length === 0) {
      toast.error("No changes made to update.");
      return;
    }

    updateAnnouncement(payload);
  };

  return (
    <Form {...form}>
      <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs font-bold uppercase tracking-[0.15em] text-zinc-500">
                Title
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
                Content
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

        <div className="flex flex-col sm:flex-row gap-3 w-fit ml-auto">
          <Button
            variant="outline"
            className="px-12 ml-0"
            onClick={() => setOpen(false)}
            type="button"
          >
            Cancel
          </Button>
          <Button
            className="h-8 rounded-full border-dashed border-zinc-300 bg-primary text-white hover flex items-center ml-0"
            type="submit"
            disabled={isPending}
          >
            {isPending ? (
              <Spinner />
            ) : (
              <div className="flex items-center ">Edit Announcement</div>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};
