export type UserAuth = {
  name: string;
  token: string;
};

export type Post = {
  id: number;
  user_id?: number;
  title: string;
  body: string;
};
