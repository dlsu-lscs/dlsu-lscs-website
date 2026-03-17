import { useEffect, useState } from 'react';

type hookProps<T> = {
  delay: number;
  value: T;
};

export default function useDebouncer<T>({ delay, value }: hookProps<T>) {
  const [debouncedVal, setDebouncedVal] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedVal(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [delay, value]);

  return debouncedVal;
}
