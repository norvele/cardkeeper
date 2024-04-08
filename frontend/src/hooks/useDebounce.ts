import { useState } from 'react';

export const useDebounce = () => {
  const [timer, setTimer] = useState<number>();

  return (callback: () => void, ms: number) => {
    clearTimeout(timer);

    const newTimer = setTimeout(() => {
      callback();
    }, ms);

    setTimer(newTimer);
  };
};
