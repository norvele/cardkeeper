import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/UI/buttons/button/Button';
import LabeledCheckbox from '@/components/UI/labeledCheckbox/LabeledCheckbox';
import CardEditor from '@/components/business/CardEditor/CardEditor';
import styles from '@/components/business/CardForm/cardForm.module.scss';
import Divider from '@/components/business/Divider/Divider';
import useCards from '@/hooks/useCards';
import { useModal } from '@/hooks/useModal';
import { ICard } from '@/types/Card';

interface ICardFormProps {
  type: 'Edit' | 'Create';
  card: ICard;
  side: 'back' | 'front';
  errorIsVisible: boolean;
  onChangeInputHandler: (_value: string, _side: 'front' | 'back') => void;
  onChangeSwitchSideHandler: () => void;
  onChangeCanBeInFocusedCheckboxHandler: () => void;
}

const CardForm: FC<ICardFormProps> = ({
  type,
  card,
  side,
  errorIsVisible,
  onChangeInputHandler,
  onChangeSwitchSideHandler,
  onChangeCanBeInFocusedCheckboxHandler,
}) => {
  const { showModal } = useModal();
  const { deleteCard } = useCards();
  const navigate = useNavigate();

  function deleteHandler(id: string) {
    const sucessfully = deleteCard(id);
    if (sucessfully) {
      navigate('/home');
    }
  }

  function onClickDelete() {
    showModal('confirm', {
      notification: 'Are you sure you want to delete this card?',
      textButton: 'Delete',
      callback: () => deleteHandler(card.id),
    });
  }

  return (
    <form className={styles.form}>
      <div className={styles.card}>
        <CardEditor
          card={card}
          side={side}
          errorIsVisible={errorIsVisible}
          onChangeInputHandler={onChangeInputHandler}
          onChangeSwitchSideHandler={onChangeSwitchSideHandler}
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
              onClick={onClickDelete}
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