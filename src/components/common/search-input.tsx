'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { debounce } from 'radash';

import { Input } from '@/components/ui/input';

export const SearchInput = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = debounce({ delay: 600 }, (term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term.length > 0) {
      params.set('name', term);
    } else {
      params.delete('name');
    }

    replace(`${pathname}?${params.toString()}`);
  });

  return (
    <Input
      placeholder="Search by name..."
      onChange={e => handleSearch(e.target.value)}
      defaultValue={searchParams.get('name') || ''}
    />
  );
};
