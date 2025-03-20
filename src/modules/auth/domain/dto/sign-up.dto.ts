import { Address } from '@/shared/domain';

export interface SignUpDTO {
  companyName: string;
  tradeName: string;
  cnpj: string;
  email: string;
  phone: string;
  password: string;
  address: Partial<Address>;
}
