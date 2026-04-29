import { Button } from "~/components/ui/button";
import { Edit, UserEdit } from "iconsax-reactjs";
import { useEffect } from "react";
import { toast } from "sonner";
import { useUpdateProjectMemberRoleMutation } from "~/services/projects/queries";
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
} from "~/components/ui/form";
import { Separator } from "~/components/ui/separator";

export const UpdateMemberRoleModal = ({
  projectId,
  memberId,
  role,
}: {
  projectId: string;
  memberId: string;
  role: "lead" | "intern";
}) => {
  return (
    <ActionModal
      title="Update Member Role"
      Icon={Edit}
      description="This action will change the member's role in the project. Please confirm that you want to proceed with updating this member's role."
      trigger={
        <button
          type="button"
          className="p-2 rounded-xl border border-zinc-300 hover:bg-zinc-50 transition flex items-center gap-2 text-zinc-500"
        >
          <UserEdit size={16} />
        </button>
      }
    >
      {(setOpen) => (
        <UpdateMemberRoleForm
          projectId={projectId}
          memberId={memberId}
          role={role}
          setOpen={setOpen}
        />
      )}
    </ActionModal>
  );
};

const memberSchema = z.object({
  role: z.enum(["lead", "intern"]),
});

const UpdateMemberRoleForm = ({
  projectId,
  memberId,
  role,
  setOpen,
}: {
  projectId: string;
  memberId: string;
  role: "lead" | "intern";
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const {
    mutate: updateRole,
    isPending,
    isSuccess,
    isError,
    error,
  } = useUpdateProjectMemberRoleMutation(projectId, memberId);

  useEffect(() => {
    if (isError)
      toast.error(
        error.message || "Failed to update member role. Please try again.",
      );
    if (isSuccess) {
      toast.success("Member role updated successfully.");
    }
  }, [isError, isSuccess, error]);

  const form = useForm<z.infer<typeof memberSchema>>({
    resolver: zodResolver(memberSchema),
    defaultValues: {
      role: role,
    },
  });

  const onSubmit = (data: z.infer<typeof memberSchema>) => {
    if (data.role === role) {
      toast.error("Please select a different role to update.");
      return;
    }

    updateRole({ role: data.role });
  };

  return (
    <Form {...form}>
      <Separator className="my-6" />
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex-1">
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem className="mt-6">
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
            type="submit"
            size="sm"
            className="h-8 w-12 rounded-full border-dashed border-zinc-300 bg-primary text-white hover flex items-center ml-0"
          >
            {isPending ? <Spinner /> : <CheckCheck size={20} />}
          </Button>
        </div>
      </form>
    </Form>
  );
};
