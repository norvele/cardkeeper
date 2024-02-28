import { useUnit } from 'effector-react';
import { useEffect } from 'react';
import DeckList from '@/components/business/DeckList/DeckList';
import styles from '@/components/business/DynamicDeckDisplay/dynamicDeckDisplay.module.scss';
import NoCards from '@/components/business/NoCards/NoCards';
import { $cards, fetchCards, fetchCardsFx } from '@/store/cardsStore';

const DynamicDeckDisplay = () => {
  const [cards, isLoading] = useUnit([$cards, fetchCardsFx.pending]);

  useEffect(() => {
    if (cards.data === null) {
      fetchCards();
    }
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (cards.error) {
    return <div>Error (x . x)</div>;
  }

  if (cards.data?.length === 0) {
    return (
      <main className={styles.nocards}>
        <NoCards />
      </main>
    );
  }

  if (cards.data !== null) {
    return (
      <main className={styles.decklist}>
        <DeckList cardsLength={cards.data?.length} />
      </main>
    );
  }
};

export default DynamicDeckDisplay;
