import { useEffect, useRef } from 'react';

export const useObserver = (
  dependency: unknown,
  callback: () => void,
  ref: React.RefObject<HTMLDivElement>,
) => {
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    function cb(entries: IntersectionObserverEntry[]) {
      if (entries[0].isIntersecting) {
        callback();
        if (observer.current) observer.current.disconnect();
      }
    }

    observer.current = new IntersectionObserver(cb);
    if (ref.current) observer.current.observe(ref.current);
  }, [dependency]);
};
