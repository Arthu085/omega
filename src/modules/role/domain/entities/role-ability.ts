import { Ability } from '@/modules/role/domain';

export class RoleAbility implements RoleAbility {
  id: number = 0;
  roleId: number = 0;
  abilityId: number = 0;
  ability?: Ability;

  public constructor(partial: Partial<RoleAbility>) {
    Object.assign(this, partial);
  }
}