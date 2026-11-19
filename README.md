This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# Catatan Masalah & Solusi: Project `ukk-smt4`

Project: Next.js 16 (Turbopack) + Prisma 7 + MySQL/MariaDB (XAMPP).
Folder project: `D:\ukk_smt4\ukk-smt4`
Database: `ukk_smt3_rafiq`
Akun admin: `admin@gmail.com` / `123456` (ganti sebelum project dipakai di server publik)




















<!-- 
# README: Project `ukk-smt4`

Panel admin Next.js 16 (Turbopack) + Prisma 7 + MySQL/MariaDB (XAMPP).

| Item | Nilai |
|---|---|
| Folder project | `D:\ukk_smt4\ukk-smt4` |
| Database | `db_ukksmt3_rafiq` (tabel `users`, `categories`, `jurusan`) |
| Akun admin | `admin@gmail.com` / `12345678` (kode `adm0001`) |
| Alamat lokal | http://localhost:3000 |

Dokumen ini berisi: **(A)** cara download/instal (npm & npx), **(B)** cara menjalankan, **(C)** semua masalah yang pernah muncul beserta solusinya, **(D)** checklist.

---

## A. Download & instal (npm / npx)

### A1. Yang harus ada dulu
- **Node.js** (LTS) dan **npm**. Cek: `node -v` dan `npm -v`
- **XAMPP** (MySQL/MariaDB) dan **VS Code**
- **Git** (kalau mau clone/push ke GitHub)

### A2. Ambil project
Dari GitHub:
```bat
git clone https://github.com/USERNAME/ukk-smt4.git
cd ukk-smt4
```
Atau dari zip: ekstrak, lalu buka terminal **di folder yang berisi `package.json`**.

> **Cek prompt terminal sebelum `npm install`.** Harus berakhiran `\ukk-smt4>`.
> Kalau dijalankan di folder induk (`D:\ukk_smt4>`), paketnya terpasang di tempat yang salah.

### A3. Instal semua paket project
```bat
npm install
```

### A4. Instal Prisma 7 (urutan ini)
```bat
npm install -D -E prisma@7.10.1
npm install -E @prisma/client@7.10.1 @prisma/adapter-mariadb@7.10.1 dotenv
```
- `-D` = devDependencies, `-E` = versi persis (tanpa `^`).
- Semua paket Prisma harus **versi yang sama (7.10.1)**.
- `dotenv` wajib karena Prisma 7 tidak membaca `.env` sendiri.
- Jangan pakai `prisma@latest` atau versi 8 RC.

Izinkan script instal Prisma (kalau npm memberi peringatan `allow-scripts`):
```bat
npm approve-scripts prisma
npm approve-scripts @prisma/engines
```

### A5. Perintah `npx` yang dipakai
| Perintah | Fungsi | Catatan |
|---|---|---|
| `npx prisma generate` | membuat Prisma Client (`src/generated/prisma`) | wajib setelah `schema.prisma` berubah, dan setelah clone/instal baru |
| `npx prisma db pull` | membaca tabel dari database ke `schema.prisma` | pakai kalau tabel sudah ada |
| `npx prisma db push` | membuat/mengubah tabel dari `schema.prisma` | **jangan** dipakai kalau tabel sudah dibuat dari SQL |
| `npx prisma studio` | melihat data di browser | opsional |

### A6. Buat file `.env` (di root, sejajar `package.json`)
```
DATABASE_URL="mysql://root:@127.0.0.1:3306/db_ukksmt3_rafiq"
JWT_SECRET="isi-dengan-string-acak-yang-panjang"
```
Buat `JWT_SECRET` acak:
```bat
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```
Kalau MySQL pakai password: `mysql://root:PASSWORD@127.0.0.1:3306/...` (karakter khusus ditulis URL-encoded, mis. `@` jadi `%40`).
Setelah mengubah `.env`, **hentikan lalu jalankan ulang** `npm run dev`.

