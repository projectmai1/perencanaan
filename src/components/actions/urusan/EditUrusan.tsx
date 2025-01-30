import FormDialog from "@/components/forms/FormDialog";
import type { Database } from "@/types/supabase";

type Urusan = Database["public"]["Tables"]["kepmen_900_urusan"]["Row"];

interface EditUrusanProps {
  data: Urusan | null;
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const EditUrusan = ({ data, open, onClose, onSuccess }: EditUrusanProps) => {
  return (
    <FormDialog
      type="urusan"
      data={data}
      open={open}
      onClose={onClose}
      onSuccess={onSuccess}
    />
  );
};

export default EditUrusan;
