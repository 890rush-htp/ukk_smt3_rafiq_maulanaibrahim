import { prisma } from "@/lib/prisma"

// Awalan kode per role: admin -> adm0001, staff -> stf0001
const PREFIX_BY_ROLE: Record<string, string> = {
  admin: "adm",
  staff: "stf",
}

export function getUserCodePrefix(role: string) {
  return PREFIX_BY_ROLE[role] ?? "usr"
}

// Ambil nomor terakhir dari awalan yang sama, lalu tambah 1 (adm0001, adm0002, ...)
export async function generateUserCode(role: string) {
  const prefix = getUserCodePrefix(role)

  const last = await prisma.user.findFirst({
    where: { kode: { startsWith: prefix } },
    orderBy: { kode: "desc" },
    select: { kode: true },
  })

  const lastNumber = last ? Number(last.kode.slice(prefix.length)) || 0 : 0
  return `${prefix}${String(lastNumber + 1).padStart(4, "0")}`
}
