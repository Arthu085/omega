import { User } from '@/modules/user/domain/entities/userEntity';
export interface IAuth {
  authenticated: boolean;
  user: User | null;
}
