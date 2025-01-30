import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusCircle, Search, Pencil, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import type { Database } from "@/types/supabase";
import EditProgram from "../actions/program/EditProgram";
import DeleteProgram from "../actions/program/DeleteProgram";

type Program = Database["public"]["Tables"]["kepmen_900_prog"]["Row"];
type Urusan = Database["public"]["Tables"]["kepmen_900_urusan"]["Row"];

interface ProgramWithUrusan extends Program {
  kepmen_900_urusan?: Urusan;
}

const ProgramTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ProgramWithUrusan | null>(
    null,
  );
  const [data, setData] = useState<ProgramWithUrusan[]>([]);

  const fetchData = async () => {
    try {
      const { data: result, error } = await supabase
        .from("kepmen_900_prog")
        .select(
          `
          *,
          kepmen_900_urusan (*)
        `,
        )
        .order("kode_rek_900prog");

      if (error) throw error;
      setData(result || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredData = data.filter((item) => {
    const searchFields = [
      item.kode_rek_900prog,
      item.uraian_900prog,
      item.kepmen_900_urusan?.kode_rek_900urusan,
      item.kepmen_900_urusan?.uraian_900urusan,
    ];

    return searchFields.some((field) =>
      field?.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  });

  const handleEdit = (item: ProgramWithUrusan) => {
    setSelectedItem(item);
    setShowForm(true);
  };

  const handleDelete = (item: ProgramWithUrusan) => {
    setSelectedItem(item);
    setShowDeleteDialog(true);
  };

  return (
    <div className="w-full space-y-4">
      <div className="flex justify-between items-center">
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Cari program..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        <Button onClick={() => setShowForm(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Tambah Program
        </Button>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Kode Rekening</TableHead>
              <TableHead>Nomenklatur</TableHead>
              <TableHead>Urusan</TableHead>
              <TableHead>Sasaran</TableHead>
              <TableHead>Indikator</TableHead>
              <TableHead>Satuan</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.kode_rek_900prog}</TableCell>
                <TableCell>{item.uraian_900prog}</TableCell>
                <TableCell>
                  {item.kepmen_900_urusan?.kode_rek_900urusan || "-"}
                </TableCell>
                <TableCell>{(item.sasaran_900prog || []).join(", ")}</TableCell>
                <TableCell>
                  {(item.indikator_900prog || []).join(", ")}
                </TableCell>
                <TableCell>{item.satuan_900prog || "-"}</TableCell>
                <TableCell className="text-right space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEdit(item)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(item)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <EditProgram
        data={selectedItem}
        open={showForm}
        onClose={() => {
          setShowForm(false);
          setSelectedItem(null);
        }}
        onSuccess={fetchData}
      />

      <DeleteProgram
        data={selectedItem}
        open={showDeleteDialog}
        onClose={() => {
          setShowDeleteDialog(false);
          setSelectedItem(null);
        }}
        onSuccess={fetchData}
      />
    </div>
  );
};

export default ProgramTable;
