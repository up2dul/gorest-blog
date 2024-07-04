'use server';

import { revalidatePath } from 'next/cache';
import { toInt } from 'radash';

import { addUser, deleteUser, editUser } from '@/lib/api';
import type { InitialState } from '@/lib/types';

export async function addUserAction(_: InitialState, formData: FormData) {
  const newUser = {
    name: formData.get('name') as string,
    email: formData.get('email') as string,
    gender: formData.get('gender') as 'male' | 'female',
    status: formData.get('status') as 'active' | 'inactive',
  };
  const [err, user] = await addUser(newUser);

  if (err) {
    return {
      errors: JSON.parse(err.message),
      message: err.message,
    };
  }

  revalidatePath('/users');
  return {
    errors: null,
    message: `User ${user.name} added successfully!`,
  };
}

export async function editUserAction(_: InitialState, formData: FormData) {
  const userId = toInt(formData.get('userId'));
  const editedUser = {
    name: formData.get('name') as string,
    email: formData.get('email') as string,
    gender: formData.get('gender') as 'male' | 'female',
    status: formData.get('status') as 'active' | 'inactive',
  };
  const [err, user] = await editUser({ userId, editedUser });

  if (err) {
    return {
      errors: JSON.parse(err.message),
      message: err.message,
    };
  }

  revalidatePath('/users');
  return {
    errors: null,
    message: `User ${user.name} edited successfully!`,
  };
}

export async function deleteUserAction(
  _: { message: string },
  formData: FormData,
) {
  const userId = toInt(formData.get('userId'));
  const [err] = await deleteUser(userId);

  if (err) {
    return { message: err.message };
  }

  revalidatePath('/users');
  return { message: 'User deleted successfully!' };
}
