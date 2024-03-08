import { FC } from 'react';
import styles from '@/components/business/Deck/deck.module.scss';

interface IDeckProps {
  color: 'blue' | 'orange' | 'pink';
  text: string;
  count: number;
  onClick: (_group: string) => void;
}

const Deck: FC<IDeckProps> = ({ color, count, text, onClick }) => {
  return (
    <div className={styles.deck} onClick={() => onClick(text)}>
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

export default Deck;
