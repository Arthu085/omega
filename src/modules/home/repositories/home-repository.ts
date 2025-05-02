import { Repository } from '@/core/http/repository';

import { IPaginationResponse } from '@/shared/domain';
import { isArray } from '@/shared/utils';
import { ProductionListDTO } from '../domain/dto/production-list.dto';
//import { ProductionDTO } from '../domain/dto/production.dto';
import { ProductionEntity } from '../domain/entities/production.entity';

export interface Cards {
  countAllAssets: number;
  countAllSubsetsCompany: number;
}

export class HomeRepository extends Repository {
  static instance: HomeRepository;

  constructor() {
    super('home');

    if (HomeRepository.instance) {
      return HomeRepository.instance;
    }

    HomeRepository.instance = this;
  }

  public async get(): Promise<Cards> {
    const { status, data } = await this.http.get<Cards>('/cards');

    if (this.isOK(status)) {
      return data;
    }

    throw new Error('Ops, algo inesperado aconteceu!');
  }

  public async list(params: ProductionListDTO): Promise<IPaginationResponse<ProductionEntity>> {
    const { status, data: response } = await this.http.get<IPaginationResponse<ProductionEntity>>('', {
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
              return new ProductionEntity(item);
            })
          : ([] as Array<ProductionEntity>),
      };
    }

    throw new Error('Ops, algo inesperado aconteceu!');
  }

}

  
