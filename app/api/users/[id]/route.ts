import { NextResponse } from "next/server"
import { getAuthenticatedUser } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { generateUserCode, getUserCodePrefix } from "@/lib/user-code"
import { isPrismaError, toUserDto, userSelect } from "@/lib/user-dto"
import { hashUserPassword } from "@/lib/user-security"

type Ctx = { params: Promise<{ id: string }> }

const unauthorized = () => NextResponse.json({ error: "Tidak diizinkan." }, { status: 401 })
const notFound = () => NextResponse.json({ error: "User tidak ditemukan." }, { status: 404 })

async function getId(ctx: Ctx) {
  const { id } = await ctx.params
  const userId = Number(id)
  return Number.isSafeInteger(userId) && userId > 0 ? userId : null
}

export async function GET(_req: Request, ctx: Ctx) {
  if (!(await getAuthenticatedUser())) return unauthorized()
  const id = await getId(ctx)
  if (!id) return notFound()

  const user = await prisma.user.findUnique({ where: { id }, select: userSelect })
  return user ? NextResponse.json({ user: toUserDto(user) }) : notFound()
}

export async function PATCH(request: Request, ctx: Ctx) {
  if (!(await getAuthenticatedUser())) return unauthorized()
  const id = await getId(ctx)
  if (!id) return notFound()

  const body = await request.json()

  const current = await prisma.user.findUnique({ where: { id }, select: { role: true } })
  if (!current) return notFound()

  // Kalau role berubah (admin <-> staff), kode ikut diganti sesuai awalan barunya
  const newRole = body.role ? String(body.role) : current.role
  const kodeBaru =
    getUserCodePrefix(newRole) !== getUserCodePrefix(current.role)
      ? await generateUserCode(newRole)
      : undefined

  try {
    const user = await prisma.user.update({
      where: { id },
      data: {
        ...(body.fullname ? { fullname: String(body.fullname) } : {}),
        ...(body.email ? { email: String(body.email) } : {}),
        ...(body.role ? { role: newRole } : {}),
        ...(kodeBaru ? { kode: kodeBaru } : {}),
        ...(body.password ? { password: await hashUserPassword(String(body.password)) } : {}),
      },
      select: userSelect,
    })
    return NextResponse.json({ user: toUserDto(user) })
  } catch (error) {
    if (isPrismaError(error, "P2025")) return notFound()
    if (isPrismaError(error, "P2002")) {
      return NextResponse.json({ error: "Email sudah dipakai." }, { status: 409 })
    }
    throw error
  }
}

export async function DELETE(_req: Request, ctx: Ctx) {
  if (!(await getAuthenticatedUser())) return unauthorized()
  const id = await getId(ctx)
  if (!id) return notFound()

  try {
    await prisma.user.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    if (isPrismaError(error, "P2025")) return notFound()
    throw error
  }
}
