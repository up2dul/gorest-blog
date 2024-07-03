import { Activity, AtSign, UsersRound } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import type { Comment, Post, User } from '@/lib/types';
import { DeleteUserDialog, EditUserDialog } from './user-dialog';

type PostCardProps = {
  post: Post;
};
export const PostCard = ({ post }: PostCardProps) => {
  return (
    <Link
      key={post.id}
      href={`/posts/${post.id}`}
      className="hover:scale-105 transition-transform"
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-balance">{post.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="line-clamp-2">{post.body}</p>
        </CardContent>
      </Card>
    </Link>
  );
};

type CommentCardProps = {
  comment: Comment;
};
export const CommentCard = ({ comment }: CommentCardProps) => {
  return (
    <article className="flex items-start gap-4">
      <Image
        src={`https://ui-avatars.com/api/?name=${comment.name}`}
        alt={`${comment.name} avatar`}
        width={30}
        height={30}
        className="rounded-full mt-1"
      />
      <div>
        <p className="font-bold">{comment.name}</p>
        <p className="text-sm text-muted-foreground">{comment.body}</p>
      </div>
    </article>
  );
};

type UserCardProps = {
  user: User;
};
export const UserCard = ({ user }: UserCardProps) => {
  return (
    <Card>
      <CardHeader className="flex items-center gap-2">
        <Image
          src={`https://ui-avatars.com/api/?name=${user.name}`}
          alt={`${user.name} avatar`}
          width={40}
          height={40}
          className="rounded-full mt-1"
        />
        <CardTitle className="text-balance">{user.name}</CardTitle>
      </CardHeader>

      <CardContent className="text-sm text-muted-foreground">
        <p className="flex items-start gap-1 truncate">
          <AtSign className="w-4" /> {user.email}
        </p>
        <p className="flex items-start gap-1 truncate">
          <UsersRound className="w-4" /> {user.gender}
        </p>
        <p className="flex items-start gap-1 truncate">
          <Activity className="w-4" /> {user.status}
        </p>
      </CardContent>

      <CardFooter className="flex gap-2">
        <EditUserDialog />
        <DeleteUserDialog />
      </CardFooter>
    </Card>
  );
};
