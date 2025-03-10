import { useDeletePost } from "@/hooks/use-posts";
import type { Post } from "@/lib/types";
import { Card, Modal, message } from "antd";
import Link from "next/link";
import { useState } from "react";

export const PostCard = ({ id, title, body }: Post) => {
  const { mutateAsync, isError, error, isPending } = useDeletePost(id);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleDelete = async () => {
    try {
      await mutateAsync();
      if (isError) {
        return message.open({
          type: "error",
          content: `Failed to delete post. ${error.message}`,
        });
      }

      message.open({
        type: "success",
        content: "Post deleted successfully!",
      });
    } catch (error) {
      if (error instanceof Error) {
        message.open({
          type: "error",
          content: `There is an error: ${error.message}`,
        });
      }
    }
  };

  const cardActions = [
    <Link
      key="detail"
      href={`/post/${id}`}
      className="text-blue-5 focus:ring ring-blue-3"
    >
      Detail
    </Link>,
    <Link
      key="edit"
      href={`/post/edit/${id}`}
      className="text-blue-5 focus:ring ring-blue-3"
    >
      Edit
    </Link>,
    <button
      type="button"
      key="delete"
      className="text-red-5 w-full focus:ring focus:outline-none ring-red-3"
      onClick={() => setIsOpenModal(true)}
    >
      Delete
    </button>,
  ];

  return (
    <>
      <Modal
        open={isOpenModal}
        title="Confirm deletion"
        onOk={handleDelete}
        onCancel={() => setIsOpenModal(false)}
        okText="Yes, delete it"
        footer={(_, { OkBtn, CancelBtn }) => (
          <>
            <CancelBtn />
            <OkBtn />
          </>
        )}
      >
        <p>Are you sure you want to delete this post?</p>
      </Modal>

      <Card
        title={title}
        actions={cardActions}
        loading={isPending}
        className="w-full transition-colors border group-hover:border-blue-5"
      >
        <p className="line-clamp-2">{body}</p>
      </Card>
    </>
  );
};
