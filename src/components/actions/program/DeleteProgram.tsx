import DeleteConfirmation from "@/components/DeleteConfirmation";
import { supabase } from "@/lib/supabase";
import type { Database } from "@/types/supabase";

type Program = Database["public"]["Tables"]["kepmen_900_prog"]["Row"];

interface DeleteProgramProps {
  data: Program | null;
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const DeleteProgram = ({
  data,
  open,
  onClose,
  onSuccess,
}: DeleteProgramProps) => {
  const handleDelete = async () => {
    if (!data) return;

    try {
      const { error } = await supabase
        .from("kepmen_900_prog")
        .delete()
        .eq("id", data.id);

      if (error) throw error;
      onSuccess();
    } catch (error) {
      console.error("Error deleting program:", error);
    } finally {
      onClose();
    }
  };

  return (
    <DeleteConfirmation
      open={open}
      onCancel={onClose}
      onConfirm={handleDelete}
      title="Hapus Program"
      description={`Apakah Anda yakin ingin menghapus program ${data?.kode_rek_900prog}?`}
    />
  );
};

export default DeleteProgram;
