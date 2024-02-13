import DeckList from '@/components/business/DeckList/DeckList';
import styles from '@/components/business/DynamicDeckDisplay/dynamicDeckDisplay.module.scss';
import NoCards from '@/components/business/NoCards/NoCards';
import useCards from '@/hooks/useCards';
import { ICardState } from '@/types/index';

const DynamicDeckDisplay = () => {
  const { getCards } = useCards();
  const cards: ICardState = getCards();

  if (cards.isLoading) {
    return <div>Loading...</div>;
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
