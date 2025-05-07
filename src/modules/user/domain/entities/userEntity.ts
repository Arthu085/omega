import { ERolesUser } from '../enums/user-roles';
import { EStatusUser } from '../enums/user-status';

export class User {
  id: number = 0;
  email: string = '';
  name: string = '';
  lastname: string = '';
  password: string = '';

  status?: EStatusUser;
  role?: ERolesUser;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;

  constructor(partial: Partial<User>) {
    Object.assign(this, { ...partial });
  }
}
