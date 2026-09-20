export const Role = {
  ADMIN: 'ADMIN',
  MEMBER: 'MEMBER',
  BILLING: 'BILLING',
} as const

export type Role = (typeof Role)[keyof typeof Role]
