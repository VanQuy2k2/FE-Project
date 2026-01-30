import { useEffect, useState } from 'react';

export default function useDebounce(value, timer) {
  const [debounceValue, setDebounceValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceValue(value);
    }, timer);
    return () => {
      clearTimeout(handler);
    };
  }, [value]);
  return debounceValue;
}
