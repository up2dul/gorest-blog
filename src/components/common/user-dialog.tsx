import { Plus } from 'lucide-react';

import { AddUserForm } from '@/components/form/add';
import { DeleteUserForm } from '@/components/form/delete';
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
            Make changes to user "<span className="font-bold">{user.name}</span>
            " data here. Click Save when you're done.
          </DialogDescription>
        </DialogHeader>

        <EditUserForm user={user} />
      </DialogContent>
    </Dialog>
  );
};

export const DeleteUserDialog = ({ user }: { user: User }) => {
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
            Are you sure you want to delete user "
            <span className="font-bold">{user.name}</span>"?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DeleteUserForm userId={user.id} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
