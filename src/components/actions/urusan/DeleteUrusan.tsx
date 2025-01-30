import DeleteConfirmation from "@/components/DeleteConfirmation";
import { supabase } from "@/lib/supabase";
import type { Database } from "@/types/supabase";

type Urusan = Database["public"]["Tables"]["kepmen_900_urusan"]["Row"];

interface DeleteUrusanProps {
  data: Urusan | null;
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const DeleteUrusan = ({
  data,
  open,
  onClose,
  onSuccess,
}: DeleteUrusanProps) => {
  const handleDelete = async () => {
    if (!data) return;

    try {
      const { error } = await supabase
        .from("kepmen_900_urusan")
        .delete()
        .eq("id", data.id);

      if (error) throw error;
      onSuccess();
    } catch (error) {
      console.error("Error deleting urusan:", error);
    } finally {
      onClose();
    }
  };

  return (
    <DeleteConfirmation
      open={open}
      onCancel={onClose}
      onConfirm={handleDelete}
      title="Hapus Urusan"
      description={`Apakah Anda yakin ingin menghapus urusan ${data?.kode_rek_900urusan}?`}
    />
  );
};

export default DeleteUrusan;
