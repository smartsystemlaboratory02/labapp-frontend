import { Button } from "~/components/ui/button";
import { Lock, Trash } from "iconsax-reactjs";
import { useEffect } from "react";
import { toast } from "sonner";
import ActionModal from "~/components/ui/ActionModal";
import Spinner from "~/components/ui/Spinner";
import { useDeactivatePersonnelMutation } from "~/services/personnels/queries";

export const DeactivateUserModal = ({ userId }: { userId: string }) => {
  const {
    mutate: deactivateUser,
    isPending,
    isSuccess,
    isError,
    error,
  } = useDeactivatePersonnelMutation(userId);

  return (
    <ActionModal
      title="Deactivate User"
      Icon={Lock}
      description=""
      trigger={
        <button className="w-full flex items-center gap-3 p-2.5 rounded-xl transition-all group hover:bg-orange-50 text-orange-600">
          <div className="size-8 rounded-lg bg-orange-100 flex items-center justify-center transition-colors">
            <Lock size="18" variant="Bold" />
          </div>
          <div className="text-left">
            <p className="text-xs font-bold">Deactivate User</p>
            <p className="text-[9px] opacity-70 font-medium">
              Suspend all access
            </p>
          </div>
        </button>
      }
    >
      {(setOpen) => {
        useEffect(() => {
          if (isError)
            toast.error(
              error.message || "Failed to deactivate user. Please try again.",
            );
          if (isSuccess) {
            toast.success("User deactivated successfully.");
            setOpen(false);
          }
        }, [isError, isSuccess, error]);

        return (
          <div className="flex flex-col gap-6">
            <div className="p-4 rounded-2xl bg-destructive/5 text-destructive text-xs">
              Warning: This action will restrict the user from accessing the Lab
              App. Proceed with caution.
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-fit ml-auto">
              <Button
                variant="outline"
                className="px-12 ml-0"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                className="ml-0 flex items-center justify-center hover:shadow-destructive/20"
                onClick={() => deactivateUser()}
                disabled={isPending}
              >
                {isPending ? (
                  <Spinner className="border-l-destructive border-r-destructive" />
                ) : (
                  "Deactivate"
                )}
              </Button>
            </div>
          </div>
        );
      }}
    </ActionModal>
  );
};
