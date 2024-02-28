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
  updateInput,
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

  function onChangeInput(value: string, side: 'front' | 'back') {
    updateInput({ value, side });
  }

  function onChangeCanBeInFocusedCheckbox() {
    toggleCanBeInFocusedCheckbox();
  }

  function onClickSave() {
    saveCard();
  }

  function onChangeSwitchSide() {
    toggleSideSwitch();
  }

  if (formIsReset) {
    return (
      <CardPageLayout
        type="Create"
        onClickSave={onClickSave}
        saveButtonDisabled={saveIsLoading}
      >
        <CardForm
          type="Create"
          card={cardForm}
          side={cardSide}
          onChangeSwitchSide={onChangeSwitchSide}
          errorIsVisible={cardError.errorIsVisible}
          onChangeInput={onChangeInput}
          onChangeCanBeInFocusedCheckbox={onChangeCanBeInFocusedCheckbox}
        />
      </CardPageLayout>
    );
  }
};

export default CreateCardPage;
