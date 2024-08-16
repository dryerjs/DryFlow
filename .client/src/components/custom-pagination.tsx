import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

interface CustomPaginationProps {
  total: number;
  totalPages: number;
  limit: number;
  page: number;
  setPage: (page: number) => void;
}

export const CustomPagination = (props: CustomPaginationProps) => {
  const { totalPages, page, setPage } = props;
  if (totalPages <= 1) return null;
  const pages = (page === 1 ? [1, 2, 3] : [page - 1, page, page + 1]).filter(
    (pageNumber) => pageNumber > 0 && pageNumber <= totalPages,
  );
  const isFirstPage = page === 1;
  const isLastPage = page === totalPages;
  const disabledClassNames = 'pointer-events-none opacity-50';
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={() => setPage(page - 1)}
            aria-disabled={isFirstPage}
            className={isFirstPage ? disabledClassNames : undefined}
          />
        </PaginationItem>
        {pages.includes(1) ? null : (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {pages.map((p) => (
          <PaginationItem key={p}>
            <PaginationLink
              href="#"
              isActive={p === page}
              onClick={() => setPage(p)}
            >
              {p}
            </PaginationLink>
          </PaginationItem>
        ))}
        {pages.includes(totalPages) ? null : (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={() => setPage(page + 1)}
            aria-disabled={isLastPage}
            className={isLastPage ? disabledClassNames : undefined}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