### A7. Siapkan database
1. Nyalakan **MySQL** di XAMPP Control Panel (tombol **Start** sampai hijau).
2. phpMyAdmin → tab **Import** → pilih `db_ukksmt3_rafiq.sql` → **Go**.
   File itu sudah membuat database, tabel `users`, `categories`, `jurusan`, dan akun admin `adm0001`.
3. Jangan jalankan `prisma db push` setelah import.

### A8. Generate dan jalankan
```bat
npx prisma generate
npm run dev
```
Buka http://localhost:3000 lalu login `admin@gmail.com` / `12345678`.

Perintah npm lain: `npm run build` (build produksi), `npm run start` (jalankan hasil build), `npm run lint`.

---

## B. Cara jalan sehari-hari
1. Nyalakan MySQL di XAMPP.
2. Buka terminal di `D:\ukk_smt4\ukk-smt4` (cek prompt).
3. `npm run dev`
4. Hentikan server: `Ctrl + C` (kalau muncul `Terminate batch job (Y/N)?` ketik `y`).
5. Kalau tampilan/route aneh setelah banyak edit: hentikan server, jalankan `rmdir /s /q .next`, lalu `npm run dev`.

---

## C. Masalah & solusi

### C1. Sidebar tidak muncul
**Penyebab:** `AdminShell` (berisi Sidebar + Header) tidak dipakai di mana pun. Tidak ada `app/admin/layout.tsx`.
**Solusi:** buat `app/admin/layout.tsx`. `AdminUserProvider` harus membungkus `AdminShell` (Header memakai `useAdminUser()`).
```tsx
import type { ReactNode } from "react";
import { AdminShell } from "@/app/components/sidebar/admin-shell";
import { AdminUserProvider } from "@/components/admin/admin-user-provider";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <AdminUserProvider>
      <AdminShell>{children}</AdminShell>
    </AdminUserProvider>
  );
}
```
Menu yang masih bermasalah kalau halamannya belum dibuat: `/admin` (butuh `app/admin/page.tsx`), `categories` (file 0 byte), `jurusan` (folder kosong), `profile` (belum ada).

### C2. Build error `lib/prisma.ts` ("Expected ';', '}' or <eof>")
**Penyebab:** file setengah ter-comment (baris `new PrismaMariaDb({` di-comment tapi isinya tidak).
**Solusi:** comment semua atau aktifkan semua. Versi aktif:
```ts
import { PrismaMariaDb } from "@prisma/adapter-mariadb"
import { PrismaClient } from "@/src/generated/prisma/client"

const databaseUrl = process.env.DATABASE_URL
if (!databaseUrl) {
  throw new Error("DATABASE_URL belum diatur di file .env")
}

const url = new URL(databaseUrl)

const adapter = new PrismaMariaDb({
  host: url.hostname,
  port: Number(url.port || 3306),
  user: decodeURIComponent(url.username),
  password: decodeURIComponent(url.password),
  database: decodeURIComponent(url.pathname.slice(1)),
  connectionLimit: 5,
})

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient }
export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter })
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma
}
```
Kalau database dimatikan sementara: comment semua baris itu + tambah `export {}`, dan buat `getAuthenticatedUser()` mengembalikan user contoh.

### C3. Prisma versi 8 RC
**Penyebab:** `package.json` berisi `"prisma": "^8.0.0-rc..."` (release candidate).
**Solusi:** pasang 7.10.1 (lihat A4).

### C4. `npm install` di folder yang salah
**Gejala:** hasil instal cuma ±136 paket, prompt `D:\ukk_smt4>` (tanpa `\ukk-smt4`).
**Solusi:**
```bat
cd D:\ukk_smt4
rmdir /s /q node_modules
del package.json package-lock.json
cd ukk-smt4
npm install -D -E prisma@7.10.1
npm install -E @prisma/client@7.10.1 @prisma/adapter-mariadb@7.10.1 dotenv
```

