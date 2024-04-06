import { FC } from 'react';
import styles from '@/components/business/MiniCardSkeleton/miniCardSkeleton.module.scss';
import { randomInteger } from '@/utils/random';

interface IMiniCardSkeleton {
  count: number;
}

const MiniCardSkeleton: FC<IMiniCardSkeleton> = ({ count }) => {
  const items = () => {
    const arr = [];
    const baseHeight = 18;

    for (let i = 0; i < count; i++) {
      const height = `${baseHeight * randomInteger(1, 4) + 18}px`;
      arr.push(<div className={`${styles.item}`} style={{ height }} key={i} />);
    }
    return arr;
  };

  return items();
};

export default MiniCardSkeleton;
