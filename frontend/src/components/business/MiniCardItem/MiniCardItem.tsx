import { ChangeEvent, FC, memo } from 'react';
import MoreIcon from '@/assets/icons/more.svg?react';
import IconButton from '@/components/UI/buttons/iconButton/IconButton';
import Checkbox from '@/components/UI/checkbox/Checkbox';
import styles from '@/components/business/MiniCardItem/miniCardItem.module.scss';

interface MiniCardItemProps {
  children: string;
  id: string;
  isChecked: boolean;
  onClickMore?: () => void;
  onChangeCheckbox?: (
    _id: string,
    _event: ChangeEvent<HTMLInputElement>,
  ) => void;
}

const MiniCardItem: FC<MiniCardItemProps> = ({
  children,
  id,
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
          onChange={(event) => {
            onChangeCheckbox(id, event);
          }}
        />
      )}
      <p className={styles.text}>{children}</p>
      {onClickMore && (
        <IconButton size="smaller" variant="transparent" onClick={onClickMore}>
          <MoreIcon />
        </IconButton>
      )}
    </div>
  );
};

export default memo(MiniCardItem);
