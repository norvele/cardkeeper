import { useEffect, useRef } from 'react';

export const useObserver = (
  canLoad: boolean,
  callback: () => void,
  ref: React.RefObject<HTMLDivElement>,
  isLoading: boolean,
) => {
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (isLoading) return;
    function cb(entries: IntersectionObserverEntry[]) {
      if (entries[0].isIntersecting && canLoad) {
        callback();
        if (observer.current) observer.current.disconnect();
      }
    }

    observer.current = new IntersectionObserver(cb);
    if (ref.current) observer.current.observe(ref.current);
  }, [isLoading]);
};