### C5. `Unexpected token '<' ... is not valid JSON`
**Penyebab:** halaman memanggil `fetch("/api/users")`, tapi route API tidak ada, jadi yang kembali HTML 404.
**Solusi:** buat `app/api/users/route.ts` dan `app/api/users/[id]/route.ts` (CRUD user dengan Prisma, lihat paket `kode-user.zip` / file `route.ts`).

### C6. Build error `add-data-dialog.tsx` ("Expected '}', got '<eof>'")
**Penyebab:** fungsi `AddDataDialog` kurang `}` penutup.
**Solusi:** tambah `}` di baris paling bawah setelah `);`.

### C7. Login selalu "Email atau password salah"
Langkah pencarian: tambah log sementara di `app/api/auth/login/route.ts`:
```ts
console.log("[LOGIN] user ditemukan:", Boolean(user))
console.log("[LOGIN] password cocok:", isValid)
```
| Status di terminal | Arti |
|---|---|
| `401` | kode jalan, akun ditolak |
| `404` | file route tidak ada di path itu |
| `500` | error Prisma / `JWT_SECRET` / koneksi DB |

**Penyebab yang ditemukan:** `schema.prisma` memetakan model `User` ke tabel **`users`** (`@@map("users")`), sedangkan akun admin dibuat di tabel **`tbl_users`**. Prisma membaca tabel yang kosong (`user ditemukan: false`).
**Solusi:** isi akun ke tabel `users`. Password harus berupa hash `scrypt:salt:digest`, bukan teks biasa (lihat C16 untuk membuat hash).

Error phpMyAdmin saat itu:
| Error | Penyebab | Solusi |
|---|---|---|
| `#1064 ... near '5 VALUES'` | ada angka nyasar di antara `)` dan `VALUES` | hapus isi kotak SQL, tempel ulang, atau pakai tab **Import** |
| `#1062 Duplicate entry 'admin@gmail.com'` | baris sudah ada | pakai `UPDATE`, bukan `INSERT` |

Route login yang benar (pakai `verifyUserPassword`, bukan membandingkan teks biasa):
```ts
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { createUserJwt, verifyUserPassword } from "@/lib/user-security"

export async function POST(request: Request) {
  const body = await request.json().catch(() => null)
  const email = String(body?.email ?? "").trim()
  const password = String(body?.password ?? "")

  if (!email || !password) {
    return NextResponse.json({ error: "Email dan password wajib diisi." }, { status: 400 })
  }

  const user = await prisma.user.findUnique({ where: { email } })
  const isValid = user ? await verifyUserPassword(password, user.password) : false

  if (!user || !isValid) {
    return NextResponse.json({ error: "Email atau password salah." }, { status: 401 })
  }

  const token = createUserJwt({ id: user.id, email: user.email, role: user.role })
  await prisma.user.update({ where: { id: user.id }, data: { token } })

  const response = NextResponse.json({ success: true })
  response.cookies.set("auth_token", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24,
  })
  return response
}
```
Setelah beres, hapus semua `console.log("[LOGIN] ...")`.

### C8. Error `cookies()` / Cache Components dan `next.config` rusak
**Gejala:** `Route "/admin": ... runtime data during prerendering`, dan terminal menulis `Cache Components enabled`.
**Penyebab:** mode Cache Components mewajibkan `cookies()` dibungkus `<Suspense>`.
**Solusi:** matikan `cacheComponents` dan `partialPrefetching`.

Kalau `next.config.ts` rusak ("Unexpected token '}'" atau "Cannot find name 'NextConfig'"), ganti dengan `next.config.mjs` (hapus `next.config.ts` supaya tidak ada dua config):
```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
```
```bat
del next.config.ts
rmdir /s /q .next
npm run dev
```

