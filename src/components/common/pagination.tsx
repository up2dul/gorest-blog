'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { toInt } from 'radash';

import {
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  Pagination as PaginationWrapper,
} from '@/components/ui/pagination';

export const Pagination = () => {
  const searchParams = useSearchParams();
  const currentPage = toInt(searchParams.get('page'));
  const pathname = usePathname();
  const { replace } = useRouter();

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <PaginationWrapper>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          />
        </PaginationItem>

        {[1, 2, 3, 4, 5].map(num => (
          <PaginationItem key={num}>
            <PaginationLink
              isActive={currentPage === num}
              disabled={currentPage === num}
              onClick={() => handlePageChange(num)}
            >
              {num}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            disabled={currentPage === 5}
            onClick={() => handlePageChange(currentPage + 1)}
          />
        </PaginationItem>
      </PaginationContent>
    </PaginationWrapper>
  );
};
