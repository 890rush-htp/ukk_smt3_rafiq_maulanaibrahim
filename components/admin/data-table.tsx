import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export type DataTableColumn<T> = {
  /** Nama field pada data yang akan ditampilkan di kolom ini. */
  key: keyof T & string;
  header: string;
  className?: string;
};

type DataTableProps<T extends { id: string | number }> = {
  caption?: string;
  columns: DataTableColumn<T>[];
  rows: T[];
};

/** Tabel standar halaman admin: kartu putih + header kolom + baris data. */
export function DataTable<T extends { id: string | number }>({
  caption,
  columns,
  rows,
}: DataTableProps<T>) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <Table>
        {caption && <TableCaption>{caption}</TableCaption>}
        <TableHeader>
          <TableRow>
            {columns.map((col) => (
              <TableHead key={col.key}>{col.header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              {columns.map((col) => (
                <TableCell key={col.key} className={col.className}>
                  {String(row[col.key])}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
