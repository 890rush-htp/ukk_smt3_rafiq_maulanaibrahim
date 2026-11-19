import { AddDataDialog } from "@/components/admin/add-data-dialog";
import { DataTable } from "@/components/admin/data-table";
import { PageHeader } from "@/components/admin/page-header";
import { articles } from "@/lib/mock-data";

export default function ArticlePage() {
  return (
    <div className="space-y-4">
      <PageHeader title="Kelola Article">
        <AddDataDialog triggerLabel="Tambah Article" title="Tambah Article" />
      </PageHeader>

      <DataTable
        caption="Daftar artikel dan pengumuman publikasi."
        rows={articles}
        columns={[
          { key: "title", header: "Judul Artikel", className: "font-medium" },
          { key: "category", header: "Kategori" },
          { key: "publishedAt", header: "Tanggal Publish" },
        ]}
      />
    </div>
  );
}