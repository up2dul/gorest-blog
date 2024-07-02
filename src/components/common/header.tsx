import Link from 'next/link';

export const Header = () => {
  return (
    <header className="fixed z-20 top-0 inset-x-0 flex h-16 items-center justify-center border-b bg-background px-4 md:px-6">
      <nav className="gap-6 font-medium flex items-center">
        <Link
          href="/posts"
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          Posts
        </Link>
        <Link
          href="/users"
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          Users
        </Link>
      </nav>
    </header>
  );
};
