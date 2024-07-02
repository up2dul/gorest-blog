import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <main className="my-8 flex flex-col gap-4">
      {[1, 2, 3].map(num => (
        <Skeleton key={num} className="h-[170px] w-full" />
      ))}
    </main>
  );
}
