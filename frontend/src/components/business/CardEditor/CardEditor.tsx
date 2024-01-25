import clsx from 'clsx';
import { FC, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { SetterOrUpdater } from 'recoil';
import styles from '@/components/business/CardEditor/cardEditor.module.scss';
import SidePanel from '@/components/business/SidePanel/SidePanel';
import { ICard } from '@/types/Card';

interface ICardProps {
  card: ICard;
  side: 'back' | 'front';
  setSide: SetterOrUpdater<'back' | 'front'>;
  hasError: boolean;
  setHasError: SetterOrUpdater<boolean>;
  setTextCard: (_value: string, _side: 'front' | 'back') => void;
}

const Card: FC<ICardProps> = ({
  setTextCard,
  side,
  setSide,
  hasError,
  setHasError,
}) => {
  const [inputValue, setInputValue] = useState({ front: '', back: '' });

  function toggleSwitch() {
    side === 'front' ? setSide('back') : setSide('front');
    setHasError(false);
  }

  function onFocusHandler() {
    setHasError(false);
  }

  function onChangeHandler(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setInputValue({ ...inputValue, [side]: event.target.value });
    setTextCard(inputValue[side], side);
  }

  return (
    <div
      className={clsx(styles.note, {
        [styles.invalid]: hasError,
      })}
    >
      <TextareaAutosize
        className={styles.textarea}
        placeholder={`Type on the ${side} side...`}
        value={inputValue[side]}
        onChange={(event) => onChangeHandler(event)}
        onFocus={onFocusHandler}
      />
      <SidePanel onSwitchChange={toggleSwitch} side={side} />
    </div>
  );
};

export default Card;
