export class Address {
  id: number = 0;

  postcode: string = '';
  cityIbgeCode: string = '';
  country: string = '';
  state: string = '';
  city: string = '';
  street: string = '';
  number: string = '';
  neighborhood: string = '';
  complement?: string | null;

  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;

  constructor(partial: Partial<Address>) {
    Object.assign(this, partial);
  }
}
