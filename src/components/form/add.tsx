'use client';

import { useFormState, useFormStatus } from 'react-dom';

import { addUserAction } from '@/app/actions';
import { GenderSelect, StatusSelect } from '@/components/common/select';
import { Button } from '@/components/ui/button';
import { DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
        {pending ? 'Submitting...' : 'Submit!'}
      </Button>
    </DialogFooter>
  );
};

export const AddUserForm = () => {
  const [state, formAction] = useFormState(addUserAction, initialState);

  return (
    <form action={formAction} className="grid gap-5">
      <div className="flex flex-col gap-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" placeholder="e.g. John Doe" required />
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
        <GenderSelect />
        {getFieldError(state.errors, 'gender') && (
          <p className="-mt-1 text-red-500 text-sm">
            {getFieldError(state.errors, 'gender')}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Label>Status</Label>
        <StatusSelect />
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
