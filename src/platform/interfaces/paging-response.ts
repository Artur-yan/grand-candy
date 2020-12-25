
export interface IPagingResponse<T> {
  page: number;
  totalPages: number;
  size: number;
  totalElements: number;
  content: T[];
}
