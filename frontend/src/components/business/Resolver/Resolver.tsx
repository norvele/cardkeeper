import { FC, ReactNode, useEffect, useState } from 'react';

interface IResolverProps {
  loading?: boolean;
  callback: () => void;
  children: ReactNode;
}

const Resolver: FC<IResolverProps> = ({ callback, loading, children }) => {
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    callback();
    setIsDone(true);
  }, []);

  if (!isDone || loading) {
    return <div>Loading...</div>;
  }

  if (isDone && !loading) {
    return children;
  }
};

export default Resolver;
