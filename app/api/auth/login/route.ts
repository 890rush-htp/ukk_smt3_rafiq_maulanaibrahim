import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { createUserJwt, verifyUserPassword } from "@/lib/user-security"

export async function POST(request: Request) {
  const body = await request.json().catch(() => null)
  const email = String(body?.email ?? "").trim()
  const password = String(body?.password ?? "")
  console.log("[LOGIN] diterima:", { email, panjangPassword: password.length })

  if (!email || !password) {
    return NextResponse.json({ error: "Email dan password wajib diisi." }, { status: 400 })
  }

  const user = await prisma.user.findUnique({ where: { email } })
  console.log("[LOGIN] user ditemukan:", Boolean(user))

  const isValid = user ? await verifyUserPassword(password, user.password) : false
  console.log("[LOGIN] password cocok:", isValid)

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