import { NextResponse } from "next/server"
import { getAuthenticatedUser } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

type RouteContext = { params: Promise<{ id: string }> }

const unauthorized = () =>
  NextResponse.json({ error: "Silakan login untuk melanjutkan." }, { status: 401 })

function isMissingRecord(error: unknown) {
  return typeof error === "object" && error !== null && "code" in error && error.code === "P2025"
}

async function getCategoryId(context: RouteContext) {
  const { id } = await context.params
  const categoryId = Number(id)
  return Number.isInteger(categoryId) && categoryId > 0 ? categoryId : null
}

export async function GET(_request: Request, context: RouteContext) {
  if (!await getAuthenticatedUser()) return unauthorized()

  const categoryId = await getCategoryId(context)
  if (!categoryId) return NextResponse.json({ error: "ID kategori tidak valid." }, { status: 400 })

  try {
    const category = await prisma.category.findUnique({ where: { id: categoryId } })
    if (!category) return NextResponse.json({ error: "Kategori tidak ditemukan." }, { status: 404 })
    return NextResponse.json({ category })
  } catch (error) {
    console.error("Failed to fetch category:", error)
    return NextResponse.json({ error: "Gagal memuat data kategori." }, { status: 500 })
  }
}

export async function PATCH(request: Request, context: RouteContext) {
  if (!await getAuthenticatedUser()) return unauthorized()

  const categoryId = await getCategoryId(context)
  if (!categoryId) return NextResponse.json({ error: "ID kategori tidak valid." }, { status: 400 })

  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Format request tidak valid." }, { status: 400 })
  }

  const name = typeof body.name === "string" ? body.name.trim() : ""
  if (!name || name.length > 191) {
    return NextResponse.json({ error: "Nama kategori wajib diisi (maks. 191 karakter)." }, { status: 400 })
  }

  try {
    const category = await prisma.category.update({ where: { id: categoryId }, data: { name } })
    return NextResponse.json({ category })
  } catch (error) {
    if (isMissingRecord(error)) {
      return NextResponse.json({ error: "Kategori tidak ditemukan." }, { status: 404 })
    }
    console.error("Failed to update category:", error)
    return NextResponse.json({ error: "Gagal memperbarui kategori." }, { status: 500 })
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  if (!await getAuthenticatedUser()) return unauthorized()

  const categoryId = await getCategoryId(context)
  if (!categoryId) return NextResponse.json({ error: "ID kategori tidak valid." }, { status: 400 })

  try {
    await prisma.category.delete({ where: { id: categoryId } })
    return NextResponse.json({ success: true })
  } catch (error) {
    if (isMissingRecord(error)) {
      return NextResponse.json({ error: "Kategori tidak ditemukan." }, { status: 404 })
    }
    console.error("Failed to delete category:", error)
    return NextResponse.json({ error: "Gagal menghapus kategori." }, { status: 500 })
  }
}
