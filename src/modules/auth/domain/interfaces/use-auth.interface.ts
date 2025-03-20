import { RecoverRequestDTO } from '../dto/recover-request.dto';
import { LoginRequestDTO } from '../dto/login-request.dto';
import { ResetRequestDTO } from '../dto/reset-request.dto';
import { IAuth } from './auth.interface';

export interface IUseAuth extends IAuth {
  login: (data: LoginRequestDTO) => Promise<void>;
  logout: () => Promise<void>;
  recover: (data: RecoverRequestDTO) => Promise<string>;
  reset: (data: ResetRequestDTO) => Promise<string>;
  confirm: any;
  loading: boolean;
  refreshUser: () => Promise<void>;
}
