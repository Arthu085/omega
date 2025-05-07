import { Repository } from '@/core/http/repository';

import { isArray } from '@/shared/utils';
import { EStatus, ID, IPaginationResponse } from '@/shared/domain';

import { User, UserCreateDTO, UserListDTO, UserUpdateDTO } from '../domain';
import { UserUpdateSelfDto } from '../domain/dtos/user-update-self.dto';

export class UserRepository extends Repository {
  static instance: UserRepository;

  constructor() {
    super('users');

    if (UserRepository.instance) {
      return UserRepository.instance;
    }

    UserRepository.instance = this;
  }

  public async list(params: UserListDTO): Promise<IPaginationResponse<User>> {
    const { status, data: response } = await this.http.get<IPaginationResponse<User>>('', {
      params: {
        ...params.filter,
        ...params.pagination,
      },
    });

    if (this.isOK(status)) {
      const { pages, total, data } = response;

      return {
        pages: pages ?? 1,
        total: total ?? 0,
        data: isArray(data) ? data.map((item) => new User(item)) : ([] as Array<User>),
      };
    }

    throw new Error('Ops, algo inesperado aconteceu!');
  }

  public async get(id: ID): Promise<User> {
    const { status, data } = await this.http.get<User>(`/${id}`);

    if (this.isOK(status)) return new User(data);

    throw new Error('Ops, algo inesperado aconteceu!');
  }

  public async create(record: UserCreateDTO): Promise<User> {
    const { status, data } = await this.http.post<User, UserCreateDTO>('', record);

    if (this.isOK(status)) return new User(data);

    throw new Error('Ops, algo inesperado aconteceu!');
  }

  public async update(id: ID, record: UserUpdateDTO): Promise<User> {
    const { status, data } = await this.http.patch<User, UserUpdateDTO>(`/${id}`, record);

    if (this.isOK(status)) return new User(data);

    throw new Error('Ops, algo inesperado aconteceu!');
  }

  public async updateStatus(id: ID, record: EStatus): Promise<void> {
    const { status } = await this.http.patch(`/${id}`, { status: record });

    if (this.isOK(status)) return;

    throw new Error('Ops, algo inesperado aconteceu!');
  }

  public async delete(id: ID): Promise<void> {
    const { status } = await this.http.delete(`/${id}`);

    if (this.isOK(status)) return;

    throw new Error('Ops, algo inesperado aconteceu!');
  }

  public async updateItself(dto: UserUpdateSelfDto): Promise<User> {
    const { status, data: response } = await this.http.put<User, UserUpdateSelfDto>(`/self`, dto);

    if (this.isOK(status)) return new User(response);

    throw new Error('Ops, algo inesperado aconteceu!');
  }

  public async saveAvatar(form: FormData): Promise<string> {
    const { status, data } = await this.http.post<string, FormData>(`/avatar`, form);

    if (this.isOK(status)) return data;

    throw new Error('Ops, algo inesperado aconteceu!');
  }



}
