import type PagedRequest from "model/pagination/PagedRequest";
import type PagedResponse from "model/pagination/PagedResponse";

export function toPagedResponse<TDto>(
  items: TDto[],
  pagination: PagedRequest,
): PagedResponse<TDto> {
  let { fromEnd, itemsPerPage, currentPage } = pagination;

  if (fromEnd) {
    items = items.reverse();
  }

  const totalItems = items.length;

  itemsPerPage = Math.abs(itemsPerPage);

  const totalPages = Math.ceil(itemsPerPage ? totalItems / itemsPerPage : 0);

  currentPage = Math.max(1, Math.min(totalPages, currentPage));

  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const data = items.slice(start, end);
  const pageSize = data.length;

  return { currentPage, totalPages, pageSize, totalItems, data };
}
