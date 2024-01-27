import { useRecoilValue } from 'recoil';
import DeckList from '@/components/business/DeckList/DeckList';
import styles from '@/components/business/DynamicDeckDisplay/dynamicDeckDisplay.module.scss';
import NoCards from '@/components/business/NoCards/NoCards';
import { cardsState } from '@/store/cardsStore';

const DynamicDeckDisplay = () => {
  const cards = useRecoilValue(cardsState);

  return (
    <>
      {cards.length === 0 ? (
        <main className={styles.nocards}>
          <NoCards />
        </main>
      ) : (
        <main className={styles.decklist}>
          <DeckList cardsLength={cards.length} />
        </main>
      )}
    </>
  );
};

export default DynamicDeckDisplay;
