import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type GenderSelectProps = {
  defaultValue?: string;
};
export const GenderSelect = ({ defaultValue }: GenderSelectProps) => {
  return (
    <Select name="gender" defaultValue={defaultValue} required>
      <SelectTrigger>
        <SelectValue placeholder="Select gender" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="male">Male</SelectItem>
        <SelectItem value="female">Female</SelectItem>
      </SelectContent>
    </Select>
  );
};

type StatusSelectProps = {
  defaultValue?: string;
};
export const StatusSelect = ({ defaultValue }: StatusSelectProps) => {
  return (
    <Select name="status" defaultValue={defaultValue} required>
      <SelectTrigger>
        <SelectValue placeholder="Select active status" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="active">Active</SelectItem>
        <SelectItem value="inactive">Inactive</SelectItem>
      </SelectContent>
    </Select>
  );
};
