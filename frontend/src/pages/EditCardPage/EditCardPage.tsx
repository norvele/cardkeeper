import { useUnit } from 'effector-react';
import { useNavigate, useParams } from 'react-router-dom';
import CardForm from '@/components/business/CardForm/CardForm';
import CardPageLayout from '@/components/business/CardPageLayout/CardPageLayout';
import Resolver from '@/components/business/Resolver/Resolver';
import {
  $cardError,
  $cardForm,
  $cardSide,
  fetchEditingCard,
  fetchEditingCardFx,
  resetCardForm,
  saveCard,
  toggleCanBeInFocusedCheckbox,
  toggleSideSwitch,
  updateInput,
} from '@/store/cardFormStore';

const EditCardPage = () => {
  const navigate = useNavigate();

  const [cardForm, loadingEditingCard] = useUnit([
    $cardForm,
    fetchEditingCardFx.pending,
  ]);
  const cardSide = useUnit($cardSide);
  const cardError = useUnit($cardError);

  const { id } = useParams();

  function resolverCallback() {
    resetCardForm();
    if (id) {
      fetchEditingCard(id);
    }
  }

  function onChangeInput(value: string, side: 'front' | 'back') {
    updateInput({ value, side });
  }

  function onChangeCanBeInFocusedCheckbox() {
    toggleCanBeInFocusedCheckbox();
  }

  function onClickGoToBack() {
    navigate(-1);
  }

  function onClickReplaceCard() {
    saveCard('edit');
  }

  function onChangeSwitchSide() {
    toggleSideSwitch();
  }

  return (
    <Resolver callback={resolverCallback} loading={loadingEditingCard}>
      <CardPageLayout
        type="Edit"
        onClickGoToBack={onClickGoToBack}
        onClickSaveCard={onClickReplaceCard}
        saveButtonDisabled={false}
      >
        <CardForm
          type="Edit"
          card={cardForm}
          side={cardSide}
          onChangeSwitchSide={onChangeSwitchSide}
          errorIsVisible={cardError.errorIsVisible}
          onChangeInput={onChangeInput}
          onChangeCanBeInFocusedCheckbox={onChangeCanBeInFocusedCheckbox}
          checkboxIsChecked={cardForm.canBeInFocused}
        />
      </CardPageLayout>
    </Resolver>
  );
};

export default EditCardPage;
