import { useUnit } from 'effector-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CardForm from '@/components/business/CardForm/CardForm';
import CardPageLayout from '@/components/business/CardPageLayout/CardPageLayout';
import {
  $cardError,
  $cardForm,
  $savingCardFormStatus,
  resetCardForm,
  resetSavingCardFormStatus,
  saveCard,
  toggleCanBeInFocusedCheckbox,
  updateInputEvent,
} from '@/store/cardFormStore';

const CreateCardPage = () => {
  const navigate = useNavigate();

  const [cardSide, setCardSide] = useState<'front' | 'back'>('front');
  const cardForm = useUnit($cardForm);
  const cardError = useUnit($cardError);
  const savingCardFormStatus = useUnit($savingCardFormStatus);

  useEffect(() => {
    resetCardForm();
  }, []);

  useEffect(() => {
    if (!savingCardFormStatus.error && savingCardFormStatus.isDone) {
      navigate('/home');
      resetSavingCardFormStatus();
    }
  }, [savingCardFormStatus]);

  function onChangeInputHandler(value: string, side: 'front' | 'back') {
    updateInputEvent({ value, side });
  }

  function onChangeCanBeInFocusedCheckboxHandler() {
    toggleCanBeInFocusedCheckbox();
  }

  function saveHandler() {
    saveCard();
  }

  function onChangeSwitchSideHandler() {
    if (cardSide === 'front') {
      setCardSide('back');
    } else {
      setCardSide('front');
    }
  }

  return (
    <CardPageLayout
      type="Create"
      saveHandler={saveHandler}
      saveButtonDisabled={savingCardFormStatus.isLoading}
    >
      <CardForm
        type="Create"
        card={cardForm}
        side={cardSide}
        onChangeSwitchSideHandler={onChangeSwitchSideHandler}
        errorIsVisible={cardError.errorIsVisible}
        onChangeInputHandler={onChangeInputHandler}
        onChangeCanBeInFocusedCheckboxHandler={
          onChangeCanBeInFocusedCheckboxHandler
        }
      />
    </CardPageLayout>
  );
};

export default CreateCardPage;
