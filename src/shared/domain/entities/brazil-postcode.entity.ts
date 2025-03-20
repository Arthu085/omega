import { normalize } from "@/shared/utils/string";

export class BrazilPostcode {
  public postcode: string = "";
  public state: string = "";
  public city: string = "";
  public neighborhood: string = "";
  public street: string = "";

  constructor(partial: Partial<BrazilPostcode>) {
    Object.assign(this, {
      ...partial,
      city: normalize(partial.city ?? "").toUpperCase(),
    });
  }
}
