import { useDeletePost } from "@/hooks/use-posts";
import type { Post } from "@/lib/types";
import { Card, Modal } from "antd";
import Link from "next/link";
import { useState } from "react";

export const PostCard = ({ id, title, body }: Post) => {
  const { mutate, isPending } = useDeletePost(id);
  const [isOpenModal, setIsOpenModal] = useState(false);

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
        onOk={() => mutate()}
        onCancel={() => setIsOpenModal(false)}
        okText="Yes, delete it"
        loading={isPending}
        footer={(_, { OkBtn, CancelBtn }) => (
          <>
            <CancelBtn />
            <OkBtn />
          </>
        )}
      >
        <p>Are you sure you want to delete post #{id}?</p>
      </Modal>

      <Card
        title={title}
        actions={cardActions}
        loading={isPending}
        className="w-full transition-colors border group-hover:border-blue-5"
      >
        <h1 className="font-medium text-blueDark-5 text-lg dark:text-blueDark-10">
          #{id}
        </h1>
        <p className="line-clamp-2">{body}</p>
      </Card>
    </>
  );
};
