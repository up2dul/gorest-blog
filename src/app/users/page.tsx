import type { Metadata } from 'next';
import { toInt } from 'radash';

import { UserCard } from '@/components/common/content-card';
import { Pagination } from '@/components/common/pagination';
import { SearchInput } from '@/components/common/search-input';
import { AddUserDialog } from '@/components/common/user-dialog';
import { getUsers } from '@/lib/api';

export const metadata: Metadata = {
  title: 'Gorest Blog | Users',
};

type UsersProps = {
  searchParams: {
    page?: string;
    name?: string;
  };
};

export default async function Users({ searchParams }: UsersProps) {
  const page = toInt(searchParams.page) || 1;
  const nameSearch = searchParams.name || '';
  const [err, users] = await getUsers({
    page,
    nameSearch,
  });

  if (err) {
    return (
      <>
        <h1 className="text-3xl font-bold mb-8">👤 User List</h1>
        <p>There was an error while fetching users</p>
      </>
    );
  }

  return (
    <>
      <section className="mb-4 flex flex-wrap gap-2 items-center justify-between">
        <h1 className="text-3xl font-bold">👤 User List</h1>
        <AddUserDialog />
      </section>

      <SearchInput />

      <section className="my-8 grid grid-cols-1 lg:grid-cols-2 gap-4">
        {nameSearch.length > 0 && users.length === 0 && <p>No users found</p>}
        {users.map(user => (
          <UserCard key={user.id} user={user} />
        ))}
      </section>

      <Pagination />
    </>
  );
}
