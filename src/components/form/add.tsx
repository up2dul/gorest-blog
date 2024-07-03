'use client';

import { useFormState, useFormStatus } from 'react-dom';

import { addUserAction } from '@/app/actions';
import { GenderSelect, StatusSelect } from '@/components/common/select';
import { Button } from '@/components/ui/button';
import { DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const initialState = {
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
  const [_, formAction] = useFormState(addUserAction, initialState);

  return (
    <form action={formAction} className="grid gap-4">
      <div className="flex flex-col gap-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" placeholder="e.g. John Doe" required />
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
      </div>
      <div className="flex flex-col gap-2">
        <Label>Gender</Label>
        <GenderSelect />
      </div>
      <div className="flex flex-col gap-2">
        <Label>Status</Label>
        <StatusSelect />
      </div>

      <SubmitButton />
    </form>
  );
};
