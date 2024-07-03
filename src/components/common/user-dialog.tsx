import { Plus } from 'lucide-react';

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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ActiveSelect } from './active-select';

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
            Add a new user here. Click Add when you're done.
          </DialogDescription>
        </DialogHeader>

        <form className="grid gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" placeholder="e.g. John Doe" />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="e.g. john@example.com"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Status</Label>
            <ActiveSelect name="status" />
          </div>

          <DialogFooter>
            <Button type="submit">Add!</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export const EditUserDialog = () => {
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

        <form className="grid gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" placeholder="e.g. John Doe" />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="e.g. john@example.com"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Status</Label>
            <ActiveSelect name="status" />
          </div>

          <DialogFooter>
            <Button type="submit">Save!</Button>
          </DialogFooter>
        </form>
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
