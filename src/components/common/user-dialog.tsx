import { Plus } from 'lucide-react';

import { AddUserForm } from '@/components/form/add';
import { EditUserForm } from '@/components/form/edit';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import type { User } from '@/lib/types';

export const AddUserDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus /> Add
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Add user</DialogTitle>
          <DialogDescription>
            Add a new user here. Click Submit when you're done.
          </DialogDescription>
        </DialogHeader>

        <AddUserForm />
      </DialogContent>
    </Dialog>
  );
};

export const EditUserDialog = ({ user }: { user: User }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" className="w-1/2">
          Edit
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Edit user</DialogTitle>
          <DialogDescription>
            Make changes to user data here. Click Save when you're done.
          </DialogDescription>
        </DialogHeader>

        <EditUserForm user={user} />
      </DialogContent>
    </Dialog>
  );
};

export const DeleteUserDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive" className="w-1/2">
          Delete
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Delete user</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this user?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button variant="destructive">Yes, delete it!</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
