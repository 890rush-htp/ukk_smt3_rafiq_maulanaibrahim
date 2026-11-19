export const userSelect = {
  id: true,
  fullname: true,
  email: true,
  role: true,
  token: true,
  createdAt: true,
} as const

type UserRow = {
  id: number
  fullname: string
  email: string
  role: string
  token: string | null
  createdAt: Date
}

// Bentuk data yang dibaca halaman user-management (token tidak pernah dikirim ke browser)
export function toUserDto(user: UserRow) {
  const { token, ...rest } = user
  return { ...rest, hasToken: Boolean(token), createdAt: user.createdAt.toISOString() }
}

export function isPrismaError(error: unknown, code: string) {
  return typeof error === "object" && error !== null && (error as { code?: string }).code === code
}