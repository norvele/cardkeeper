import { FC } from 'react';
import CheckIcon from '@/assets/icons/check_circle_outline.svg?react';
import styles from '@/components/business/FullCardItem/fullCardItem.module.scss';

interface IFullCardItemProps {
  children: string;
  isSelected: boolean;
  onClick?: (_text: string, _id: string) => void;
  id?: string;
}

const FullCardItem: FC<IFullCardItemProps> = ({
  children,
  isSelected,
  onClick,
  id,
}) => {
  const mode = isSelected ? 'selected' : 'normal';

  return (
    <div
      className={`${styles.card} ${styles[mode]}`}
      onClick={() => onClick && id && onClick(children, id)}
    >
      {isSelected && (
        <div className={styles.icon}>
          <CheckIcon />
        </div>
      )}
      <p className={styles.text}>{children}</p>
    </div>
  );
};

export default FullCardItem;
