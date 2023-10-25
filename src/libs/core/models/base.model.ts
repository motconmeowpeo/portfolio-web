export interface IBaseParams {
  search?: string;
  filter?: any;
  page?: number;
  limit?: number;
}

export interface IStatePagination {
  total: number;
  currentPage: number;
  canPrev: boolean;
  canNext: boolean;
}

export interface IBasePagination<T> extends IStatePagination {
  data: T[];
}
