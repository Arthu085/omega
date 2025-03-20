import { Ability } from '../domain';
import { EAbilityCodes, EAbilityAction } from '../domain/enums';

interface ActionsByReferenceResponse {
  canCreate: boolean;
  canRead: boolean;
  canUpdate: boolean;
  canDelete: boolean;
}

export function getAbilityActionsByReference(
  allAbilities: Array<Ability>,
  abilityCode: EAbilityCodes,
): ActionsByReferenceResponse {
  const abilities = allAbilities.filter((ability) => ability.code === abilityCode);

  return {
    canCreate: abilities.some(({ action }) => action === EAbilityAction.CREATE),
    canRead: abilities.some(({ action }) => action === EAbilityAction.READ),
    canUpdate: abilities.some(({ action }) => action === EAbilityAction.UPDATE),
    canDelete: abilities.some(({ action }) => action === EAbilityAction.DELETE),
  };
}
