import { FC } from 'react';
import styles from '@/components/business/CardGroup/cardGroup.module.scss';

interface ICardGroupProps {
  color: 'blue' | 'orange' | 'pink';
  text: string;
  count: number;
}

const CardGroup: FC<ICardGroupProps> = ({ color, count, text }) => {
  return (
    <div className={styles.note}>
      <div className={`${styles.clip} ${styles[color]}`} />
      <div className={styles.sheet}>
        <div className={styles.info}>
          <div className={`${styles.counter} ${styles[color]}`}>{count}</div>
          <div className={styles.title}>{text}</div>
        </div>
      </div>
      <div className={`${styles.shadow} ${styles[color]}`} />
    </div>
  );
};

export default CardGroup;
