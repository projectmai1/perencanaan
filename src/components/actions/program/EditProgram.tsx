import FormDialog from "@/components/forms/FormDialog";
import type { Database } from "@/types/supabase";

type Program = Database["public"]["Tables"]["kepmen_900_prog"]["Row"];

interface EditProgramProps {
  data: Program | null;
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const EditProgram = ({ data, open, onClose, onSuccess }: EditProgramProps) => {
  return (
    <FormDialog
      type="program"
      data={data}
      open={open}
      onClose={onClose}
      onSuccess={onSuccess}
    />
  );
};

export default EditProgram;
