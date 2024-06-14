import { FC } from 'react';
import styles from '@/components/business/FullCardItem/fullCardItem.module.scss';

interface IFullCardItemProps {
  text: string;
}

const FullCardItem: FC<IFullCardItemProps> = ({ text }) => {
  return (
    <div className={styles.card}>
      <p className={styles.text}>{text}</p>
    </div>
  );
};

export default FullCardItem;
