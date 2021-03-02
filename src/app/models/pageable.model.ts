export interface Pageable<T> {
  content: T[];
  pageable: {
    sort: SortModel;
    offset: number;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    unpaged: boolean;
  };
  totalElements: number;
  totalPages: number;
  last: boolean;
  size: number;
  number: number;
  sort: SortModel;
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}

export interface SortModel {
  unsorted: boolean;
  sorted: boolean;
  empty: boolean;
}
