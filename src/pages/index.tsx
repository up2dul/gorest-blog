import { useQueryPosts } from "@/hooks/use-posts";
import { Card, Col, Pagination, Row, Spin } from "antd";
import { parseAsInteger, useQueryState } from "nuqs";

export default function Home() {
  const [page, setPage] = useQueryState("page", parseAsInteger);
  const {
    data: posts,
    isLoading,
    isError,
    error,
  } = useQueryPosts({
    page,
  });

  if (isLoading) {
    return <Spin size="large" className="mt-20 w-full" />;
  }

  if (isError) {
    return <h1>Error: {error.message}</h1>;
  }

  return (
    <>
      <Row gutter={[12, 12]}>
        {posts?.data.map(post => (
          <Col key={post.id} className="gutter-row" md={12}>
            <Card title={post.title} className="w-full">
              <p className="line-clamp-2">{post.body}</p>
            </Card>
          </Col>
        ))}
      </Row>

      <Pagination
        align="center"
        current={Number(page)}
        total={50}
        className="mt-10"
        onChange={number => setPage(number)}
      />
    </>
  );
}
