import { useUnit } from 'effector-react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DeckList from '@/components/business/DeckList/DeckList';
import styles from '@/components/business/DynamicDeckDisplay/dynamicDeckDisplay.module.scss';
import NoCards from '@/components/business/NoCards/NoCards';
import { $decks, fetchDecks, fetchDecksFx } from '@/store/decksStore';
import { IDeck } from '@/types/deck';

const DynamicDeckDisplay = () => {
  const navigate = useNavigate();
  const [decks, isLoading] = useUnit([$decks, fetchDecksFx.pending]);

  useEffect(() => {
    if (decks.data === null) {
      fetchDecks();
    }
  }, []);

  function onClickOpenDeck(deck: IDeck) {
    navigate(`/learning/${deck.id}`);
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (decks.error) {
    return <div>Error (x . x)</div>;
  }

  if (decks.data?.items.length === 0) {
    return (
      <div className={styles.nocards}>
        <NoCards />
      </div>
    );
  }

  if (decks.data !== null) {
    return (
      <div className={styles.decklist}>
        <DeckList
          cardsLength={decks.data.additional.numberOfCardsToOpenMoreDecks}
          decks={decks.data.items}
          onClickOpenDeck={onClickOpenDeck}
        />
      </div>
    );
  }
};

export default DynamicDeckDisplay;
