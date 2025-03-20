import { Ability } from '@/modules/role/domain';
import { EAbilityCodes } from '../domain/enums';

export function groupAbilityByReference(array: Array<Ability>) {
  return array.reduce((prev, current) => {
    (prev[current['code']] = prev[current['code']] ?? []).push(current);

    return prev;
  }, {} as Record<EAbilityCodes, Array<Ability>>);
}
