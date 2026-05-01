import { Button } from "~/components/ui/button";
import { Edit, UserEdit } from "iconsax-reactjs";
import { useEffect } from "react";
import { toast } from "sonner";
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
import { useChangePersonnelRoleMutation } from "~/services/personnels/queries";

export const ChangeUserRoleModal = ({
  userId,
  role,
}: {
  userId: string;
  role: "lead" | "intern" | "admin";
}) => {
  return (
    <ActionModal
      title="Update User Role"
      Icon={Edit}
      description="This action will change the member's role in the project. Please confirm that you want to proceed with updating this member's role."
      trigger={
        <button className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-zinc-50 text-zinc-700 transition-colors group">
          <div className="size-8 rounded-lg bg-zinc-100 flex items-center justify-center group-hover:bg-primary/10 group-hover:text-primary transition-colors">
            <UserEdit size="18" variant="Bold" />
          </div>
          <div className="text-left">
            <p className="text-xs font-bold">Change Role</p>
            <p className="text-[9px] text-zinc-400 font-medium">
              Currently {role}
            </p>
          </div>
        </button>
      }
    >
      {(setOpen) => (
        <UpdateUserRoleForm userId={userId} role={role} setOpen={setOpen} />
      )}
    </ActionModal>
  );
};

const memberSchema = z.object({
  role: z.enum(["lead", "intern", "admin"]).nonoptional(),
});

const UpdateUserRoleForm = ({
  userId,
  role,
  setOpen,
}: {
  userId: string;
  role: "lead" | "intern" | "admin";
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const {
    mutate: updateRole,
    isPending,
    isSuccess,
    isError,
    error,
  } = useChangePersonnelRoleMutation(userId);

  useEffect(() => {
    if (isError)
      toast.error(
        error.message || "Failed to update member role. Please try again.",
      );
    if (isSuccess) {
      toast.success("Member role updated successfully.");
      setOpen(false);
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

    updateRole(data.role);
  };

  const roles = ["lead", "intern", "admin"];
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
                    {roles
                      .filter((roleOption) => role !== roleOption)
                      .map((roleOption) => (
                        <SelectItem
                          key={roleOption}
                          value={roleOption}
                          className="flex items-center gap-6 py-2"
                        >
                          {roleOption.charAt(0).toUpperCase() +
                            roleOption.slice(1)}
                        </SelectItem>
                      ))}
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
            className="h-8 rounded-full border-dashed border-zinc-300 bg-primary text-white hover flex items-center ml-0"
          >
            {isPending ? <Spinner /> : "Update Role"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
