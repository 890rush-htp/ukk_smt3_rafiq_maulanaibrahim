import { redirect } from "next/navigation"; // 1. Tambahkan import redirect
import { getAuthenticatedUser } from "@/lib/auth"; // 2. Tambahkan import cek user
import { AdminShell } from "@/app/components/sidebar/admin-shell";
import { AdminUserProvider } from "@/components/admin/admin-user-provider";

// 3. WAJIB pakai async karena kita menunggu balasan dari database
export default async function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  
  // 4. Cek user SEBELUM menampilkan halaman
  const user = await getAuthenticatedUser()
  
  // 5. Jika tidak ada user (belum login), tendang ke halaman utama
  if (!user) {
    redirect("/") 
  }

  // 6. Jika ada user, tampilkan halaman admin beserta sidebar-nya
  return (
    <AdminUserProvider>
      <AdminShell>{children}</AdminShell>
    </AdminUserProvider>
  );
}