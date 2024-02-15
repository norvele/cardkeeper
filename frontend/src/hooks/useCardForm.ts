import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import {
  cardErrorState,
  cardSideState,
  cardFormState,
} from '@/store/cardFormStore';

export default function useCardForm() {
  const [cardForm, setCardForm] = useRecoilState(cardFormState);
  const [cardSide, setCardSide] = useRecoilState(cardSideState);
  const [cardError, setCardError] = useRecoilState(cardErrorState);

  useEffect(() => {
    if (cardError.errorIsVisible) {
      setCardError((prev) => ({ ...prev, errorIsVisible: false }));
    }

    if (!cardForm.backText || !cardForm.frontText) {
      setCardError((prev) => ({ ...prev, hasError: true }));
    } else {
      setCardError((prev) => ({ ...prev, hasError: false }));
    }
  }, [cardForm]);

  function updateInput(value: string, side: 'front' | 'back') {
    setCardForm((prev) => ({ ...prev, [`${side}Text`]: value }));
  }

  function saveCard() {
    let isSuccessfully = false;
    (async () => {
      if (cardError.hasError) {
        setCardError((prev) => ({ ...prev, errorIsVisible: true }));

        if (!cardForm.frontText) {
          setCardSide('front');
          return;
        }

        if (!cardForm.backText) {
          setCardSide('back');
          return;
        }
      } else {
        const card = { ...cardForm, id: `${Date.now()}` };
        // await cardApiService.postCard(card);
        setCardForm({
          id: '',
          frontText: '',
          backText: '',
          canBeInFocused: false,
        });
        setCardSide('front');
        isSuccessfully = true;
      }
    })();
    return isSuccessfully;
  }

  function resetCard() {
    setCardSide('front');
    setCardError((prev) => ({ ...prev, errorIsVisible: false }));
    setCardForm({
      id: '',
      frontText: '',
      backText: '',
      canBeInFocused: false,
    });
  }

  function toggleCanBeInFocusedCheckbox() {
    setCardForm((prev) => ({ ...prev, canBeInFocused: !prev.canBeInFocused }));
  }

  function toggleSideSwitch() {
    cardSide === 'front' ? setCardSide('back') : setCardSide('front');
  }

  return {
    cardForm,
    cardSide,
    cardError,
    updateInput,
    saveCard,
    resetCard,
    toggleSideSwitch,
    toggleCanBeInFocusedCheckbox,
  };
}
