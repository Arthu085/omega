import { EAbilityAction } from "../enums";
import { EAbilityCodes } from './../enums/ability-code.enum';

export class Ability {
  id: number = 0;
  name: string = '';
  code: EAbilityCodes = EAbilityCodes.DEVICE;
  action: EAbilityAction = EAbilityAction.READ;
  description?: string;

  public constructor(partial: Partial<Ability>) {
    Object.assign(this, { ...partial })
  }
}