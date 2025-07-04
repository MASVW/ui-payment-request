import { Modal, Button, Table, TextInput, ModalHeader, ModalBody, TableHead, TableHeadCell, TableCell, TableBody, TableRow, ModalFooter, Pagination, Spinner } from "flowbite-react";
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
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  loading?: boolean;
  bpKeyword?: string
  onKeywordChange: (page: string) => void;
}

export function ChooseFromListModal<T = any>({
  open,
  onClose,
  onSelect,
  data,
  columns,
  title = "Choose Data",
  currentPage,
  totalPages,
  onPageChange,
  loading = false,
  onKeywordChange,
  bpKeyword
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
          value={bpKeyword}
          onChange={(e) => onKeywordChange(e.target.value)}
        />
        <div className="overflow-x-auto max-h-64 mt-4 min-h-[120px]">
          <Table hoverable>
            <TableHead>
              {columns.map((col) => (
                <TableHeadCell key={col.key}>{col.label}</TableHeadCell>
              ))}
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={columns.length}>
                    <div className="flex items-center justify-center min-h-[80px]">
                      <Spinner aria-label="Loading data..." size="xl" />
                    </div>
                  </TableCell>
                </TableRow>
              ) : filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={columns.length}>
                    <div className="text-center py-6 text-gray-400">Data tidak ditemukan.</div>
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((item, idx) => (
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
                ))
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex overflow-x-auto sm:justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
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
