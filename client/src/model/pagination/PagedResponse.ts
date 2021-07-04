export default interface PagedResponse<TData> {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalItems: number;
  data: TData[];
}
