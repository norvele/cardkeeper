import { useUnit } from 'effector-react';
import { ChangeEvent, FC, useCallback, useEffect } from 'react';
import MiniCardItemLayout from '@/components/business/MiniCardItemLayout/MiniCardItemLayout';
import styles from '@/components/business/MiniCardList/miniCardList.module.scss';
import {
  $selectedCards,
  resetSelectedCards,
  selectCard,
  unSelectCard,
} from '@/store/deckSettingsStore';
import { ICard } from '@/types';

interface IMiniCardListProps {
  cardList: ICard[] | null;
  mode: 'normal' | 'selecting';
  onClickMore?: (_card: ICard) => void;
}

const MiniCardList: FC<IMiniCardListProps> = ({
  cardList,
  onClickMore,
  mode,
}) => {
  const selectedCards = useUnit($selectedCards);

  useEffect(() => {
    if (mode === 'normal') resetSelectedCards();
  }, []);

  const cashedOnChangeCheckbox = useCallback(function onChangeCheckbox(
    id: string,
    event: ChangeEvent<HTMLInputElement>,
  ) {
    if (event.target.checked) {
      selectCard(id);
    }

    if (!event.target.checked) {
      unSelectCard(id);
    }
  }, []);

  return (
    <div className={styles.cards}>
      {cardList?.map((card) => (
        <MiniCardItemLayout
          card={card}
          mode={mode}
          key={card.id}
          onChangeCheckbox={cashedOnChangeCheckbox}
          onClickMore={onClickMore}
          isChecked={selectedCards.includes(card.id)}
        >
          {card.frontText}
        </MiniCardItemLayout>
      ))}
    </div>
  );
};

export default MiniCardList;
