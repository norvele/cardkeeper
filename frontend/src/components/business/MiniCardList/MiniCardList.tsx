import { useUnit } from 'effector-react';
import { FC, useCallback, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import MiniCardItem from '@/components/business/MiniCardItem/MiniCardItem';
import styles from '@/components/business/MiniCardList/miniCardList.module.scss';
import {
  $selectedCards,
  resetSelectedCards,
  selectCard,
  unSelectCard,
} from '@/store/allDeckSettingsStore';
import { ICard } from '@/types';

interface IMiniCardListProps {
  cardList: ICard[];
  mode: 'normal' | 'selecting';
  currentPage: number;
  totalPageCount: number;
  cardsIsLoading: boolean;
  onClickMore?: (_card: ICard) => void;
  onNextPage: () => void;
}

const MiniCardList: FC<IMiniCardListProps> = ({
  cardList,
  mode,
  currentPage,
  totalPageCount,
  cardsIsLoading,
  onClickMore,
  onNextPage,
}) => {
  const { ref, inView, entry } = useInView({ threshold: 0 });

  const selectedCards = useUnit($selectedCards);

  useEffect(() => {
    const canLoad = currentPage < totalPageCount;
    const isLoading = cardsIsLoading || !cardList?.length;

    if (entry?.isIntersecting && canLoad && !isLoading) {
      onNextPage();
    }
  }, [inView]);

  useEffect(() => {
    if (mode === 'normal') resetSelectedCards();
  }, []);

  const cachedOnChangeCheckbox = useCallback(function onChangeCheckbox(
    id: string,
    isChecked: boolean,
  ) {
    if (isChecked) {
      selectCard(id);
    } else {
      unSelectCard(id);
    }
  }, []);

  return (
    <div className={styles.cards}>
      {cardList.map((card) => (
        <MiniCardItem
          card={card}
          key={card.id}
          isChecked={selectedCards.includes(card.id)}
          onChangeCheckbox={
            mode === 'normal' ? undefined : cachedOnChangeCheckbox
          }
          onClickMore={onClickMore}
        >
          {card.frontText}
        </MiniCardItem>
      ))}
      <div className={styles.lastElement} ref={ref} />
    </div>
  );
};

export default MiniCardList;
