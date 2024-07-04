'use client';

import { useFormState, useFormStatus } from 'react-dom';

import { editUserAction } from '@/app/actions';
import { GenderSelect, StatusSelect } from '@/components/common/select';
import { Button } from '@/components/ui/button';
import { DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { User } from '@/lib/types';
import { getFieldError } from '@/lib/utils';

const initialState = {
  errors: null,
  message: '',
};

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <DialogFooter>
      <Button type="submit" disabled={pending}>
        {pending ? 'Saving...' : 'Save!'}
      </Button>
    </DialogFooter>
  );
};

export const EditUserForm = ({ user }: { user: User }) => {
  const [state, formAction] = useFormState(editUserAction, initialState);

  return (
    <form action={formAction} className="grid gap-5">
      <Input name="userId" type="hidden" defaultValue={user.id} />

      <div className="flex flex-col gap-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          name="name"
          defaultValue={user.name}
          placeholder="e.g. John Doe"
          required
        />
        {getFieldError(state.errors, 'name') && (
          <p className="-mt-1 text-red-500 text-sm">
            {getFieldError(state.errors, 'name')}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          defaultValue={user.email}
          placeholder="e.g. john@example.com"
          required
        />
        {getFieldError(state.errors, 'email') && (
          <p className="-mt-1 text-red-500 text-sm">
            {getFieldError(state.errors, 'email')}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Label>Gender</Label>
        <GenderSelect defaultValue={user.gender} />
        {getFieldError(state.errors, 'gender') && (
          <p className="-mt-1 text-red-500 text-sm">
            {getFieldError(state.errors, 'gender')}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Label>Status</Label>
        <StatusSelect defaultValue={user.status} />
        {getFieldError(state.errors, 'status') && (
          <p className="-mt-1 text-red-500 text-sm">
            {getFieldError(state.errors, 'status')}
          </p>
        )}
      </div>

      <SubmitButton />
    </form>
  );
};
