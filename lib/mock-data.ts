// Data contoh sementara untuk halaman admin.
// Ganti dengan query Prisma saat database sudah siap.

export type User = { id: number; name: string; email: string; role: string };
export type Category = { id: number; name: string; slug: string };
export type Jurusan = { id: string; name: string; head: string };
export type Article = {
  id: number;
  title: string;
  category: string;
  publishedAt: string;
};

export const users: User[] = [
  { id: 1, name: "Admin Utama", email: "admin@mvpars.sch.id", role: "Super Admin" },
];

export const jurusan: Jurusan[] = [
  { id: "JUR001", name: "Rekayasa Perangkat Lunak (RPL)", head: "Ahmad Fauzi, S.T." },
  { id: "JUR002", name: "Teknik Komputer & Jaringan (TKJ)", head: "Budi Santoso, M.Kom." },
];

export const articles: Article[] = [
  {
    id: 1,
    title: "Pendaftaran Siswa Baru 2026/2027 Dibuka",
    category: "Pengumuman",
    publishedAt: "05 Okt 2026",
  },
];
export const majors = [
  {
    id: 1,
    name: "Teknik Komputer dan Jaringan",
    description: "Jaringan komputer, server, dan administrasi sistem.",
  },
  {
    id: 2,
    name: "Rekayasa Perangkat Lunak",
    description: "Pemrograman, pengembangan aplikasi web dan mobile.",
  },
  {
    id: 3,
    name: "Akuntansi",
    description: "Pembukuan, perpajakan, dan laporan keuangan.",
  },
];export const categories = [
  { id: 1, name: "Pengumuman" },
  { id: 2, name: "Berita" },
  { id: 3, name: "Kegiatan" },
];