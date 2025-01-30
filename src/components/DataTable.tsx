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
import DeleteConfirmation from "./DeleteConfirmation";
import FormDialog from "./forms/FormDialog";
import { supabase } from "@/lib/supabase";
import type { Database } from "@/types/supabase";

type Urusan = Database["public"]["Tables"]["kepmen_900_urusan"]["Row"];
type Program = Database["public"]["Tables"]["kepmen_900_prog"]["Row"];

interface DataTableProps {
  type: "urusan" | "program";
}

interface ProgramWithUrusan extends Program {
  kepmen_900_urusan?: Urusan;
}

const DataTable = ({ type }: DataTableProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Urusan | Program | null>(
    null,
  );
  const [data, setData] = useState<(Urusan | ProgramWithUrusan)[]>([]);

  const fetchData = async () => {
    try {
      if (type === "urusan") {
        const { data: result, error } = await supabase
          .from("kepmen_900_urusan")
          .select("*")
          .order("kode_rek_900urusan");

        if (error) throw error;
        setData(result || []);
      } else {
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
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [type]);

  const filteredData = data.filter((item) => {
    const searchFields =
      type === "urusan"
        ? [
            (item as Urusan).kode_rek_900urusan,
            (item as Urusan).uraian_900urusan,
          ]
        : [
            (item as ProgramWithUrusan).kode_rek_900prog,
            (item as ProgramWithUrusan).uraian_900prog,
            (item as ProgramWithUrusan).kepmen_900_urusan?.kode_rek_900urusan,
            (item as ProgramWithUrusan).kepmen_900_urusan?.uraian_900urusan,
          ];

    return searchFields.some((field) =>
      field?.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  });

  const handleEdit = (item: Urusan | Program) => {
    setSelectedItem(item);
    setShowForm(true);
  };

  const handleDelete = (item: Urusan | Program) => {
    setSelectedItem(item);
    setShowDeleteDialog(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedItem) return;

    try {
      const { error } = await supabase
        .from(type === "urusan" ? "kepmen_900_urusan" : "kepmen_900_prog")
        .delete()
        .eq("id", selectedItem.id);

      if (error) throw error;
      fetchData();
    } catch (error) {
      console.error("Error deleting item:", error);
    } finally {
      setShowDeleteDialog(false);
      setSelectedItem(null);
    }
  };

  return (
    <div className="w-full space-y-4">
      <div className="flex justify-between items-center">
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Cari data..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        <Button onClick={() => setShowForm(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Tambah {type === "urusan" ? "Urusan" : "Program"}
        </Button>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Kode Rekening</TableHead>
              <TableHead>Nomenklatur</TableHead>
              {type === "program" && (
                <>
                  <TableHead>Urusan</TableHead>
                  <TableHead>Sasaran</TableHead>
                  <TableHead>Indikator</TableHead>
                  <TableHead>Satuan</TableHead>
                </>
              )}
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  {type === "urusan"
                    ? (item as Urusan).kode_rek_900urusan
                    : (item as ProgramWithUrusan).kode_rek_900prog}
                </TableCell>
                <TableCell>
                  {type === "urusan"
                    ? (item as Urusan).uraian_900urusan
                    : (item as ProgramWithUrusan).uraian_900prog}
                </TableCell>
                {type === "program" && (
                  <>
                    <TableCell>
                      {(item as ProgramWithUrusan).kepmen_900_urusan
                        ?.kode_rek_900urusan || "-"}
                    </TableCell>
                    <TableCell>
                      {((item as ProgramWithUrusan).sasaran_900prog || []).join(
                        ", ",
                      )}
                    </TableCell>
                    <TableCell>
                      {(
                        (item as ProgramWithUrusan).indikator_900prog || []
                      ).join(", ")}
                    </TableCell>
                    <TableCell>
                      {(item as ProgramWithUrusan).satuan_900prog || "-"}
                    </TableCell>
                  </>
                )}
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

      {showDeleteDialog && (
        <DeleteConfirmation
          open={showDeleteDialog}
          onCancel={() => setShowDeleteDialog(false)}
          onConfirm={handleDeleteConfirm}
        />
      )}

      <FormDialog
        type={type}
        data={selectedItem}
        open={showForm}
        onClose={() => {
          setShowForm(false);
          setSelectedItem(null);
        }}
        onSuccess={fetchData}
      />
    </div>
  );
};

export default DataTable;
