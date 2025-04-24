import { Repository } from '@/core/http/repository';

import { ID, IPaginationResponse } from '@/shared/domain';
import { isArray } from '@/shared/utils';
import { FuncionariosListDTO } from '../domain/dto/funcionarios-list.dto';
import { CadastroFuncionarioEntity } from '../domain/entities/cadastro-funcionario.entity';
import { cadastroFuncionarioDto } from '../domain/dto/cadastro-funcionarios.dto';

export class FuncionarioRepository extends Repository {
  static instance: FuncionarioRepository;

  constructor() {
    super('fornos');

    if (FuncionarioRepository.instance) {
      return FuncionarioRepository.instance;
    }

    FuncionarioRepository.instance = this;
  }

  public async list(params: FuncionariosListDTO): Promise<IPaginationResponse<CadastroFuncionarioEntity>> {
    const { status, data: response } = await this.http.get<IPaginationResponse<CadastroFuncionarioEntity>>('', {
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
              return new CadastroFuncionarioEntity(item);
            })
          : ([] as Array<CadastroFuncionarioEntity>),
      };
    }

    throw new Error('Ops, algo inesperado aconteceu!');
  }

  //   public async get(id: ID): Promise<User> {
  //     const { status, data } = await this.http.get<User>(`/${id}`);

  //     if (this.isOK(status)) return new User(data);

  //     throw new Error('Ops, algo inesperado aconteceu!');
  //   }

  public async create(record: cadastroFuncionarioDto): Promise<CadastroFuncionarioEntity> {
    const { status, data } = await this.http.post<CadastroFuncionarioEntity, cadastroFuncionarioDto>('/create', record);

    if (this.isOK(status)) return new CadastroFuncionarioEntity(data);

    throw new Error('Ops, algo inesperado aconteceu!');
  }

  public async update(id: ID, record: cadastroFuncionarioDto): Promise<CadastroFuncionarioEntity> {
    const { status, data } = await this.http.put<CadastroFuncionarioEntity, cadastroFuncionarioDto>(`/update/${id}`, record);

    if (this.isOK(status)) return new CadastroFuncionarioEntity(data);

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
