import { useQueryPostDetail } from "@/hooks/use-posts";
import { Spin } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";

export default function PostDetail() {
  const router = useRouter();
  const { data, isLoading, isError, error } = useQueryPostDetail(
    Number(router.query.id),
  );
  const post = data?.data;

  if (isLoading) {
    return <Spin size="large" className="mt-20 w-full" />;
  }

  if (isError) {
    return <h1>Error: {error.message}</h1>;
  }

  return (
    <section>
      <Link href="/" className="mb-4 inline-block text-blue-5 underline">
        Back to posts
      </Link>
      <h1 className="mb-4 font-medium text-2xl text-balance md:text-3xl">
        {post?.title}
      </h1>
      <p>{post?.body}</p>
    </section>
  );
}
