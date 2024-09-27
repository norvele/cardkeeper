import { useUnit } from 'effector-react';
import { useNavigate, useParams } from 'react-router-dom';
import CardForm from '@/components/business/CardForm/CardForm';
import CardPageLayout from '@/components/business/CardPageLayout/CardPageLayout';
import Resolver from '@/components/business/Resolver/Resolver';
import {
  $cardError,
  $cardForm,
  $cardSide,
  addInCustomDeckEvent,
  deleteFromCustomDeckEvent,
  fetchEditingCardFx,
  resetCardForm,
  saveCard,
  toggleCanBeInFocusedCheckbox,
  toggleSideSwitch,
  updateInput,
} from '@/store/cardFormStore';
import { $customDecks, fetchCustomDecksFx } from '@/store/decksStore';
import { IDeck } from '@/types/deck';

const EditCardPage = () => {
  const navigate = useNavigate();

  const [cardForm, fetchEditingCard, addInCustomDeck, deleteFromCustomDeck] =
    useUnit([
      $cardForm,
      fetchEditingCardFx,
      addInCustomDeckEvent,
      deleteFromCustomDeckEvent,
    ]);
  const [customDecks, fetchCustomDecks] = useUnit([
    $customDecks,
    fetchCustomDecksFx,
  ]);
  const cardSide = useUnit($cardSide);
  const cardError = useUnit($cardError);

  const { id } = useParams() as { id: string };

  const resolverCallbacks = [
    resetCardForm,
    () => fetchEditingCard(id),
    () => {
      if (cardForm.customDecks) {
        fetchCustomDecks();
      }
    },
  ];

  function onChangeInput(value: string, side: 'front' | 'back') {
    updateInput({ value, side });
  }

  function onChangeCanBeInFocusedCheckbox() {
    toggleCanBeInFocusedCheckbox();
  }

  function onChangeCustomDeckCheckbox(deck: IDeck, isChecked: boolean) {
    if (isChecked) {
      addInCustomDeck(deck);
    } else {
      deleteFromCustomDeck(deck);
    }
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
    <Resolver callbacks={resolverCallbacks}>
      <CardPageLayout
        type="Edit"
        onClickGoToBack={onClickGoToBack}
        onClickSaveCard={onClickReplaceCard}
        saveButtonIsDisabled={false}
      >
        <CardForm
          type="Edit"
          card={cardForm}
          side={cardSide}
          customDecks={customDecks?.items}
          onChangeSwitchSide={onChangeSwitchSide}
          errorIsVisible={cardError.errorIsVisible}
          onChangeInput={onChangeInput}
          onChangeCanBeInFocusedCheckbox={onChangeCanBeInFocusedCheckbox}
          onChangeCustomDeckCheckbox={onChangeCustomDeckCheckbox}
          checkboxIsChecked={cardForm.canBeInFocused}
        />
      </CardPageLayout>
    </Resolver>
  );
};

export default EditCardPage;
