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

export type User = {
  id: number;
  name: string;
  email: string;
  gender: "male" | "female";
  status: "active" | "inactive";
};

export type ReqPostBody = {
  user: string;
  user_id: number;
  title: string;
  body: string;
};
