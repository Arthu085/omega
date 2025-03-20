import { Repository } from '@/core/http/repository';

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
}
