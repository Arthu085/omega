import { AddressCreateData } from '@/shared/domain';

export interface UserUpdateSelfDto {
  // Dados Gerais
  name: string;
  username: string;
  email: string;
  password?: string;
  phone: string;
  dateOfBirth: Date;
  document?: string;
  registration?: string;

  // Endereço
  address: AddressCreateData;
}