### C9. Logout + dropdown avatar
**Penyebab tidak bisa logout:** tidak ada route logout dan tombolnya.
**Route** `app/api/auth/logout/route.ts`:
```ts
import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { verifyUserJwt } from "@/lib/user-security"

export async function POST() {
  const cookieStore = await cookies()
  const token = cookieStore.get("auth_token")?.value

  if (token) {
    const payload = verifyUserJwt(token)
    const userId = Number(payload?.sub)
    if (Number.isSafeInteger(userId) && userId > 0) {
      await prisma.user.updateMany({ where: { id: userId, token }, data: { token: null } })
    }
  }

  const response = NextResponse.json({ success: true })
  response.cookies.set("auth_token", "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  })
  return response
}
```
**Tombol:** di `app/components/navigation-menu/header.tsx`, avatar dibuat dropdown berisi Profile dan Keluar. Inti handler:
```tsx
async function handleLogout() {
  setIsLoggingOut(true);
  try {
    await fetch("/api/auth/logout", { method: "POST" });
  } finally {
    router.push("/");
    router.refresh();
  }
}
```
**Error `Base UI: MenuGroupContext is missing`:** `dropdown-menu.tsx` memakai Base UI. Perbaikan:
- Bungkus `DropdownMenuLabel` dengan `<DropdownMenuGroup>...</DropdownMenuGroup>` (tambah `DropdownMenuGroup` ke import).
- Ganti `onSelect` menjadi `onClick` di semua `DropdownMenuItem`.

### C10. `P2039 pool failed to retrieve a connection` dan warning font Geist
- **P2039 (login `500`):** MySQL belum menyala atau belum siap. Nyalakan MySQL di XAMPP **sebelum** `npm run dev`. Boleh tambah `connectTimeout: 10000, acquireTimeout: 15000` di adapter (hapus kalau TypeScript menolak).
- **`Failed to download Geist from Google Fonts`:** hanya warning karena internet timeout (membuat halaman pertama lambat). Hapus import `Geist` dari `app/layout.tsx` kalau tidak dibutuhkan.

### C11. Hydration mismatch (`/admin/category` vs `/admin/categories`)
**Penyebab:** cache `.next` tidak sinkron dengan `lib/admin-menu.ts` yang baru diubah.
**Solusi:** hentikan server, `rmdir /s /q .next`, `npm run dev`.

### C12. Judul tab "Profile Company" dan ikon tab
Ubah `title` di `metadata` pada `app/layout.tsx`:
```tsx
export const metadata: Metadata = {
  title: "ukk-smt4",
  description: "Panel admin ukk-smt4",
};
```
Ikon tab: ganti `app/favicon.ico`. Refresh dengan `Ctrl + F5`.

### C13. Kode user `adm0001` / `stf0001` (menggantikan nomor urut)
Setiap user punya kolom `kode`: admin = `adm0001`, `adm0002`, ...; staff = `stf0001`, ... Dibuat otomatis saat user ditambah; kalau role diubah, kode ikut berganti. ID angka tetap dipakai untuk edit, hapus, dan login.

1. Model `User` di `prisma/schema.prisma`:
```prisma
model User {
  id        Int      @id @default(autoincrement())
  kode      String   @unique @db.VarChar(10)
  fullname  String
  email     String   @unique
  password  String
  role      String   @default("staff")
  token     String?  @db.Text
  createdAt DateTime @default(now()) @map("created_at")
  updatedAt DateTime @updatedAt @map("updated_at")

  @@map("users")
}
```
2. File: `lib/user-code.ts` (baru), `lib/user-dto.ts`, `app/api/users/route.ts`, `app/api/users/[id]/route.ts`, `app/admin/user-management/page.tsx` (paket `kode-user.zip`).
3. Database yang sudah berisi data, jalankan di tab **SQL**:
```sql
ALTER TABLE users ADD COLUMN kode VARCHAR(10) NULL AFTER id;

UPDATE users u
JOIN (
  SELECT id,
         CONCAT(IF(role = 'admin', 'adm', 'stf'),
                LPAD(ROW_NUMBER() OVER (PARTITION BY role ORDER BY id), 4, '0')) AS kode
  FROM users
) x ON x.id = u.id
SET u.kode = x.kode;

ALTER TABLE users
  MODIFY kode VARCHAR(10) NOT NULL,
  ADD UNIQUE KEY users_kode_key (kode);
```
4. `npx prisma generate`, lalu restart `npm run dev`.

