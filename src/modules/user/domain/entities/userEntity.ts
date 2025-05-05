import { ERolesUser } from '../enums/user-roles';

export class User {
  id: number = 0;
  email: string = '';
  name: string = '';
  username: string = '';
  hash_password: string = '';

  role?: ERolesUser;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;

  constructor(partial: Partial<User>) {
    Object.assign(this, { ...partial });
  }
}
