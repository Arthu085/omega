import { ERoleReference } from '../enums';

export class Role {
  id: number = 0;
  name: string = '';
  reference?: ERoleReference;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;

  public constructor(partial: Partial<Role>) {
    Object.assign(this, { ...partial });
  }
}
