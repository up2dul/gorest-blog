import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <section className="my-8 grid grid-cols-1 lg:grid-cols-2 gap-4">
      {[1, 2, 3, 4].map(num => (
        <Skeleton key={num} className="h-[260px] w-full" />
      ))}
    </section>
  );
}