### C14. Tabel `profile_company` ikut terbuat di project ukk
**Penyebab:** `schema.prisma` memuat model `ProfileCompany` milik project profile-company.
**Solusi:**
```sql
DROP TABLE IF EXISTS profile_company;
```
Lalu hapus blok `model ProfileCompany { ... }` dari `schema.prisma` dan jalankan `npx prisma generate`.

### C15. "Unexpected end of JSON input", "Gagal memuat user", dan error kolom `kode`
**Arti:** server menjawab error `500` dengan isi kosong, jadi `response.json()` gagal.
**Rapikan pesan** (ada di `user-management/page.tsx` 2 tempat dan `form/user-form.tsx` 2 tempat):
```tsx
const result = await response.json().catch(() => ({}))
```
**Tampilkan error asli:** bungkus `GET`/`POST` di `app/api/users/route.ts` dengan `try/catch` (file `route.ts` dari paket).

| Pesan | Penyebab | Solusi |
|---|---|---|
| `Unknown field kode for select statement on model User` | `schema.prisma` belum punya `kode`, atau belum `generate` | tambah baris `kode`, `npx prisma generate`, restart |
| `column users.kode does not exist` (P2022) | tabel `users` belum punya kolom `kode` | jalankan SQL di C13 |
| `table users does not exist` (P2021) | database belum di-import / `.env` menunjuk database lain | import SQL, cek `DATABASE_URL`, restart |
| `P2039` / pool | MySQL belum menyala | nyalakan MySQL di XAMPP |
| `Module not found @/lib/user-code` | `lib/user-code.ts` belum ada | ekstrak `kode-user.zip` ke root |

Urutan aman setelah mengubah schema: **nyalakan MySQL, jalankan SQL, `npx prisma generate`, restart server.**

### C16. Menambah user tanpa login
`POST /api/users` menolak (401) kalau belum login. Dua cara:

**Lewat database.** Buat `hash.js` di root:
```js
const { randomBytes, scryptSync } = require("node:crypto")
const password = process.argv[2]
if (!password) { console.log("Pemakaian: node hash.js passwordnya"); process.exit(1) }
const salt = randomBytes(16)
console.log(`scrypt:${salt.toString("hex")}:${scryptSync(password, salt, 64).toString("hex")}`)
```
```bat
node hash.js passwordBaru123
```
Lalu di tab SQL:
```sql
INSERT INTO users (kode, fullname, email, password, role, created_at, updated_at)
VALUES ('stf0002', 'Nama User', 'user@gmail.com', 'HASIL_HASH_JS', 'staff', NOW(3), NOW(3));
```
Kolom `updated_at` dan `kode` wajib diisi manual di SQL. Untuk mengganti password admin: `UPDATE users SET password = '...', token = NULL, updated_at = NOW(3) WHERE email = 'admin@gmail.com';`

**Lewat route register** (`app/api/auth/register/route.ts`): kunci `role` ke `staff`, hash password dengan `hashUserPassword`, dan isi `kode` dengan `generateUserCode("staff")`. Siapa pun bisa membuat akun lewat route ini, jadi hapus kalau project dipublikasikan.

### C17. Arti kolom "JWT" di tabel user
Hanya penanda sesi login:
- **Tersimpan** = user sedang punya sesi aktif (token ada di database).
- **Belum ada** = user belum pernah login, atau sudah logout.
Token dibuat saat login (bukan saat user ditambah), dan dikosongkan saat logout.

### C18. Push semua file ke GitHub (supaya bisa `git clone`)
1. `.gitignore`: biarkan `/node_modules`, `/.next/`; hapus `/src/generated`; supaya `.env` ikut terkirim:
```
.env*
!.env
```
2. Buat repo kosong di github.com (tanpa README/.gitignore). Taruh `db_ukksmt3_rafiq.sql` di folder `database/`.
3. Di folder project:
```bat
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/USERNAME/ukk-smt4.git
git push -u origin main
```
4. Cek `.env` ikut: `git ls-files .env`
5. Update berikutnya: `git add .` → `git commit -m "pesan"` → `git push`

