import { FC } from 'react';
import { SetterOrUpdater, useSetRecoilState } from 'recoil';
import Button from '@/components/UI/buttons/button/Button';
import LabeledCheckbox from '@/components/UI/labeledCheckbox/LabeledCheckbox';
import CardEditor from '@/components/business/CardEditor/CardEditor';
import styles from '@/components/business/CardForm/cardForm.module.scss';
import Divider from '@/components/business/Divider/Divider';
import { modalState } from '@/store/modalStore';
import { ICard } from '@/types/Card';

interface ICardFormProps {
  type: 'Edit' | 'Create';
  card: ICard;
  side: 'back' | 'front';
  setSide: SetterOrUpdater<'back' | 'front'>;
  hasError: boolean;
  setHasError: SetterOrUpdater<boolean>;
  saveHandler: () => void;
  setTextCard: (_value: string, _side: 'front' | 'back') => void;
  onChangeCanBeInFocusedCheckboxHandler: () => void;
}

const CardForm: FC<ICardFormProps> = ({
  type,
  card,
  side,
  setSide,
  hasError,
  setHasError,
  setTextCard,
  onChangeCanBeInFocusedCheckboxHandler,
}) => {
  const setModal = useSetRecoilState(modalState);

  function showModal() {
    setModal('confirm');
  }

  return (
    <form className={styles.form}>
      <div className={styles.card}>
        <CardEditor
          card={card}
          setTextCard={setTextCard}
          side={side}
          setSide={setSide}
          hasError={hasError}
          setHasError={setHasError}
        />
      </div>
      <Divider />
      <div className={styles.checkbox}>
        <LabeledCheckbox onChange={onChangeCanBeInFocusedCheckboxHandler}>
          Can be in the focused deck
        </LabeledCheckbox>
      </div>
      {type === 'Edit' && (
        <>
          <Divider />
          <div className={styles.delete}>
            <Button
              size="regular"
              variant="default"
              fontColor="red"
              onClick={showModal}
            >
              Delete card
            </Button>
          </div>
        </>
      )}
    </form>
  );
};

export default CardForm;
