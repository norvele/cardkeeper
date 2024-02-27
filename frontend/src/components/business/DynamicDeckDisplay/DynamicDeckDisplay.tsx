import { useUnit } from 'effector-react';
import { useEffect } from 'react';
import DeckList from '@/components/business/DeckList/DeckList';
import styles from '@/components/business/DynamicDeckDisplay/dynamicDeckDisplay.module.scss';
import NoCards from '@/components/business/NoCards/NoCards';
import { $cards, fetchCards } from '@/store/cardsStore';

const DynamicDeckDisplay = () => {
  const cards = useUnit($cards);

  useEffect(() => {
    fetchCards();
  }, []);

  if (cards.isLoading) {
    return <div>Loading...</div>;
  }

  if (cards.error) {
    return <div>Error (x . x)</div>;
  }

  return (
    <>
      {cards.data.length === 0 ? (
        <main className={styles.nocards}>
          <NoCards />
        </main>
      ) : (
        <main className={styles.decklist}>
          <DeckList cardsLength={cards.data.length} />
        </main>
      )}
    </>
  );
};

export default DynamicDeckDisplay;
