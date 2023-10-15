// useExpiringLocalStorage.ts
import { useState, useEffect } from 'react';

const useExpiringLocalStorage = <T>(
  key: string,
  initialValue: T,
  expirationInMinutes: number
): [T, (value: T) => void] => {
  const now = new Date().getTime();
  const [value, setValue] = useState<T>(() => {
    const item = window.localStorage.getItem(key);
    if (item) {
      const data = JSON.parse(item) as { value: T; expires: number };
      if (data.expires > now) {
        return data.value;
      }
      window.localStorage.removeItem(key);
    }
    return initialValue;
  });

  useEffect(() => {
    if (value === null) {
      window.localStorage.removeItem(key);
    } else {
      const expires = now + expirationInMinutes * 60 * 1000;
      window.localStorage.setItem(key, JSON.stringify({ value, expires }));
    }
  }, [key, value, expirationInMinutes, now]);

  return [value, setValue];
};

export default useExpiringLocalStorage;
