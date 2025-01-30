import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { Database } from "@/types/supabase";

type Urusan = Database["public"]["Tables"]["kepmen_900_urusan"]["Row"];

interface UrusanFormProps {
  data?: Urusan;
  onChange: (values: Partial<Urusan>) => void;
}

const UrusanForm = ({ data, onChange }: UrusanFormProps) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="kode">Kode Rekening</Label>
        <Input
          id="kode"
          value={data?.kode_rek_900urusan || ""}
          onChange={(e) => onChange({ kode_rek_900urusan: e.target.value })}
          placeholder="Masukkan kode rekening"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="nomenklatur">Nomenklatur</Label>
        <Textarea
          id="nomenklatur"
          value={data?.uraian_900urusan || ""}
          onChange={(e) => onChange({ uraian_900urusan: e.target.value })}
          placeholder="Masukkan nomenklatur"
          required
        />
      </div>
    </div>
  );
};

export default UrusanForm;
