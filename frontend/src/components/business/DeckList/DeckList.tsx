import { FC } from 'react';
import Deck from '@/components/business/Deck/Deck';
import styles from '@/components/business/DeckList/deckList.module.scss';
import { IDeck } from '@/types/deck';

interface IDeckListProps {
  cardsLength: number;
  decks: IDeck[];
  onClickOpenDeck: (_deck: IDeck) => void;
}

const DeckList: FC<IDeckListProps> = ({
  cardsLength,
  decks,
  onClickOpenDeck,
}) => {
  return (
    <div className={styles.list}>
      <div className={styles.cards}>
        {decks.map((deck) => (
          <Deck
            key={deck.id}
            color={deck.color}
            text={deck.name}
            count={deck.numberOfCard}
            onClick={() => onClickOpenDeck(deck)}
          />
        ))}
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
