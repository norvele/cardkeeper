import { FC } from 'react';
import CardGroup from '@/components/business/CardGroup/CardGroup';
import styles from '@/components/business/CardGroupList/cardGroupList.module.scss';

interface ICardGroupListProps {
  cardsLength: number;
}

const CardGroupList: FC<ICardGroupListProps> = ({ cardsLength }) => {
  return (
    <div className={styles.list}>
      <div className={styles.cards}>
        <CardGroup color="blue" text="All card" count={cardsLength} />
        {cardsLength >= 20 && (
          <>
            <CardGroup color="orange" text="Focused" count={64} />
            <CardGroup color="pink" text="Recently added" count={15} />{' '}
          </>
        )}
      </div>
      {cardsLength < 20 && (
        <div className={styles.more}>
          Add {20 - cardsLength} more card to unlock more decks
        </div>
      )}
    </div>
  );
};

export default CardGroupList;
