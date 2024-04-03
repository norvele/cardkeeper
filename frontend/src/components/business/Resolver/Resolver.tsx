import { FC, ReactNode, useEffect, useState } from 'react';
import { IFetchCardsActions } from '@/types';

interface IResolverProps {
  callbacks: (() => Promise<unknown> | void | IFetchCardsActions)[];
  children: ReactNode;
}

const Resolver: FC<IResolverProps> = ({ callbacks, children }) => {
  const [isDone, setIsDone] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const promises = callbacks.map((callback) => callback());
        await Promise.all(promises);
      } catch (error) {
        if (error instanceof Error) {
          setError(error);
        }
      } finally {
        setIsDone(true);
      }
    })();
  }, []);

  if (error) {
    return <div>{`${error}`}</div>;
  }

  if (!isDone) {
    return <div>Loading...</div>;
  }

  if (isDone) {
    return children;
  }
};

export default Resolver;
