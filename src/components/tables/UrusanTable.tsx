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
import EditUrusan from "../actions/urusan/EditUrusan";
import DeleteUrusan from "../actions/urusan/DeleteUrusan";

type Urusan = Database["public"]["Tables"]["kepmen_900_urusan"]["Row"];

const UrusanTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Urusan | null>(null);
  const [data, setData] = useState<Urusan[]>([]);

  const fetchData = async () => {
    try {
      const { data: result, error } = await supabase
        .from("kepmen_900_urusan")
        .select("*")
        .order("kode_rek_900urusan");

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
    const searchFields = [item.kode_rek_900urusan, item.uraian_900urusan];

    return searchFields.some((field) =>
      field?.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  });

  const handleEdit = (item: Urusan) => {
    setSelectedItem(item);
    setShowForm(true);
  };

  const handleDelete = (item: Urusan) => {
    setSelectedItem(item);
    setShowDeleteDialog(true);
  };

  return (
    <div className="w-full space-y-4">
      <div className="flex justify-between items-center">
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Cari urusan..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        <Button onClick={() => setShowForm(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Tambah Urusan
        </Button>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Kode Rekening</TableHead>
              <TableHead>Nomenklatur</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.kode_rek_900urusan}</TableCell>
                <TableCell>{item.uraian_900urusan}</TableCell>
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

      <EditUrusan
        data={selectedItem}
        open={showForm}
        onClose={() => {
          setShowForm(false);
          setSelectedItem(null);
        }}
        onSuccess={fetchData}
      />

      <DeleteUrusan
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

export default UrusanTable;
