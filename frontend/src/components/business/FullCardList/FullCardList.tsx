import { FC } from 'react';
import CustomCardAdder from '@/components/business/CustomCardAdder/CustomCardAdder';
import FullCardItem from '@/components/business/FullCardItem/FullCardItem';
import styles from '@/components/business/FullCardList/fullCardList.module.scss';
import { ICard } from '@/types';

interface IFullCardListProps {
  cards: ICard[];
}

const FullCardList: FC<IFullCardListProps> = ({ cards }) => {
  return (
    <div className={styles.list}>
      <CustomCardAdder />
      {cards.map((card) => {
        return (
          <FullCardItem text={card.frontText} key={card.id} mode={'selected'} />
        );
      })}
    </div>
  );
};

export default FullCardList;
