import { useQueryPosts } from "@/hooks/use-posts";
import { Card, Col, Row, Spin } from "antd";

export default function Home() {
  const { data: posts, isLoading, isError, error } = useQueryPosts();

  if (isLoading) {
    return <Spin size="large" className="mt-20 w-full" />;
  }

  if (isError) {
    return <h1>Error: {error.message}</h1>;
  }

  return (
    <Row gutter={[12, 12]}>
      {posts?.data.map(post => (
        <Col key={post.id} className="gutter-row" md={12}>
          <Card title={post.title} className="w-full">
            <p className="line-clamp-2">{post.body}</p>
          </Card>
        </Col>
      ))}
    </Row>
  );
}
