import { Modal, Button, Table, TextInput, ModalHeader, ModalBody, TableHead, TableHeadCell, TableCell, TableBody, TableRow, ModalFooter } from "flowbite-react";
import { useState, useEffect } from "react";

interface Column {
  key: string;
  label: string;
}

interface ModalProps<T = any> {
  open: boolean;
  onClose: () => void;
  onSelect: (item: T | null) => void;
  data: T[];
  columns: Column[];
  title?: string;
}

export function ChooseFromListModal<T = any>({
  open,
  onClose,
  onSelect,
  data,
  columns,
  title = "Choose Data"
}: ModalProps<T>) {
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState<T[]>(data || []);
  const [selected, setSelected] = useState<T | null>(null);

  useEffect(() => {
    setFiltered(
      data.filter(
        (item) =>
          columns.some((col) =>
            String((item as any)[col.key] ?? "")
              .toLowerCase()
              .includes(search.toLowerCase())
          )
      )
    );
  }, [search, data, columns]);

  const handleSelect = (item: T) => setSelected(item);

  return (
    <Modal show={open} onClose={onClose}>
      <ModalHeader>{title}</ModalHeader>
      <ModalBody>
        <TextInput
          placeholder="Cari data..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="overflow-x-auto max-h-64 mt-4">
          <Table hoverable>
            <TableHead>
              {columns.map((col) => (
                <TableHeadCell key={col.key}>{col.label}</TableHeadCell>
              ))}
            </TableHead>
            <TableBody>
              {filtered.map((item, idx) => (
                <TableRow
                  key={idx}
                  onClick={() => handleSelect(item)}
                  className={selected === item ? "bg-blue-100 cursor-pointer" : "cursor-pointer"}
                >
                  {columns.map((col) => (
                    <TableCell key={col.key}>
                      {(item as any)[col.key]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button disabled={!selected} onClick={() => { onSelect(selected); onClose(); }}>
          Pilih
        </Button>
        <Button color="gray" onClick={onClose}>Batal</Button>
      </ModalFooter>
    </Modal>
  );
}
