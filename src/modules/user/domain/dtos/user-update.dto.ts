import { UserCreateDTO } from './user-create.dto';

export interface UserUpdateDTO extends Partial<UserCreateDTO> {
  name?: string;
  email?: string;
  hash_password?: string;
  roleId?: number;
}
