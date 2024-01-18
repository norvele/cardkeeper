import { FC, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import styles from '@/components/business/Card/card.module.scss';
import SidePanel from '@/components/business/SidePanel/SidePanel';
import { ICard } from '@/types/Card';

interface ICardProps {
  variant: 'primary' | 'secondary';
  card: ICard;
  onChange: (
    _event: React.ChangeEvent<HTMLTextAreaElement>,
    _side: 'frontText' | 'backText',
  ) => void;
}

const Card: FC<ICardProps> = ({ variant, card, onChange }) => {
  const [side, setSide] = useState<'front' | 'back'>('front');
  const inputValue = side === 'front' ? card.frontText : card.backText;
  const sideText = side === 'front' ? 'frontText' : 'backText';

  function toggleSwitch() {
    side === 'front' ? setSide('back') : setSide('front');
  }

  return (
    <>
      <div className={`${styles.note} ${styles[variant]}`}>
        <TextareaAutosize
          className={styles.textarea}
          placeholder={`Type on the ${side} side...`}
          value={inputValue}
          onChange={(event) => onChange(event, sideText)}
          required
        />
        {variant === 'secondary' && (
          <SidePanel onSwitchChange={toggleSwitch} side={side} />
        )}
      </div>
    </>
  );
};

export default Card;
