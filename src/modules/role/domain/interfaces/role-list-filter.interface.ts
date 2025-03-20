import { ERoleReference } from '../enums';

export interface IRoleListFilter {
  name?: any;
  reference?: ERoleReference;
  search?: string;
}
