'use client';

import { useFormState, useFormStatus } from 'react-dom';

import { addUserAction } from '@/app/actions';
import { GenderSelect, StatusSelect } from '@/components/common/select';
import { Button } from '@/components/ui/button';
import { DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { User } from '@/lib/types';

const initialState = {
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
  const [_, formAction] = useFormState(addUserAction, initialState);

  return (
    <form action={formAction} className="grid gap-4">
      <div className="flex flex-col gap-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          name="name"
          defaultValue={user.name}
          placeholder="e.g. John Doe"
          required
        />
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
      </div>
      <div className="flex flex-col gap-2">
        <Label>Gender</Label>
        <GenderSelect defaultValue={user.gender} />
      </div>
      <div className="flex flex-col gap-2">
        <Label>Status</Label>
        <StatusSelect defaultValue={user.status} />
      </div>

      <SubmitButton />
    </form>
  );
};
