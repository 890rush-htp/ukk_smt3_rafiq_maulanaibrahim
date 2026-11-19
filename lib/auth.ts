import { cookies } from "next/headers"
import { prisma } from "@/lib/prisma"
import { verifyUserJwt } from "@/lib/user-security"

export async function getAuthenticatedUser() {
  const cookieStore = await cookies()
  const token = cookieStore.get("auth_token")?.value
  
  if (!token) return null

  // Verifikasi JWT
  const payload = verifyUserJwt(token)
  if (!payload) return null

  const userId = Number(payload.sub)
  if (!Number.isSafeInteger(userId) || userId < 1) return null

  // Cek ke database apakah token masih valid
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, fullname: true, email: true, role: true, token: true },
  })

  if (!user || user.token !== token) return null

  const { token: _token, ...authenticatedUser } = user
  return authenticatedUser
}