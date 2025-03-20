import { Sort } from '../types';

export interface IPaginationRequest {
  take?: number;
  skip?: number;
  orderBy?: string;
  ordering?: Sort;
}

export interface IPaginationResponse<T> {
  pages: number;
  total: number;
  data: Array<T>;
}