Masalah umum: `Author identity unknown` → `git config --global user.name "Nama"` dan `git config --global user.email "email@github.com"`. `remote origin already exists` → `git remote set-url origin URL`.

> **Jadikan repo Private** kalau `.env` ikut terkirim. Di repo Public, siapa pun bisa membaca `JWT_SECRET` dan `DATABASE_URL`. Kalau pernah Public, buat `JWT_SECRET` baru.

Yang clone: `git clone` → `npm install` → import SQL → `npx prisma generate` → `npm run dev`.

### C19. Peringatan yang aman diabaikan
| Peringatan | Tindakan |
|---|---|
| `GET /img/logo-mvp.jpg 404` | taruh logo di `public/img/logo-mvp.jpg` (hanya logo sidebar yang kosong) |
| `20 vulnerabilities` saat `npm install` | jangan `npm audit fix --force` (bisa merusak versi paket) |
| `Slow filesystem detected` | info kecepatan disk saja |
| `allow-scripts ... prisma` | `npm approve-scripts prisma` dan `npm approve-scripts @prisma/engines` |

---

## D. Struktur file penting
```
ukk-smt4/
├─ .env                         (DATABASE_URL, JWT_SECRET)
├─ next.config.mjs
├─ prisma.config.ts
├─ prisma/schema.prisma         (User -> "users", Category, Jurusan)
├─ src/generated/prisma/        (hasil npx prisma generate)
├─ database/db_ukksmt3_rafiq.sql
├─ lib/
│  ├─ prisma.ts, auth.ts, user-security.ts, user-dto.ts, user-code.ts
└─ app/
   ├─ layout.tsx                (judul tab)
   ├─ admin/layout.tsx          (AdminUserProvider + AdminShell)
   ├─ admin/user-management/    (page.tsx, form/)
   ├─ components/navigation-menu/header.tsx   (dropdown avatar + Keluar)
   └─ api/
      ├─ auth/login/route.ts, auth/logout/route.ts
      └─ users/route.ts, users/[id]/route.ts
```

### Isi `prisma.config.ts`
```ts
import "dotenv/config"
import { defineConfig, env } from "prisma/config"

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: { path: "prisma/migrations" },
  datasource: { url: env("DATABASE_URL") },
})
```

## E. Checklist
- [ ] MySQL XAMPP menyala sebelum `npm run dev`
- [ ] `.env` ada dan `DATABASE_URL` menunjuk `db_ukksmt3_rafiq`
- [ ] `schema.prisma` punya `kode`, tidak ada `ProfileCompany`
- [ ] Tabel `users` punya kolom `kode`; tabel `profile_company` sudah dihapus
- [ ] `npx prisma generate` sudah dijalankan setelah schema berubah
- [ ] `console.log("[LOGIN] ...")` sudah dihapus dari route login
- [ ] `lib/mock-users.ts` dan tabel `tbl_users` lama sudah dihapus (kalau masih ada)
- [ ] Logo ada di `public/img/logo-mvp.jpg`
- [ ] Repo GitHub **Private** kalau `.env` ikut terkirim
- [ ] Ganti password admin sebelum project dipublikasikan

## F. Shortcut VS Code
| Aksi | Windows |
|---|---|
| Comment / uncomment baris | `Ctrl + /` |
| Comment blok `/* ... */` | `Shift + Alt + A` |
| Cari di semua file | `Ctrl + Shift + F` |
| Sembunyikan sidebar VS Code | `Ctrl + B` |

## G. Kalau ada error baru
Kirim: (1) pesan error lengkap dari terminal mulai baris `Error:` atau `⨯`, (2) path file yang disebut, (3) isi file itu. -->