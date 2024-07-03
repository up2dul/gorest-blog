'use server';

import { revalidatePath } from 'next/cache';
import { toInt } from 'radash';

import { addUser, editUser } from '@/lib/api';

export async function addUserAction(
  _: {
    message: string;
  },
  formData: FormData,
) {
  const newUser = {
    name: formData.get('name') as string,
    email: formData.get('email') as string,
    gender: formData.get('gender') as 'male' | 'female',
    status: formData.get('status') as 'active' | 'inactive',
  };
  const [err, user] = await addUser(newUser);

  if (err) {
    return { message: err.message };
  }

  revalidatePath('/users');
  return { message: `User ${user.name} added successfully!` };
}

export async function editUserAction(
  _: {
    message: string;
  },
  formData: FormData,
) {
  const userId = toInt(formData.get('userId'));
  const editedUser = {
    name: formData.get('name') as string,
    email: formData.get('email') as string,
    gender: formData.get('gender') as 'male' | 'female',
    status: formData.get('status') as 'active' | 'inactive',
  };
  const [err, user] = await editUser({ userId, editedUser });

  if (err) {
    return { message: err.message };
  }

  revalidatePath('/users');
  return { message: `User ${user.name} edited successfully!` };
}
