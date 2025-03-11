import { PostCard } from "@/components/ui/post-card";
import { useDebounceValue } from "@/hooks/use-debounce";
import { useQueryPosts } from "@/hooks/use-posts";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { FloatButton, Input, Pagination, Spin } from "antd";
import Link from "next/link";
import { parseAsInteger, useQueryState } from "nuqs";
import { useEffect } from "react";

export default function Home() {
  const [queryPage, setQueryPage] = useQueryState("page", parseAsInteger);
  const [queryTitle, setQueryTitle] = useQueryState("title");
  const [debouncedTitle, setDebouncedTitle] = useDebounceValue(queryTitle, 500);
  const {
    data: posts,
    isLoading,
    isError,
    error,
  } = useQueryPosts({
    page: queryPage,
    title: debouncedTitle,
  });
  const postsLength = Number(posts?.data.length);

  // biome-ignore lint/correctness/useExhaustiveDependencies: unnecessary dependency
  useEffect(() => {
    setQueryTitle(debouncedTitle);
  }, [debouncedTitle]);

  if (isError) {
    return <h1>Error: {error.message}</h1>;
  }

  return (
    <>
      <Input
        placeholder=" Search blog posts..."
        size="large"
        className="mb-4"
        defaultValue={queryTitle || ""}
        prefix={<SearchOutlined />}
        onChange={e => setDebouncedTitle(e.target.value)}
      />

      {isLoading ? (
        <Spin size="large" className="mt-20 w-full" />
      ) : (
        <>
          <ul className="grid gap-4 grid-cols-1 md:grid-cols-2">
            {posts?.data.map(post => (
              <li key={post.id}>
                <PostCard {...post} />
              </li>
            ))}
          </ul>

          {queryTitle !== null && postsLength === 0 && (
            <h1>No blog posts found with keyword "{queryTitle}"</h1>
          )}

          <Pagination
            align="center"
            current={queryPage || 1}
            total={postsLength < 10 ? 10 : 50}
            className="mt-10"
            onChange={number => setQueryPage(number)}
          />
        </>
      )}

      <Link href="/create" className="mt-10">
        <FloatButton
          shape="square"
          type="primary"
          style={{ insetInlineEnd: 24 }}
          icon={<PlusOutlined />}
          tooltip={<p>Create a new post</p>}
        />
      </Link>
    </>
  );
}
