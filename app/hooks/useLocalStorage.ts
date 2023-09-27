import { useState, Dispatch, SetStateAction } from "react";

// Define a type for the value that will be stored in localStorage
// type LocalStorageValue<T> = T | (() => T);

const useLocalStorage = <T>(
  key: string,
  defaultValue: T | (() => T)
): [T, Dispatch<SetStateAction<T>>] => {
  // Create state variable to store localStorage value in state
  const [localStorageValue, setLocalStorageValue] = useState<T>(() => {
    try {
      const value = localStorage.getItem(key);
      // If value is already present in localStorage then return it
      // Else set default value in localStorage and then return it
      if (value) {
        return JSON.parse(value);
      } else {
        const defaultValueFn = defaultValue instanceof Function ? defaultValue : () => defaultValue;
        const initialValue = defaultValueFn();
        localStorage.setItem(key, JSON.stringify(initialValue));
        return initialValue;
      }
    } catch (error) {
      const defaultValueFn = defaultValue instanceof Function ? defaultValue : () => defaultValue;
      const initialValue = defaultValueFn();
      localStorage.setItem(key, JSON.stringify(initialValue));
      return initialValue;
    }
  });

  // This method updates our localStorage and our state
const setLocalStorageStateValue: Dispatch<SetStateAction<T>> = (valueOrFn) => {
    let newValue: T;
    if (typeof valueOrFn === "function") {
        const fn = valueOrFn as (prevState: T) => T;
        newValue = fn(localStorageValue);
    } else {
        newValue = valueOrFn;
    }
    localStorage.setItem(key, JSON.stringify(newValue));
    setLocalStorageValue(newValue);
};


  return [localStorageValue, setLocalStorageStateValue];
};

export default useLocalStorage;
