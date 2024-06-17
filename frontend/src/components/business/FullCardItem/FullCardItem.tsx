import { FC } from 'react';
import CheckIcon from '@/assets/icons/check_circle_outline.svg?react';
import styles from '@/components/business/FullCardItem/fullCardItem.module.scss';

interface IFullCardItemProps {
  text: string;
  mode: 'selected' | 'normal';
}

const FullCardItem: FC<IFullCardItemProps> = ({ text, mode }) => {
  return (
    <div className={`${styles.card} ${styles[mode]}`}>
      {mode === 'selected' && (
        <div className={styles.icon}>
          <CheckIcon />
        </div>
      )}
      <p className={styles.text}>{text}</p>
    </div>
  );
};

export default FullCardItem;
