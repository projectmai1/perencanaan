import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import type { Database } from "@/types/supabase";
import UrusanForm from "./UrusanForm";
import ProgramForm from "./ProgramForm";

type Urusan = Database["public"]["Tables"]["kepmen_900_urusan"]["Row"];
type Program = Database["public"]["Tables"]["kepmen_900_prog"]["Row"];

interface FormDialogProps {
  type: "urusan" | "program";
  data?: Urusan | Program | null;
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const FormDialog = ({
  type,
  data,
  open,
  onClose,
  onSuccess,
}: FormDialogProps) => {
  const isEdit = !!data;
  const [formData, setFormData] = useState<Partial<Urusan | Program>>(
    data || {},
  );

  // Reset form data when dialog opens/closes or data changes
  useEffect(() => {
    if (open && data) {
      setFormData(data);
    } else {
      setFormData({});
    }
  }, [open, data]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (type === "urusan") {
        const table = "kepmen_900_urusan";
        if (isEdit) {
          await supabase.from(table).update(formData).eq("id", data?.id);
        } else {
          await supabase.from(table).insert(formData);
        }
      } else {
        const table = "kepmen_900_prog";
        if (isEdit) {
          await supabase.from(table).update(formData).eq("id", data?.id);
        } else {
          await supabase.from(table).insert(formData);
        }
      }

      onSuccess();
      onClose();
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-background">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Edit" : "Tambah"}{" "}
            {type === "urusan" ? "Urusan" : "Program"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {type === "urusan" ? (
            <UrusanForm
              data={formData as Urusan}
              onChange={(values) => setFormData({ ...formData, ...values })}
            />
          ) : (
            <ProgramForm
              data={formData as Program}
              onChange={(values) => setFormData({ ...formData, ...values })}
            />
          )}
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Batal
            </Button>
            <Button type="submit">{isEdit ? "Simpan" : "Tambah"}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default FormDialog;
