export type Post = {
  id: number;
  user_id: number;
  title: string;
  body: string;
};

export type User = {
  id: number;
  name: string;
  email: string;
  gender: 'male' | 'female';
  status: 'active' | 'inactive';
};

export type UserErrorResponse = [
  {
    field?: string;
    message?: string;
  },
  {
    field?: string;
    message?: string;
  },
  {
    field?: string;
    message?: string;
  },
  {
    field?: string;
    message?: string;
  },
];

export type Comment = {
  id: number;
  post_id: number;
  name: string;
  email: string;
  body: string;
};

export type InitialState = {
  errors: null | UserErrorResponse;
  message: string;
};
