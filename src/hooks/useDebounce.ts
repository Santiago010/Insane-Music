import {useEffect, useState} from 'react';

export interface Props {
  input: string;
  time?: number;
}

export const useDebounce = ({input = '', time = 700}: Props) => {
  const [debounce, setDebounce] = useState(input);

  useEffect(() => {
    let timeout = setTimeout(() => {
      setDebounce(input);
    }, time);

    return () => clearTimeout(timeout);
  }, [input]);

  return debounce;
};
