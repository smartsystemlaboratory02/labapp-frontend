import { Button } from "~/components/ui/button";
import { Trash, Unlock } from "iconsax-reactjs";
import { useEffect } from "react";
import { toast } from "sonner";
import ActionModal from "~/components/ui/ActionModal";
import Spinner from "~/components/ui/Spinner";
import { useActivatePersonnelMutation } from "~/services/personnels/queries";

export const ActivateUserModal = ({ userId }: { userId: string }) => {
  const {
    mutate: activateUser,
    isPending,
    isSuccess,
    isError,
    error,
  } = useActivatePersonnelMutation(userId);

  return (
    <ActionModal
      title="Activate User"
      Icon={Unlock}
      description=""
      trigger={
        <button className="w-full flex items-center gap-3 p-2.5 rounded-xl transition-all group hover:bg-green-50 text-green-600">
          <div className="size-8 rounded-lg bg-green-100 flex items-center justify-center transition-colors">
            <Unlock size="18" variant="Bold" />
          </div>
          <div className="text-left">
            <p className="text-xs font-bold">Activate User</p>
            <p className="text-[9px] opacity-70 font-medium">
              Restore platform access
            </p>
          </div>
        </button>
      }
    >
      {(setOpen) => {
        useEffect(() => {
          if (isError)
            toast.error(
              error.message || "Failed to activate user. Please try again.",
            );
          if (isSuccess) {
            toast.success("User activated successfully.");
            setOpen(false);
          }
        }, [isError, isSuccess, error]);

        return (
          <div className="flex flex-col gap-6">
            <div className="p-4 rounded-2xl text-xs bg-destructive/10 text-destructive">
              Warning: This action will allow the user to access the Lab App and
              all it's features. Proceed with caution.
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
                // variant="destructive"
                className="ml-0 flex items-center justify-center0"
                onClick={() => activateUser()}
                disabled={isPending}
              >
                {isPending ? <Spinner /> : "Activate"}
              </Button>
            </div>
          </div>
        );
      }}
    </ActionModal>
  );
};
