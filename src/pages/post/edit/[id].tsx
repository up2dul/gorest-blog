import { useAuth } from "@/context/auth-context";
import { useEditPost, useQueryPostDetail } from "@/hooks/use-posts";
import { Button, Card, Input, Spin } from "antd";
import { useRouter } from "next/router";

export default function EditPost() {
  const { userAuth } = useAuth();
  const router = useRouter();
  const queryId = Number(router.query.id);
  const editPost = useEditPost(queryId);
  const postDetail = useQueryPostDetail(queryId);
  const post = postDetail.data?.data;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const title = formData.get("title") as string;
    const body = formData.get("body") as string;

    editPost.mutate({
      user: userAuth?.name as string,
      user_id: post?.user_id || 0,
      title,
      body,
    });
  };

  if (postDetail.isLoading) {
    return <Spin size="large" className="mt-20 w-full" />;
  }

  if (postDetail.isError) {
    return <h1>Error: {postDetail.error.message}</h1>;
  }

  return (
    <section className="flex flex-col gap-4 justify-center items-center">
      <h1 className="text-2xl text-balance text-center sm:w-3/4 md:text-3xl">
        Edit a post
      </h1>
      <Card
        title="Fill the title and body of your post"
        className="w-full sm:w-4/6"
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <Input
            size="large"
            name="title"
            placeholder="Post title"
            defaultValue={post?.title}
            required
          />
          <Input.TextArea
            size="large"
            name="body"
            placeholder="Post body"
            defaultValue={post?.body}
            required
          />
          <Button
            htmlType="submit"
            type="primary"
            loading={editPost.isPending}
            className="mt-4 w-full"
          >
            Edit!
          </Button>
        </form>
      </Card>
    </section>
  );
}
