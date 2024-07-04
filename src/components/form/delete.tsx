'use client';

import { useFormState, useFormStatus } from 'react-dom';

import { deleteUserAction } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const initialState = {
  message: '',
};

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" variant="destructive">
      {pending ? 'Deleting...' : 'Yes, delete it!'}
    </Button>
  );
};

export const DeleteUserForm = ({ userId }: { userId: number }) => {
  const [_, formAction] = useFormState(deleteUserAction, initialState);

  return (
    <form action={formAction} className="grid gap-4">
      <Input name="userId" type="hidden" defaultValue={userId} />
      <SubmitButton />
    </form>
  );
};
