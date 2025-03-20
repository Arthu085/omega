import { normalize } from "@/shared/utils/string";

export class BrazilCity {
  public name: string = "";
  public ibgeCode: string = "";

  constructor(
    partial: Partial<BrazilCity> & { codigo_ibge: string; nome: string }
  ) {
    Object.assign(this, {
      ...partial,
      ibgeCode: partial.codigo_ibge ? partial.codigo_ibge.slice(2, 7) : "",
      name: normalize(partial.nome ?? "").toUpperCase(),
    });
  }
}
