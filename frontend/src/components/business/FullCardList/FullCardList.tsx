import { FC } from 'react';
import CustomCardAdder from '@/components/business/CustomCardAdder/CustomCardAdder';
import FullCardItem from '@/components/business/FullCardItem/FullCardItem';
import styles from '@/components/business/FullCardList/fullCardList.module.scss';
import { ICard } from '@/types';

interface IFullCardListProps {
  cards: ICard[];
  selectedCards: string[];
  onClickCard: (_text: string, _id: string) => void;
}

const FullCardList: FC<IFullCardListProps> = ({
  cards,
  selectedCards,
  onClickCard,
}) => {
  return (
    <div className={styles.list}>
      <CustomCardAdder />
      {cards.map((card) => {
        return (
          <FullCardItem
            key={card.id}
            isSelected={selectedCards.includes(card.id)}
            onClick={onClickCard}
            id={card.id}
          >
            {card.frontText}
          </FullCardItem>
        );
      })}
    </div>
  );
};

export default FullCardList;
