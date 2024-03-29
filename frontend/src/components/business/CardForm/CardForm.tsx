import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/UI/buttons/button/Button';
import LabeledCheckbox from '@/components/UI/labeledCheckbox/LabeledCheckbox';
import CardEditor from '@/components/business/CardEditor/CardEditor';
import styles from '@/components/business/CardForm/cardForm.module.scss';
import Divider from '@/components/business/Divider/Divider';
import { showModal } from '@/store/modalStore';
import { ICard } from '@/types/index';

interface ICardFormProps {
  type: 'Edit' | 'Create';
  card: ICard;
  side: 'back' | 'front';
  errorIsVisible: boolean;
  checkboxIsChecked: boolean;
  onChangeInput: (_value: string, _side: 'front' | 'back') => void;
  onChangeSwitchSide: () => void;
  onChangeCanBeInFocusedCheckbox: () => void;
}

const CardForm: FC<ICardFormProps> = ({
  type,
  card,
  side,
  errorIsVisible,
  checkboxIsChecked,
  onChangeInput,
  onChangeSwitchSide,
  onChangeCanBeInFocusedCheckbox,
}) => {
  // const { deleteCard } = useCards();
  const navigate = useNavigate();
  // function deleteHandler(id: string) {
  //   const sucessfully = deleteCard(id);
  //   if (sucessfully) {
  //     navigate('/home');
  //   }
  // }

  function onClickDelete() {
    showModal({
      name: 'confirmation',
      params: {
        notification: 'Are you sure you want to delete this card?',
        textButton: 'Delete',
        callback: null,
      },
    });
  }

  return (
    <form className={styles.form}>
      <div className={styles.card}>
        <CardEditor
          card={card}
          side={side}
          errorIsVisible={errorIsVisible}
          onChangeInput={onChangeInput}
          onChangeSwitchSide={onChangeSwitchSide}
        />
      </div>
      <Divider />
      <div className={styles.checkbox}>
        <LabeledCheckbox
          onChange={onChangeCanBeInFocusedCheckbox}
          isChecked={checkboxIsChecked}
          size="normal"
        >
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
