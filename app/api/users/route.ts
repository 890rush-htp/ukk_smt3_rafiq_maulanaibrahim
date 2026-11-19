import { NextResponse } from "next/server"
import { getAuthenticatedUser } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { generateUserCode } from "@/lib/user-code"
import { isPrismaError, toUserDto, userSelect } from "@/lib/user-dto"
import { hashUserPassword } from "@/lib/user-security"

// Ambil baris terakhir dari error Prisma (biasanya penyebab intinya)
function errorMessage(error: unknown, fallback: string) {
  if (error instanceof Error) {
    const lines = error.message.split("\n").map((line) => line.trim()).filter(Boolean)
    return lines[lines.length - 1] ?? fallback
  }
  return fallback
}

export async function GET(request: Request) {
  try {
    if (!(await getAuthenticatedUser())) {
      return NextResponse.json({ error: "Tidak diizinkan." }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const page = Math.max(1, Number(searchParams.get("page") ?? 1) || 1)
    const pageSize = Math.min(100, Math.max(1, Number(searchParams.get("pageSize") ?? 10) || 10))

    const [users, totalUsers] = await Promise.all([
      prisma.user.findMany({
        select: userSelect,
        orderBy: { id: "asc" },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      prisma.user.count(),
    ])

    return NextResponse.json({
      users: users.map(toUserDto),
      pagination: { page, pageSize, totalUsers },
    })
  } catch (error) {
    console.error("[GET /api/users]", error)
    return NextResponse.json({ error: errorMessage(error, "Gagal memuat user.") }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    if (!(await getAuthenticatedUser())) {
      return NextResponse.json({ error: "Tidak diizinkan." }, { status: 401 })
    }

    const body = await request.json()
    if (!body.fullname || !body.email || !body.password) {
      return NextResponse.json({ error: "Nama, email, dan password wajib diisi." }, { status: 400 })
    }

    const role = body.role ? String(body.role) : "staff"

    const user = await prisma.user.create({
      data: {
        kode: await generateUserCode(role),
        fullname: String(body.fullname),
        email: String(body.email),
        password: await hashUserPassword(String(body.password)),
        role,
      },
      select: userSelect,
    })
    return NextResponse.json({ user: toUserDto(user) }, { status: 201 })
  } catch (error) {
    if (isPrismaError(error, "P2002")) {
      return NextResponse.json({ error: "Email sudah dipakai." }, { status: 409 })
    }
    console.error("[POST /api/users]", error)
    return NextResponse.json({ error: errorMessage(error, "Gagal menambah user.") }, { status: 500 })
  }
}