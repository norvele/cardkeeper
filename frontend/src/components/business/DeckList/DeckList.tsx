import { FC } from 'react';
import Deck from '@/components/business/Deck/Deck';
import styles from '@/components/business/DeckList/deckList.module.scss';

interface IDeckListProps {
  cardsLength: number;
}

const DeckList: FC<IDeckListProps> = ({ cardsLength }) => {
  return (
    <div className={styles.list}>
      <div className={styles.cards}>
        <Deck color="blue" text="All card" count={cardsLength} />
        {cardsLength >= 20 && (
          <>
            <Deck color="orange" text="Focused" count={64} />
            <Deck color="pink" text="Recently added" count={15} />{' '}
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

export default DeckList;
