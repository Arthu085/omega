import { EAbilityAction, EAbilityCodes } from '@/modules/role/domain';
import { Outlet } from 'react-router-dom';

interface Props {
  code: EAbilityCodes;
  action?: EAbilityAction;
}

export function RequiredAbility({ }: Props) {

  // const requiredBy = action
  //   ? (ability: Ability) => ability.code === reference && ability.action === action
  //   : (ability: Ability) => ability.code === reference;

  return <Outlet />;
}
