import { FC, memo } from 'react';
import MoreIcon from '@/assets/icons/more.svg?react';
import IconButton from '@/components/UI/buttons/iconButton/IconButton';
import Checkbox from '@/components/UI/checkbox/Checkbox';
import styles from '@/components/business/MiniCardItem/miniCardItem.module.scss';
import { ICard } from '@/types';

interface MiniCardItemProps {
  children: string;
  card: ICard;
  isChecked: boolean;
  onClickMore?: (_card: ICard) => void;
  onChangeCheckbox?: (_id: string, _isChecked: boolean) => void;
}

const MiniCardItem: FC<MiniCardItemProps> = ({
  children,
  card,
  isChecked,
  onClickMore,
  onChangeCheckbox,
}) => {
  return (
    <div className={styles.container}>
      {onChangeCheckbox && (
        <Checkbox
          size="small"
          isChecked={isChecked}
          onChange={(isChecked) => {
            onChangeCheckbox(card.id, isChecked);
          }}
        />
      )}
      <p className={styles.text}>{children}</p>
      {onClickMore && (
        <IconButton
          size="smaller"
          variant="transparent"
          onClick={() => onClickMore(card)}
        >
          <MoreIcon />
        </IconButton>
      )}
    </div>
  );
};

export default memo(MiniCardItem);
