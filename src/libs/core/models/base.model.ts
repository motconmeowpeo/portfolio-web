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

export interface IExpItem {
  label: string;
  time: string;
  content: string;
  desc: string;
  logo: string;
}

export interface IProjectItem {
  label: string;
  desc?: string;
  logo?: string;
  position?: string[];
  link: string;
}