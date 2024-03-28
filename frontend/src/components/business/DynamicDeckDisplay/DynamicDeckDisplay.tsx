import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import DeckList from '@/components/business/DeckList/DeckList';
import styles from '@/components/business/DynamicDeckDisplay/dynamicDeckDisplay.module.scss';
import NoCards from '@/components/business/NoCards/NoCards';
import { IDeck, IDecksData } from '@/types/deck';

interface IDynamicDeckDisplay {
  decks: IDecksData | null;
}

const DynamicDeckDisplay: FC<IDynamicDeckDisplay> = ({ decks }) => {
  const navigate = useNavigate();

  function onClickOpenDeck(deck: IDeck) {
    navigate(`/learning/${deck.id}`);
  }

  if (decks?.items.length === 0) {
    return (
      <div className={styles.nocards}>
        <NoCards />
      </div>
    );
  }

  return (
    <div className={styles.decklist}>
      {decks && (
        <DeckList
          cardsLength={decks.additional.numberOfCardsToOpenMoreDecks}
          decks={decks.items}
          onClickOpenDeck={onClickOpenDeck}
        />
      )}
    </div>
  );
};

export default DynamicDeckDisplay;
