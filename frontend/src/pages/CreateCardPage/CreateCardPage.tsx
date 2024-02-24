import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CardForm from '@/components/business/CardForm/CardForm';
import CardPageLayout from '@/components/business/CardPageLayout/CardPageLayout';
import { cardFormService } from '@/container';

const CreateCardPage = () => {
  const navigate = useNavigate();

  const cardSide = cardFormService.getCardSide();
  const cardForm = cardFormService.getCardForm();
  const cardError = cardFormService.getCardError();
  const savingCardFormStatus = cardFormService.getSavingCardFormStatus();

  function onChangeInputHandler(value: string, side: 'front' | 'back') {
    cardFormService.updateInput(value, side);
  }

  function onChangeCanBeInFocusedCheckboxHandler() {
    cardFormService.toggleCanBeInFocusedCheckbox();
  }

  function goBackHandler() {
    cardFormService.resetCardForm();
  }

  function saveHandler() {
    cardFormService.saveCard();
  }

  function onChangeSwitchSideHandler() {
    cardFormService.toggleSideSwitch();
  }

  useEffect(() => {
    if (!savingCardFormStatus.error && savingCardFormStatus.isDone) {
      navigate('/home');
      cardFormService.resetCardForm();
    }
  }, [savingCardFormStatus]);

  return (
    <CardPageLayout
      type="Create"
      saveHandler={saveHandler}
      goBackHandler={goBackHandler}
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
