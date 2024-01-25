import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import CardForm from '@/components/business/CardForm/CardForm';
import CardPageLayout from '@/components/business/CardPageLayout/CardPageLayout';
import {
  cardErrorState,
  cardSideState,
  newCardState,
} from '@/store/cardFormStore';

const CreateCardPage = () => {
  const navigate = useNavigate();
  const [newCard, setNewCard] = useRecoilState(newCardState);
  const [side, setSide] = useRecoilState(cardSideState);
  const [hasError, setHasError] = useRecoilState(cardErrorState);

  function setTextCard(value: string, side: 'front' | 'back') {
    const card = { ...newCard, [`${side}Text`]: value };
    setNewCard(card);
  }

  function onChangeCanBeInFocusedCheckboxHandler() {
    const card = { ...newCard, canBeInFocused: !newCard.canBeInFocused };
    setNewCard(card);
  }

  function goBackHandler() {
    setSide('front');
    setHasError(false);
    setNewCard({
      id: '',
      frontText: '',
      backText: '',
      canBeInFocused: false,
    });
  }

  function saveHandler() {
    if (!newCard.frontText) {
      setSide('front');
      setHasError(true);
    } else if (!newCard.backText) {
      setSide('back');
      setHasError(true);
    } else {
      const card = { ...newCard, id: `${Date.now()}` };
      // post card to backend

      const response = true;
      if (response) {
        navigate('/home');
      }
      setNewCard({
        id: '',
        frontText: '',
        backText: '',
        canBeInFocused: false,
      });
      setSide('front');
    }
  }

  return (
    <CardPageLayout
      type="Create"
      saveHandler={saveHandler}
      goBackHandler={goBackHandler}
    >
      <CardForm
        type="Create"
        card={newCard}
        setTextCard={setTextCard}
        side={side}
        setSide={setSide}
        hasError={hasError}
        setHasError={setHasError}
        onChangeCanBeInFocusedCheckboxHandler={
          onChangeCanBeInFocusedCheckboxHandler
        }
        saveHandler={saveHandler}
      />
    </CardPageLayout>
  );
};

export default CreateCardPage;
