import { Button } from "~/components/ui/button";
import { Trash } from "iconsax-reactjs";
import { useEffect } from "react";
import { toast } from "sonner";
import { useDeleteProjectMemberMutation } from "~/services/projects/queries";
import ActionModal from "~/components/ui/ActionModal";
import Spinner from "~/components/ui/Spinner";

export const DeleteProjectMemberModal = ({
    projectId,
  memberId,
  first_name,
}: {
    projectId: string;
  memberId: string;
  first_name: string;
}) => {
  const {
    mutate: deleteMutation,
    isPending,
    isSuccess,
    isError,
    error,
  } = useDeleteProjectMemberMutation(projectId, memberId);

  useEffect(() => {
    if (isError)
      toast.error(
        error.message || "Failed to delete member. Please try again.",
      );
    if (isSuccess) {
      toast.success("Member deleted successfully.");
    }
  }, [isError, isSuccess, error]);

  return (
    <ActionModal
      title="Delete Member"
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
      {(setOpen) => (
        <div className="flex flex-col gap-6">
          <div className="p-4 rounded-2xl bg-destructive/5 text-destructive text-xs">
            Warning: Deleting this member will remove them permanently from the
            project. This action cannot be undone. Please confirm that you want
            to proceed with deleting this member.
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
                `Delete ${first_name}`
              )}
            </Button>
          </div>
        </div>
      )}
    </ActionModal>
  );
};
