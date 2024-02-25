import DeckList from '@/components/business/DeckList/DeckList';
import styles from '@/components/business/DynamicDeckDisplay/dynamicDeckDisplay.module.scss';
import NoCards from '@/components/business/NoCards/NoCards';
import { cardsService } from '@/container';

const DynamicDeckDisplay = () => {
  const { cards } = cardsService.fetchCards();

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
