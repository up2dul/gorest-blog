import { useQueryPosts } from "@/hooks/use-posts";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { data: posts, isLoading, isError, error } = useQueryPosts();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {JSON.stringify(error.message, null, 2)}</div>;
  }

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <pre>{JSON.stringify(posts, null, 2)}</pre>
    </main>
  );
}
