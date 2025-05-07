import { User } from '../../../user/domain/entities/userEntity';
import { EAuthAction } from '../enums/auth-action.enum';

export interface IAuthAction {
  type: EAuthAction;
  user?: User;
}
