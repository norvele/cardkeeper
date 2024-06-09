import { useUnit } from 'effector-react';
import { FC, useCallback, useEffect } from 'react';
import MiniCardItem from '@/components/business/MiniCardItem/MiniCardItem';
import styles from '@/components/business/MiniCardList/miniCardList.module.scss';
import {
  $selectedCards,
  resetSelectedCardsEvent,
  selectCardEvent,
  unSelectCardEvent,
} from '@/store/deckSettingsStore';
import { ICard } from '@/types';

interface IMiniCardListProps {
  cardList: ICard[];
  mode: 'normal' | 'selecting';
  onClickMore?: (_card: ICard) => void;
}

const MiniCardList: FC<IMiniCardListProps> = ({
  cardList,
  onClickMore,
  mode,
}) => {
  const selectedCards = useUnit($selectedCards);
  const [resetSelectedCards, selectCard, unSelectCard] = useUnit([
    resetSelectedCardsEvent,
    selectCardEvent,
    unSelectCardEvent,
  ]);

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
    </div>
  );
};

export default MiniCardList;
