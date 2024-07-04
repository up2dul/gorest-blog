import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getFieldError(
  errors: Array<{ field: string; message: string }>,
  field: string,
) {
  const error = errors?.find(error => error.field === field);
  return error ? error.message : null;
}
