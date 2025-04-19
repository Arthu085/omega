import { Repository } from '@/core/http/repository';
import { User } from '@/modules/user/domain';

import {
  LoginRequestDTO,
  ResetRequestDTO,
  LoginResponseDTO,
  RecoverRequestDTO,
  SignUpDTO,
} from '../domain';
import { ConfirmRequestDTO } from '../domain/dto/confirm-request.dto';

export class AuthRepository extends Repository {
  static instance: AuthRepository;

  constructor() {
    super('auth');

    if (AuthRepository.instance) {
      return AuthRepository.instance;
    }

    AuthRepository.instance = this;
  }

  public async login(login: LoginRequestDTO): Promise<LoginResponseDTO> {
    const { status, data } = await this.http.post<LoginResponseDTO, LoginRequestDTO>(
      '/login',
      login,
    );

    if (this.isOK(status)) {
      return data;
    }

    throw new Error('Ops, algo inesperado aconteceu!');
  }

  public async check(): Promise<User> {
    const { status, data } = await this.http.get<User>('/user');

    if (this.isOK(status)) {
      return new User(data);
    }

    throw new Error('Ops, algo inesperado aconteceu!');
  }

  public async signUp(record: SignUpDTO): Promise<void> {
    const { status } = await this.http.post<null, SignUpDTO>('/sign-up', record);

    if (this.isOK(status)) return;

    throw new Error('Ops, algo inesperado aconteceu!');
  }
  public async confirm(confirm: ConfirmRequestDTO): Promise<string> {
    const { status, data } = await this.http.patch<string, ConfirmRequestDTO>(
      '/validate-account',
      confirm,
    );

    if (this.isOK(status)) {
      return data;
    }

    throw new Error('Ops, algo inesperado aconteceu!');
  }
}
