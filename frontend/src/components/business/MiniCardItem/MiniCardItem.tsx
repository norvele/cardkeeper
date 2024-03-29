import { FC } from 'react';
import MoreIcon from '@/assets/icons/more.svg?react';
import IconButton from '@/components/UI/buttons/iconButton/IconButton';
import Checkbox from '@/components/UI/checkbox/Checkbox';
import styles from '@/components/business/MiniCardItem/miniCardItem.module.scss';

interface MiniCardItemProps {
  children: string;
  checkbox?: boolean;
  onClickMore?: () => void;
}

const MiniCardItem: FC<MiniCardItemProps> = ({
  children,
  onClickMore,
  checkbox,
}) => {
  return (
    <div className={styles.container}>
      {checkbox && (
        <Checkbox size="small" isChecked={false} onChange={() => {}} />
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

export default MiniCardItem;
