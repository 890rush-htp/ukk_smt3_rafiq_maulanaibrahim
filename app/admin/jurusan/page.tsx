import { AddDataDialog } from "@/components/admin/add-data-dialog";
import { DataTable } from "@/components/admin/data-table";
import { PageHeader } from "@/components/admin/page-header";
import { majors } from "@/lib/mock-data";

export default function JurusanPage() {
  return (
    <div className="space-y-4">
      <PageHeader title="Kelola Jurusan">
        <AddDataDialog triggerLabel="Tambah Jurusan" title="Tambah Jurusan" />
      </PageHeader>

      <DataTable
        caption="Daftar jurusan yang tersedia."
        rows={majors}
        columns={[
          { key: "name", header: "Nama Jurusan", className: "font-medium" },
          { key: "description", header: "Deskripsi" },
        ]}
      />
    </div>
  );
}