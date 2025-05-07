import { EStatusUser } from '../enums/user-status';
import { UserCreateDTO } from './user-create.dto';

export interface UserUpdateDTO extends Partial<UserCreateDTO> {
  nome?: string;
  sobrenome?: string,
  status?: EStatusUser;
  email?: string,
  senha?: string
  role?: string
}
