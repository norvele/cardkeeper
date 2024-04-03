import { ChangeEvent, FC, memo } from 'react';
import MiniCardItem from '@/components/business/MiniCardItem/MiniCardItem';
import { ICard } from '@/types';

interface MiniCardItemLayoutProps {
  children: string;
  card: ICard;
  mode: 'normal' | 'selecting';
  onClickMore?: (_card: ICard) => void;
  onChangeCheckbox?: (
    _id: string,
    _event: ChangeEvent<HTMLInputElement>,
  ) => void;
  isChecked: boolean;
}

const MiniCardItemLayout: FC<MiniCardItemLayoutProps> = ({
  card,
  onClickMore,
  onChangeCheckbox,
  mode,
  isChecked,
}) => {
  console.log('render');

  return (
    <div>
      <MiniCardItem
        key={card.id}
        id={card.id}
        isChecked={isChecked}
        onClickMore={() => onClickMore && onClickMore(card)}
        onChangeCheckbox={mode === 'normal' ? undefined : onChangeCheckbox}
      >
        {card.frontText}
      </MiniCardItem>
    </div>
  );
};

export default memo(MiniCardItemLayout);
