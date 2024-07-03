import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export const ActiveSelect = ({
  className,
  ...props
}: React.ComponentProps<'button'>) => {
  return (
    <Select>
      <SelectTrigger className={className} {...props}>
        <SelectValue placeholder="Select active status" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="active">Active</SelectItem>
        <SelectItem value="inactive">Inactive</SelectItem>
      </SelectContent>
    </Select>
  );
};
