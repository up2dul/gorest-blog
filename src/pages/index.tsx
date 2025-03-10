import { PostCard } from "@/components/ui/post-card";
import { useDebounceValue } from "@/hooks/use-debounce";
import { useQueryPosts } from "@/hooks/use-posts";
import { Col, Input, Pagination, Row, Spin } from "antd";
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
        placeholder="Search blog posts..."
        size="large"
        className="mb-4"
        defaultValue={queryTitle || ""}
        onChange={e => setDebouncedTitle(e.target.value)}
      />

      {isLoading ? (
        <Spin size="large" className="mt-20 w-full" />
      ) : (
        <>
          <Row gutter={[12, 12]}>
            {posts?.data.map(post => (
              <Col key={post.id} className="gutter-row" md={12}>
                <PostCard {...post} />
              </Col>
            ))}
          </Row>

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
    </>
  );
}
