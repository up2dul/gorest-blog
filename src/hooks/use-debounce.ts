import { useEffect, useState } from "react";

/**
 * Custom hook to debounce a value.
 *
 * Whenever the setter is called to update the value, the provided delay is used to postpone
 * the update of the debounced value. If the value changes during the delay period, the previous
 * timeout is cancelled and a new one is set.
 *
 * @template T - The type of the value being debounced.
 * @param initialValue - The initial value to debounce.
 * @param delay - The delay in milliseconds before the debounced value is updated.
 * @returns A tuple where the first element is the debounced value and the second is a setter to update the value.
 */
export function useDebounceValue<T>(initialValue: T, delay: number) {
  const [value, setValue] = useState<T>(initialValue);
  const [debouncedValue, setDebouncedValue] = useState<T>(initialValue);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return [debouncedValue, setValue] as const;
}
