import { FC } from 'react';
import PenIcon from '@/assets/icons/pen.svg?react';
import IconButton from '@/components/UI/buttons/iconButton/IconButton';
import styles from '@/components/business/LearningCard/learningCard.module.scss';

interface ILearningCardProps {
  text?: string;
  editingIsDisabled: boolean;
  onClickEditCard: () => void;
}

const LearningCard: FC<ILearningCardProps> = ({
  text,
  editingIsDisabled,
  onClickEditCard,
}) => {
  return (
    <div className={styles.card}>
      <div className={`${styles.sheet} ${styles.whiteSheet}`}>
        <div className={styles.edit}>
          <IconButton
            size="small"
            variant="transparent"
            disabled={editingIsDisabled}
            onClick={onClickEditCard}
          >
            <PenIcon />
          </IconButton>
        </div>
        <p className={styles.text}>{text}</p>
      </div>
      <div className={`${styles.sheet} ${styles.blueSheet}`} />
      <div className={`${styles.sheet} ${styles.orangeSheet}`} />
    </div>
  );
};

export default LearningCard;
