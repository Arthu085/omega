import { Repository } from '@/core/http/repository';

import { ID, IPaginationResponse } from '@/shared/domain';
import { isArray } from '@/shared/utils';
import { ProductionListDTO } from '../domain/dto/production-list.dto';
//import { ProductionDTO } from '../domain/dto/production.dto';
import { ProductionEntity } from '../domain/entities/production.entity';
import { ProductionDTO } from '../domain/dto/production.dto';

export interface Cards {
  countAllAssets: number;
  countAllSubsetsCompany: number;
}

export class ProductionRepository extends Repository {
  static instance: ProductionRepository;

  constructor() {
    super('producoes');

    if (ProductionRepository.instance) {
      return ProductionRepository.instance;
    }

    ProductionRepository.instance = this;
  }

  public async get(): Promise<Cards> {
    const { status, data } = await this.http.get<Cards>('/cards');

    if (this.isOK(status)) {
      return data;
    }

    throw new Error('Ops, algo inesperado aconteceu!');
  }

  public async list(params: ProductionListDTO): Promise<IPaginationResponse<ProductionEntity>> {
    const { status, data: response } = await this.http.get<IPaginationResponse<ProductionEntity>>(
      '',
      {
        params: {
          ...params.filter,
          ...params.pagination,
        },
      },
    );

    if (this.isOK(status)) {
      const { pages, total, data } = response;

      return {
        pages: pages ?? 1,
        total: total ?? 0,
        data: isArray(data)
          ? data.map((item) => {
              return new ProductionEntity(item);
            })
          : ([] as Array<ProductionEntity>),
      };
    }

    throw new Error('Ops, algo inesperado aconteceu!');
  }

  public async create(record: ProductionDTO): Promise<ProductionEntity> {
    const { status, data } = await this.http.post<ProductionEntity, ProductionDTO>('/novo', record);

    if (this.isOK(status)) return new ProductionEntity(data);

    throw new Error('Ops, algo inesperado aconteceu!');
  }

  public async update(id: ID, record: ProductionDTO): Promise<ProductionEntity> {
    const { status, data } = await this.http.put<ProductionEntity, ProductionDTO>(`/${id}`, record);

    if (this.isOK(status)) return new ProductionEntity(data);

    throw new Error('Ops, algo inesperado aconteceu!');
  }

  public async getProductionById(id: ID): Promise<ProductionEntity> {
    const { status, data } = await this.http.get<ProductionEntity>(`/${id}`);

    if (this.isOK(status)) return new ProductionEntity(data);

    throw new Error('Ops, algo inesperado aconteceu!');
  }

  public async finalize(id: ID): Promise<ProductionEntity> {
    const { status, data } = await this.http.put<ProductionEntity, ProductionDTO>(
      `/finalizar/${id}`,
    );

    if (this.isOK(status)) return new ProductionEntity(data);

    throw new Error('Ops, algo inesperado aconteceu!');
  }
}
