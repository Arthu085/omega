import axios from 'axios';
import { isArray } from '../utils/array';
import { BrazilCity } from '../domain/entities/brazil-city.entity';
import { BrazilState } from '../domain/entities/brazil-state.entity';
import { BrazilPostcode } from '../domain/entities/brazil-postcode.entity';

export class BrazilRepository {
  private uri: string = 'https://brasilapi.com.br/api';

  static instance: BrazilRepository;
  private cacheStates: Array<BrazilState> = [];

  constructor() {
    if (BrazilRepository.instance) {
      return BrazilRepository.instance;
    }

    BrazilRepository.instance = this;
  }

  private isOK(status: number): boolean {
    return status >= 200 && status < 300;
  }

  public async address(postcode: string): Promise<BrazilPostcode> {
    const v1 = await this.getAddressV1(postcode);

    if (v1) return v1;

    const v2 = await this.getAddressV2(postcode);

    if (v2) return v2;

    const viaCEP = await this.getAddressByViaCEP(postcode);

    if (viaCEP) return viaCEP;

    const postmon = await this.getAddressByPostmon(postcode);

    if (postmon) return postmon;

    throw new Error('Ops... Algo inesperado aconteceu!');
  }

  public async states(): Promise<Array<BrazilState>> {
    if (this.cacheStates.length) return this.cacheStates;

    const { status, data } = await axios.get<Array<any>>(`${this.uri}/ibge/uf/v1`);

    if (this.isOK(status)) {
      const getStates = isArray(data)
        ? data.map((s: any) => new BrazilState(s))
        : ([] as Array<BrazilState>);

      this.cacheStates = getStates;

      return getStates;
    }

    throw new Error('Ops... Algo inesperado aconteceu!');
  }

  public async cities(state: string): Promise<Array<BrazilCity>> {
    const { status, data } = await axios.get(
      `${this.uri}/ibge/municipios/v1/${state}?providers=dados-abertos-br,gov`,
    );

    if (this.isOK(status))
      return isArray(data) ? data.map((c: any) => new BrazilCity(c)) : ([] as Array<BrazilCity>);

    throw new Error('Ops... Algo inesperado aconteceu!');
  }

  /**
   * GET ADDRESSES
   */

  private async getAddressV1(postcode: string): Promise<BrazilPostcode | undefined> {
    const response = await fetch(`${this.uri}/cep/v1/${postcode}`);

    if (!response.ok) return;

    const data = await response?.json();

    return new BrazilPostcode(data);
  }

  private async getAddressV2(postcode: string): Promise<BrazilPostcode | undefined> {
    const response = await fetch(`${this.uri}/cep/v2/${postcode}`);

    if (!response.ok) return;

    const data = await response?.json();

    return new BrazilPostcode(data);
  }

  private async getAddressByViaCEP(postcode: string): Promise<BrazilPostcode | undefined> {
    const response = await fetch(`https://viacep.com.br/ws/${postcode}/json/`);

    if (!response.ok) return;

    const data = await response?.json();

    return new BrazilPostcode({
      state: data.uf,
      city: data.localidade,
      neighborhood: data.bairro,
      street: data.logradouro,
    });
  }

  private async getAddressByPostmon(postcode: string): Promise<BrazilPostcode | undefined> {
    const response = await fetch(`https://api.postmon.com.br/v1/cep/${postcode}`);

    if (!response.ok) return;

    const data = await response?.json();

    return new BrazilPostcode({
      state: data.estado,
      city: data.cidade,
      neighborhood: data.bairro,
      street: data.logradouro,
    });
  }
}
