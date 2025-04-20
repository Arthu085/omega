import { Repository } from '@/core/http/repository';

import { ID, IPaginationResponse } from '@/shared/domain';
import { isArray } from '@/shared/utils';
import { FornosListDTO } from '../domain/dto/fornos-list.dto';
import { FornosDto } from '../domain/dto/fornos.dto';
import { FurnaceEntity } from '../domain/entities/furnace.entity';

export class FurnaceRepository extends Repository {
  static instance: FurnaceRepository;

  constructor() {
    super('fornos');

    if (FurnaceRepository.instance) {
      return FurnaceRepository.instance;
    }

    FurnaceRepository.instance = this;
  }

  public async list(params: FornosListDTO): Promise<IPaginationResponse<FurnaceEntity>> {
    const { status, data: response } = await this.http.get<IPaginationResponse<FurnaceEntity>>('', {
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
        data: isArray(data)
          ? data.map((item) => {
              return new FurnaceEntity(item);
            })
          : ([] as Array<FurnaceEntity>),
      };
    }

    throw new Error('Ops, algo inesperado aconteceu!');
  }

  //   public async get(id: ID): Promise<User> {
  //     const { status, data } = await this.http.get<User>(`/${id}`);

  //     if (this.isOK(status)) return new User(data);

  //     throw new Error('Ops, algo inesperado aconteceu!');
  //   }

  public async create(record: FornosDto): Promise<FurnaceEntity> {
    const { status, data } = await this.http.post<FurnaceEntity, FornosDto>('/create', record);

    if (this.isOK(status)) return new FurnaceEntity(data);

    throw new Error('Ops, algo inesperado aconteceu!');
  }

  public async update(id: ID, record: FornosDto): Promise<FurnaceEntity> {
    const { status, data } = await this.http.put<FurnaceEntity, FornosDto>(`/update/${id}`, record);

    if (this.isOK(status)) return new FurnaceEntity(data);

    throw new Error('Ops, algo inesperado aconteceu!');
  }

  // public async updateStatus(id: ID, record: EStatus): Promise<void> {
  //   const { status } = await this.http.patch(`/${id}`, { status: record });

  //   if (this.isOK(status)) return;

  //   throw new Error('Ops, algo inesperado aconteceu!');
  // }

  // public async delete(id: ID): Promise<void> {
  //   const { status } = await this.http.delete(`/${id}`);

  //   if (this.isOK(status)) return;

  //   throw new Error('Ops, algo inesperado aconteceu!');
  // }

  //   public async updateItself(dto: UserUpdateSelfDto): Promise<User> {
  //     const { status, data: response } = await this.http.put<User, UserUpdateSelfDto>(`/self`, dto);

  //     if (this.isOK(status)) return new User(response);

  //     throw new Error('Ops, algo inesperado aconteceu!');
  //   }

  //   public async saveAvatar(form: FormData): Promise<string> {
  //     const { status, data } = await this.http.post<string, FormData>(`/avatar`, form);

  //     if (this.isOK(status)) return data;

  //     throw new Error('Ops, algo inesperado aconteceu!');
  //   }
}
