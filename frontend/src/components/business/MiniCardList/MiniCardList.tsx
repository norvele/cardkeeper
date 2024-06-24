import { FC, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import MiniCardItem from '@/components/business/MiniCardItem/MiniCardItem';
import styles from '@/components/business/MiniCardList/miniCardList.module.scss';
import { ICard } from '@/types';

interface IMiniCardListProps {
  cardList: ICard[];
  selectedCards?: string[];
  currentPage: number;
  totalPageCount: number;
  cardsIsLoading: boolean;
  onClickMore?: (_card: ICard) => void;
  onNextPage: () => void;
  onChangeCheckbox?: (_id: string, _isChecked: boolean) => void;
}

const MiniCardList: FC<IMiniCardListProps> = ({
  cardList,
  currentPage,
  totalPageCount,
  cardsIsLoading,
  selectedCards,
  onClickMore,
  onNextPage,
  onChangeCheckbox,
}) => {
  const { ref, inView, entry } = useInView({ threshold: 0 });

  useEffect(() => {
    const canLoad = currentPage < totalPageCount;
    const isLoading = cardsIsLoading || !cardList?.length;

    if (entry?.isIntersecting && canLoad && !isLoading) {
      onNextPage();
    }
  }, [inView]);

  return (
    <div className={styles.cards}>
      {cardList.map((card) => (
        <MiniCardItem
          card={card}
          key={card.id}
          isChecked={selectedCards ? selectedCards.includes(card.id) : false}
          onChangeCheckbox={onChangeCheckbox}
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
