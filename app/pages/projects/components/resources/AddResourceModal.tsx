"use client";

import { useEffect, useRef, useState } from "react";
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
import ActionModal from "~/components/ui/ActionModal";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import Spinner from "~/components/ui/Spinner";
import { useAddProjectResourceLinkMutation } from "~/services/projects/queries";
import { toast } from "sonner";

export default function AddResourceModal({ projectId }: { projectId: string }) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  return (
    <ActionModal
      title="Add Resource"
      Icon={CloudPlus}
      description="Submit your project archive or share an external link to your project resources. Accepted formats: PDF, DOCX, ZIP (Max 10MB) or valid URLs."
      trigger={
        <button className="p-1.5 text-secondary bg-secondary/10 rounded-lg hover:scale-110 transition-transform active:scale-95 animate-pulse">
          <Add size="20" variant="Bold" />
        </button>
      }
    >
      {(setOpen) => (
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
            <Button
              className="w-full bg-primary h-12 rounded-xl font-black text-[10px] uppercase tracking-widest"
              onClick={() => {
                toast.info("Coming Soon");
                setOpen(false);
              }}
            >
              Upload Document
            </Button>
          </TabsContent>

          <TabsContent value="link">
            <ResourceLinkForm setOpen={setOpen} projectId={projectId} />
          </TabsContent>
        </Tabs>
      )}
    </ActionModal>
  );
}

const resourceLinkSchema = z.object({
  title: z.string().min(1, "Title must be at least 3 characters"),
  url: z.string().url("Please enter a valid URL"),
});

const ResourceLinkForm = ({
  projectId,
  setOpen,
}: {
  projectId: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const form = useForm<z.infer<typeof resourceLinkSchema>>({
    resolver: zodResolver(resourceLinkSchema),
    defaultValues: {
      title: "",
      url: "",
    },
  });

  const {
    mutate: addLink,
    isPending,
    isError,
    error,
    isSuccess,
  } = useAddProjectResourceLinkMutation(projectId);

  useEffect(() => {
    if (isError)
      toast.error(error.message || "Failed to add link. Please try again.");

    if (isSuccess) {
      toast.success("Link added successfully.");
      setOpen(false);
    }
  }, [isError, isSuccess, error]);

  const onSubmit = (data: z.infer<typeof resourceLinkSchema>) => {
    console.log("Form Data:", data);
    addLink(data);
  };

  return (
    <div className="space-y-6 pt-6 animate-in fade-in zoom-in-95 duration-200">
      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="text-[10px] font-black uppercase text-zinc-400 tracking-widest ml-1">
                  Title
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g., GitHub Repository"
                    className="h-12 bg-zinc-50 border rounded-xl px-5 font-bold text-sm focus-visible:ring-2 focus-visible:ring-primary/20"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="text-[10px] font-black uppercase text-zinc-400 tracking-widest ml-1">
                  Universal Resource Locator (URL)
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Link1
                      size="18"
                      className="absolute left-4 top-1/2 -translate-y-1/2 z-30 text-primary"
                    />
                    <Input
                      placeholder="https://..."
                      className="h-12 bg-zinc-50 border rounded-xl pl-12 pr-5 font-medium text-sm focus-visible:ring-2 focus-visible:ring-primary/20"
                      {...field}
                    />
                  </div>
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
                <div className="flex items-center ">Add URL</div>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
