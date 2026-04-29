"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import { Edit, People, Add } from "iconsax-reactjs";

import {
  Form,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
  FormControl,
} from "~/components/ui/form";
import Spinner from "~/components/ui/Spinner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

import MemberAvatar from "~/components/ui/MemberAvatar";
import { Separator } from "~/components/ui/separator";
import { useGetAllPersonnelQuery } from "~/services/personnels/queries";

import { Briefcase, CheckCheck } from "lucide-react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAddProjectMemberMutation } from "~/services/projects/queries";
import type { ProjectInfoMember } from "~/services/projects/types";

export function AddProjectMemberModal({
  projectId,
  members,
}: {
  projectId: string;
  members: ProjectInfoMember[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          type="button"
          size="sm"
          className="rounded-full bg-primary text-white flex items-center justify-center"
        >
          <div className="flex items-center gap-2">
            <Add /> {"Add member"}
          </div>
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-125 border-none rounded-[2rem] p-8 shadow-2xl">
        <DialogHeader className="space-y-2">
          <div className="size-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
            <Edit size="24" variant="Bold" />
          </div>
          <DialogTitle className="text-2xl font-black uppercase tracking-tighter">
            Add Project Member
          </DialogTitle>
        </DialogHeader>

        <AddMemberForm
          projectId={projectId}
          members={members}
          setOpen={setOpen}
        />

        <DialogFooter className="flex flex-col sm:flex-row gap-3 ">
          <DialogClose asChild>
            <Button variant="outline" className="px-12 ml-0">
              Discard
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

const memberSchema = z.object({
  member: z.string().min(1, "Select a member to add"),
  role: z.enum(["lead", "intern"]),
});

const AddMemberForm = ({
  projectId,
  members,
  setOpen,
}: {
  projectId: string;
  members: ProjectInfoMember[];
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const {
    data: allPersonnel = [],
    isFetching: isGettingAllPersonnel,
    isError: isGettingAllPersonnelError,
    error: getAllPersonnelError,
  } = useGetAllPersonnelQuery();

  const form = useForm<z.infer<typeof memberSchema>>({
    resolver: zodResolver(memberSchema),
    defaultValues: {
      member: "",
      role: "intern",
    },
  });

  const {
    mutate: addMember,
    isPending: isAddingMember,
    isError: isAddingMemberError,
    error: addMemberError,
    isSuccess: isAddingMemberSuccess,
  } = useAddProjectMemberMutation(projectId);

  useEffect(() => {
    if (isGettingAllPersonnelError) {
      toast.error(
        getAllPersonnelError.message ||
          "Something went wrong. Please try again.",
      );

      setOpen(false);
    }

    if (isAddingMemberError) {
      toast.error(
        addMemberError?.message || "Could not add member. Please try again.",
      );

      setOpen(false);
    }

    if (isAddingMemberSuccess) {
      toast.success("Member added successfully!");
      form.reset();
      setOpen(false);
    }
  }, [isAddingMemberError, addMemberError, isAddingMemberSuccess]);

  const onSubmit = (data: z.infer<typeof memberSchema>) => {
    console.log("Adding member with data:", data);
    addMember({ member: data.member, role: data.role });
  };

  return (
    <Form {...form}>
      <Separator className="my-6" />
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex-1">
          <FormField
            control={form.control}
            name="member"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-black uppercase text-zinc-400 flex items-center gap-2">
                  <People size={12} /> Choose Team Members
                </FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="h-11 bg-zinc-50/50 dark:bg-zinc-900/50">
                      <SelectValue
                        placeholder={
                          isGettingAllPersonnel
                            ? "Loading members..."
                            : "Assign members"
                        }
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent position="popper">
                    {isGettingAllPersonnel ? (
                      <Spinner className="mx-auto my-4" />
                    ) : (
                      allPersonnel
                        .filter(
                          (member) => !members.some((m) => m.id === member.id),
                        )
                        .map((member) => (
                          <SelectItem
                            key={member.id}
                            value={member.id}
                            className="flex items-center gap-6"
                          >
                            <MemberAvatar member={member} />
                            {member.first_name} {member.last_name}
                          </SelectItem>
                        ))
                    )}
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem className="mt-6">
                <FormLabel className="text-xs font-black uppercase text-zinc-400 flex items-center gap-2">
                  <Briefcase size={12} /> Choose Role
                </FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="h-11 bg-zinc-50/50 dark:bg-zinc-900/50">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent position="popper">
                    <SelectItem
                      value="intern"
                      className="flex items-center gap-6"
                    >
                      Team Member
                    </SelectItem>
                    <SelectItem
                      value="lead"
                      className="flex items-center gap-6"
                    >
                      Lead
                    </SelectItem>
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button
          type="submit"
          size="sm"
          className="h-8 w-12 rounded-full border-dashed border-zinc-300 bg-primary text-white hover flex items-center ml-0"
        >
          {isAddingMember ? <Spinner /> : <CheckCheck size={20} />}
        </Button>
      </form>
    </Form>
  );
};
