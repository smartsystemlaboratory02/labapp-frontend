import { Button } from "~/components/ui/button";
import { Trash } from "iconsax-reactjs";
import { useEffect } from "react";
import { toast } from "sonner";
import { useDeleteProjectAnnouncementMutation } from "~/services/projects/queries";
import ActionModal from "~/components/ui/ActionModal";
import Spinner from "~/components/ui/Spinner";

export const DeleteAnnouncementModal = ({
  projectId,
  announcementId,
}: {
  projectId: string;
  announcementId: string;
}) => {
  const {
    mutate: deleteMutation,
    isPending,
    isSuccess,
    isError,
    error,
  } = useDeleteProjectAnnouncementMutation(projectId, announcementId);

  return (
    <ActionModal
      title="Delete Announcement"
      Icon={Trash}
      description="This action is permanent and cannot be undone."
      trigger={
        <button
          type="button"
          className="p-2 rounded-xl border border-destructive text-destructive hover:bg-red-50 transition"
        >
          <Trash size={16} />
        </button>
      }
    >
      {(setOpen) => {
        useEffect(() => {
          if (isError)
            toast.error(
              error.message ||
                "Failed to delete announcement. Please try again.",
            );
          if (isSuccess) {
            toast.success("Announcement deleted successfully.");
            setOpen(false);
          }
        }, [isError, isSuccess, error]);

        return (
          <div className="flex flex-col gap-6">
            <div className="p-4 rounded-2xl bg-destructive/5 text-destructive text-xs">
              Warning: Deleting this announcement will remove it permanently
              from the project. This action cannot be undone. Please confirm
              that you want to proceed with deleting this announcement.
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
                onClick={() => deleteMutation()}
                disabled={isPending}
              >
                {isPending ? (
                  <Spinner className="border-l-destructive border-r-destructive" />
                ) : (
                  `Delete Announcement`
                )}
              </Button>
            </div>
          </div>
        );
      }}
    </ActionModal>
  );
};
