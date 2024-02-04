import clsx from 'clsx';
import { FC } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import styles from '@/components/business/CardEditor/cardEditor.module.scss';
import SidePanel from '@/components/business/SidePanel/SidePanel';
import { ICard } from '@/types/Card';

interface ICardEditorProps {
  card: ICard;
  side: 'back' | 'front';
  errorIsVisible: boolean;
  onChangeInputHandler: (_value: string, _side: 'front' | 'back') => void;
  onChangeSwitchSideHandler: () => void;
}

const CardEditor: FC<ICardEditorProps> = ({
  card,
  side,
  errorIsVisible,
  onChangeInputHandler,
  onChangeSwitchSideHandler,
}) => {
  return (
    <div
      className={clsx(styles.note, {
        [styles.invalid]: errorIsVisible,
      })}
    >
      <TextareaAutosize
        className={styles.textarea}
        placeholder={`Type on the ${side} side...`}
        value={card[`${side}Text`]}
        onChange={(event) => onChangeInputHandler(event.target.value, side)}
      />
      <SidePanel onSwitchChange={onChangeSwitchSideHandler} side={side} />
    </div>
  );
};

export default CardEditor;
