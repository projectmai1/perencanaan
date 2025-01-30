import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import type { Database } from "@/types/supabase";

type Program = Database["public"]["Tables"]["kepmen_900_prog"]["Row"];
type Urusan = Database["public"]["Tables"]["kepmen_900_urusan"]["Row"];

interface ProgramFormProps {
  data?: Program;
  onChange: (values: Partial<Program>) => void;
}

const ProgramForm = ({ data, onChange }: ProgramFormProps) => {
  const [urusanList, setUrusanList] = useState<Urusan[]>([]);

  useEffect(() => {
    const fetchUrusan = async () => {
      const { data: urusan } = await supabase
        .from("kepmen_900_urusan")
        .select("*")
        .order("kode_rek_900urusan");

      if (urusan) setUrusanList(urusan);
    };

    fetchUrusan();
  }, []);

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="urusan">Urusan</Label>
        <Select
          value={data?.urusan_id || ""}
          onValueChange={(value) => onChange({ urusan_id: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Pilih urusan" />
          </SelectTrigger>
          <SelectContent>
            {urusanList.map((urusan) => (
              <SelectItem key={urusan.id} value={urusan.id}>
                {urusan.kode_rek_900urusan} - {urusan.uraian_900urusan}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="kode">Kode Rekening</Label>
        <Input
          id="kode"
          value={data?.kode_rek_900prog || ""}
          onChange={(e) => onChange({ kode_rek_900prog: e.target.value })}
          placeholder="Masukkan kode rekening"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="nomenklatur">Nomenklatur</Label>
        <Textarea
          id="nomenklatur"
          value={data?.uraian_900prog || ""}
          onChange={(e) => onChange({ uraian_900prog: e.target.value })}
          placeholder="Masukkan nomenklatur"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="sasaran">Sasaran (satu per baris)</Label>
        <Textarea
          id="sasaran"
          value={data?.sasaran_900prog?.join("\n") || ""}
          onChange={(e) =>
            onChange({
              sasaran_900prog: e.target.value.split("\n").filter(Boolean),
            })
          }
          placeholder="Masukkan sasaran"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="indikator">Indikator (satu per baris)</Label>
        <Textarea
          id="indikator"
          value={data?.indikator_900prog?.join("\n") || ""}
          onChange={(e) =>
            onChange({
              indikator_900prog: e.target.value.split("\n").filter(Boolean),
            })
          }
          placeholder="Masukkan indikator"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="satuan">Satuan</Label>
        <Input
          id="satuan"
          value={data?.satuan_900prog || ""}
          onChange={(e) => onChange({ satuan_900prog: e.target.value })}
          placeholder="Masukkan satuan"
        />
      </div>
    </div>
  );
};

export default ProgramForm;
