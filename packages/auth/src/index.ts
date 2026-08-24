import {
  AbilityBuilder,
  createMongoAbility,
  type CreateAbility,
} from '@casl/ability'
import type { User } from './models/user'
import { permissions, type AppAbility } from './permissions'

export const createMongoAppAbility =
  createMongoAbility as CreateAbility<AppAbility>

export function defineAbilityFor(user: User): AppAbility {
  const builder = new AbilityBuilder<AppAbility>(createMongoAppAbility)

  if (typeof permissions[user.role] !== 'function') {
    throw new Error(`Permissão para ${user.role} não encontrada.`)
  }

  permissions[user.role](user, builder)

  const ability = builder.build()

  return ability
}
