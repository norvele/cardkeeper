import { useUnit } from 'effector-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CardForm from '@/components/business/CardForm/CardForm';
import CardPageLayout from '@/components/business/CardPageLayout/CardPageLayout';
import {
  $cardError,
  $cardForm,
  $cardSide,
  $savingCardFormStatus,
  resetCardForm,
  resetSavingCardFormStatus,
  saveCard,
  saveCardFx,
  toggleCanBeInFocusedCheckbox,
  toggleSideSwitch,
  updateInputEvent,
} from '@/store/cardFormStore';

const CreateCardPage = () => {
  const [formIsReset, setFormIsReset] = useState(false);

  const navigate = useNavigate();

  const cardSide = useUnit($cardSide);
  const cardForm = useUnit($cardForm);
  const cardError = useUnit($cardError);
  const [savingCardFormStatus, saveIsLoading] = useUnit([
    $savingCardFormStatus,
    saveCardFx.pending,
  ]);

  useEffect(() => {
    resetCardForm();
    setFormIsReset(true);
  }, []);

  useEffect(() => {
    if (savingCardFormStatus.isDone) {
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
    toggleSideSwitch();
  }

  if (formIsReset) {
    return (
      <CardPageLayout
        type="Create"
        saveHandler={saveHandler}
        saveButtonDisabled={saveIsLoading}
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
  }
};

export default CreateCardPage;
