import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import type { Database } from "@/types/supabase";

type Urusan = Database["public"]["Tables"]["kepmen_900_urusan"]["Row"];
type Program = Database["public"]["Tables"]["kepmen_900_prog"]["Row"];

interface DataFormProps {
  type: "urusan" | "program";
  data?: Urusan | Program | null;
  onClose: () => void;
}

const DataForm = ({ type, data, onClose }: DataFormProps) => {
  const isEdit = !!data;
  const [formData, setFormData] = useState({
    kode:
      type === "urusan"
        ? (data as Urusan)?.kode_rek_900urusan || ""
        : (data as Program)?.kode_rek_900prog || "",
    nomenklatur:
      type === "urusan"
        ? (data as Urusan)?.uraian_900urusan || ""
        : (data as Program)?.uraian_900prog || "",
    sasaran: (data as Program)?.sasaran_900prog?.join("\n") || "",
    indikator: (data as Program)?.indikator_900prog?.join("\n") || "",
    satuan: (data as Program)?.satuan_900prog || "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (type === "urusan") {
        const payload = {
          kode_rek_900urusan: formData.kode,
          uraian_900urusan: formData.nomenklatur,
        };

        if (isEdit) {
          await supabase
            .from("kepmen_900_urusan")
            .update(payload)
            .eq("id", data?.id);
        } else {
          await supabase.from("kepmen_900_urusan").insert(payload);
        }
      } else {
        const payload = {
          kode_rek_900prog: formData.kode,
          uraian_900prog: formData.nomenklatur,
          sasaran_900prog: formData.sasaran.split("\n").filter(Boolean),
          indikator_900prog: formData.indikator.split("\n").filter(Boolean),
          satuan_900prog: formData.satuan,
          urusan_id: (data as Program)?.urusan_id,
        };

        if (isEdit) {
          await supabase
            .from("kepmen_900_prog")
            .update(payload)
            .eq("id", data?.id);
        } else {
          await supabase.from("kepmen_900_prog").insert(payload);
        }
      }

      onClose();
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-background">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Edit" : "Tambah"}{" "}
            {type === "urusan" ? "Urusan" : "Program"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="kode">Kode Rekening</Label>
            <Input
              id="kode"
              value={formData.kode}
              onChange={(e) =>
                setFormData({ ...formData, kode: e.target.value })
              }
              placeholder="Masukkan kode rekening"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="nomenklatur">Nomenklatur</Label>
            <Textarea
              id="nomenklatur"
              value={formData.nomenklatur}
              onChange={(e) =>
                setFormData({ ...formData, nomenklatur: e.target.value })
              }
              placeholder="Masukkan nomenklatur"
              required
            />
          </div>
          {type === "program" && (
            <>
              <div className="space-y-2">
                <Label htmlFor="sasaran">Sasaran (satu per baris)</Label>
                <Textarea
                  id="sasaran"
                  value={formData.sasaran}
                  onChange={(e) =>
                    setFormData({ ...formData, sasaran: e.target.value })
                  }
                  placeholder="Masukkan sasaran"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="indikator">Indikator (satu per baris)</Label>
                <Textarea
                  id="indikator"
                  value={formData.indikator}
                  onChange={(e) =>
                    setFormData({ ...formData, indikator: e.target.value })
                  }
                  placeholder="Masukkan indikator"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="satuan">Satuan</Label>
                <Input
                  id="satuan"
                  value={formData.satuan}
                  onChange={(e) =>
                    setFormData({ ...formData, satuan: e.target.value })
                  }
                  placeholder="Masukkan satuan"
                />
              </div>
            </>
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

export default DataForm;
