import { Role } from '@/modules/role/domain/entities/role.entity';

export class User {
  id: number = 0;
  email: string = '';
  name: string = '';
  username: string = '';
  hash_password: string = '';

  role?: Role;
  role_id: number = 0;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;

  constructor(partial: Partial<User>) {
    Object.assign(this, { ...partial });
  }
}
