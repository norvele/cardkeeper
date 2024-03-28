import { FC } from 'react';
import BroodingIcon from '@/assets/emoji/brooding.svg?react';
import HandIcon from '@/assets/emoji/hand.svg?react';
import OkIcon from '@/assets/emoji/ok.svg?react';
import FlipIcon from '@/assets/icons/flip.svg?react';
import IconButton from '@/components/UI/buttons/iconButton/IconButton';
import styles from '@/components/business/LearningPanel/learningPanel.module.scss';

interface ILearningPanelProps {
  isFlipped: boolean;
  loading: boolean;
  onClickFlipCard: () => void;
  onClickForgot: () => void;
  onClickKnow: () => void;
  onClickRotateCard: () => void;
}

const LearningPanel: FC<ILearningPanelProps> = ({
  isFlipped,
  loading,
  onClickFlipCard,
  onClickForgot,
  onClickKnow,
  onClickRotateCard,
}) => {
  return (
    <>
      {isFlipped == false && (
        <div className={styles.frontButton}>
          <IconButton
            size="large"
            variant="secondary"
            disabled={loading}
            onClick={onClickFlipCard}
          >
            <HandIcon width={30} height={30} />
            <span>Flip Card</span>
          </IconButton>
        </div>
      )}
      {isFlipped === true && (
        <div className={styles.backButtons}>
          <IconButton size="large" variant="secondary" onClick={onClickForgot}>
            <BroodingIcon width={30} height={30} />
            <span>Forgot</span>
          </IconButton>
          <IconButton size="large" variant="secondary" onClick={onClickKnow}>
            <OkIcon width={30} height={30} />
            <span>Know</span>
          </IconButton>
          <div className={styles.flip}>
            <IconButton
              size="medium"
              variant="secondary"
              onClick={onClickRotateCard}
            >
              <FlipIcon />
            </IconButton>
          </div>
        </div>
      )}
    </>
  );
};

export default LearningPanel;
