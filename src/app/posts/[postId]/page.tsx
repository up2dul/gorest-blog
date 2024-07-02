import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { toInt } from 'radash';

import { CommentCard } from '@/components/common/content-card';
import { buttonVariants } from '@/components/ui/button';
import { getPostComments, getPostDetail, getUserDetail } from '@/lib/api';
import { cn } from '@/lib/utils';

type PostDetailProps = {
  params: {
    postId: string;
  };
};

export default async function PostDetail({ params }: PostDetailProps) {
  const [postErr, post] = await getPostDetail(toInt(params.postId));
  const [userErr, user] = await getUserDetail(toInt(post?.user_id));
  const [commentsErr, comments] = await getPostComments(toInt(params.postId));

  if (postErr || userErr || commentsErr) {
    return (
      <main>
        <Link
          href="/"
          className={cn('-ml-4', buttonVariants({ variant: 'link' }))}
        >
          <ArrowLeft className="mr-2" /> Back
        </Link>
        <p className="mt-6">There was an error while fetching post</p>
      </main>
    );
  }

  return (
    <main>
      <Link
        href="/"
        className={cn('-ml-4', buttonVariants({ variant: 'link' }))}
      >
        <ArrowLeft className="mr-2" /> Back
      </Link>

      <section className="flex items-center gap-2 mt-6">
        <Image
          src={`https://ui-avatars.com/api/?name=${user.name || 'x'}`}
          alt={`${user.name} avatar`}
          width={40}
          height={40}
          className="rounded-full"
        />

        <div>
          <p>
            <span className="font-bold">{user.name || 'unknown user'}</span>{' '}
            posted this
          </p>
          <p className="text-sm">{user.email}</p>
        </div>
      </section>

      <section className="mt-6">
        <h1 className="text-2xl font-bold text-balance">{post.title}</h1>
        <p className="mt-2">{post.body}</p>
      </section>

      <section className="mt-10">
        <h1 className="text-xl font-bold">Comments ({comments.length})</h1>
        <div className="my-4 flex flex-col gap-3">
          {comments.map(comment => (
            <CommentCard key={comment.id} comment={comment} />
          ))}
        </div>
      </section>
    </main>
  );
}
