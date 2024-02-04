import { useNavigate } from 'react-router-dom';
import CardForm from '@/components/business/CardForm/CardForm';
import CardPageLayout from '@/components/business/CardPageLayout/CardPageLayout';
import useCardForm from '@/hooks/useCardForm';

const CreateCardPage = () => {
  const {
    cardForm,
    cardSide,
    cardError,
    resetCard,
    toggleSideSwitch,
    toggleCanBeInFocusedCheckbox,
    updateInput,
    saveCard,
  } = useCardForm();
  const navigate = useNavigate();

  function onChangeInputHandler(value: string, side: 'front' | 'back') {
    updateInput(value, side);
  }

  function onChangeCanBeInFocusedCheckboxHandler() {
    toggleCanBeInFocusedCheckbox();
  }

  function goBackHandler() {
    resetCard();
  }

  function saveHandler() {
    const isSuccessfully = saveCard();
    if (isSuccessfully) {
      navigate('/home');
    }
  }

  function onChangeSwitchSideHandler() {
    toggleSideSwitch();
  }

  return (
    <CardPageLayout
      type="Create"
      saveHandler={saveHandler}
      goBackHandler={goBackHandler}
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
