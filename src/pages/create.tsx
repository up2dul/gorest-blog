import { useAuth } from "@/context/auth-context";
import { useCreatePost } from "@/hooks/use-posts";
import { useQueryUsers } from "@/hooks/use-users";
import { Button, Card, Input } from "antd";

export default function CreatePost() {
  const { userAuth } = useAuth();
  const post = useCreatePost();
  const users = useQueryUsers();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const title = formData.get("title") as string;
    const body = formData.get("body") as string;
    const firstUserId = users.data?.data[0].id;

    post.mutate({
      user: userAuth?.name as string,
      user_id: firstUserId || 0,
      title,
      body,
    });
  };

  return (
    <section className="flex flex-col gap-4 justify-center items-center">
      <h1 className="text-2xl text-balance text-center sm:w-3/4 md:text-3xl">
        Create a new blog post
      </h1>
      <Card
        title="Fill the title and body of your post"
        className="w-full sm:w-4/6"
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <Input size="large" name="title" placeholder="Post title" required />
          <Input.TextArea
            size="large"
            name="body"
            placeholder="Post body"
            required
          />
          <Button
            htmlType="submit"
            type="primary"
            loading={post.isPending}
            className="mt-4 w-full"
          >
            Create!
          </Button>
        </form>
      </Card>
    </section>
  );
}
