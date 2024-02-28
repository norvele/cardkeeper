import clsx from 'clsx';
import { FC } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import styles from '@/components/business/CardEditor/cardEditor.module.scss';
import SidePanel from '@/components/business/SidePanel/SidePanel';
import { ICard } from '@/types/index';

interface ICardEditorProps {
  card: ICard;
  side: 'back' | 'front';
  errorIsVisible: boolean;
  onChangeInput: (_value: string, _side: 'front' | 'back') => void;
  onChangeSwitchSide: () => void;
}

const CardEditor: FC<ICardEditorProps> = ({
  card,
  side,
  errorIsVisible,
  onChangeInput,
  onChangeSwitchSide,
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
        onChange={(event) => onChangeInput(event.target.value, side)}
      />
      <SidePanel onChangeSwitchSide={onChangeSwitchSide} side={side} />
    </div>
  );
};

export default CardEditor;
