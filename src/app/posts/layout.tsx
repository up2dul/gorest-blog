export default function PostsLayout({
  children,
}: { children: React.ReactNode }) {
  return (
    <main>
      <h1 className="text-3xl font-bold">📝 Blog Post List</h1>

      {children}
    </main>
  );
}
