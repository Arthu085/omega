import { LoginRequestDTO } from '../dto/login-request.dto';
import { IAuth } from './auth.interface';

export interface IUseAuth extends IAuth {
  login: (data: LoginRequestDTO) => Promise<void>;
  logout(): Promise<void>;
  confirm: any;
  loading: boolean;
  refreshUser: () => Promise<void>;
}
