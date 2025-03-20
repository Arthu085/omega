export class BrazilState {
  public id: number = 0;
  public acronym: string = '';
  public name: string = '';

  constructor(partial: { id: number; sigla: string; nome: string }) {
    Object.assign(this, { id: partial, acronym: partial.sigla, name: partial.nome });
  }
}
