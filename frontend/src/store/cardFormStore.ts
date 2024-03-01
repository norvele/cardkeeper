import { createEffect, createEvent, createStore, sample } from 'effector';
import { cardApiService } from '@/container';
import { ICard } from '@/types/index';

export const updateInput = createEvent<{
  side: 'front' | 'back';
  value: string;
}>();
export const resetCardForm = createEvent();
export const toggleCanBeInFocusedCheckbox = createEvent();
export const toggleSideSwitch = createEvent();
export const saveCard = createEvent();

export const resetSavingCardFormStatus = createEvent();

export const setHasError = createEvent<boolean>();
export const setErrorIsVisible = createEvent<boolean>();

export const setCardSide = createEvent<ICardSide>();

export const setIsLoading = createEvent<boolean>();

export const saveCardFx = createEffect<
  { $cardForm: ICard; $cardError: ICardError },
  boolean
>(async ({ $cardForm, $cardError }) => {
  if ($cardError.hasError) {
    setErrorIsVisible(true);

    if (!$cardForm.frontText) {
      setCardSide('front');
      return false;
    }

    if (!$cardForm.backText) {
      setCardSide('back');
      return false;
    }
    return false;
  } else {
    setIsLoading(true);
    await cardApiService.postCard($cardForm);
    setIsLoading(false);
    return true;
  }
});

export const $cardSide = createStore<'front' | 'back'>('front')
  .on(toggleSideSwitch, (cardSide) => {
    if (cardSide === 'front') {
      return 'back';
    } else {
      return 'front';
    }
  })
  .on(setCardSide, (_, cardSide) => cardSide)
  .reset(resetCardForm);

export const $savingCardFormStatus = createStore<{
  error: string;
  isDone: boolean;
}>({
  error: '',
  isDone: false,
})
  .on(saveCardFx.failData, (savingCardFormStatus, effectError) => ({
    ...savingCardFormStatus,
    error: effectError.message,
  }))
  .on(saveCardFx.doneData, (savingCardFormStatus, result) => {
    if (result) {
      return {
        ...savingCardFormStatus,
        isDone: true,
      };
    }

    return {
      ...savingCardFormStatus,
    };
  })
  .on(setIsLoading, (savingCardFormStatus, isLoading) => ({
    ...savingCardFormStatus,
    isLoading,
  }))
  .reset(resetSavingCardFormStatus);

export const $cardForm = createStore<ICard>({
  id: '',
  frontText: '',
  backText: '',
  canBeInFocused: false,
})
  .on(updateInput, (cardForm, { side, value }) => ({
    ...cardForm,
    [`${side}Text`]: value,
  }))
  .on(toggleCanBeInFocusedCheckbox, (cardForm) => ({
    ...cardForm,
    canBeInFocused: !cardForm.canBeInFocused,
  }))
  .on(saveCard, (cardForm) => ({
    ...cardForm,
    id: `${Date.now()}`,
  }))
  .reset(resetCardForm);

$cardForm.watch((cardForm) => {
  setErrorIsVisible(false);

  if (!cardForm.backText || !cardForm.frontText) {
    setHasError(true);
  } else {
    setHasError(false);
  }
});

export const $cardError = createStore<ICardError>({
  hasError: true,
  errorIsVisible: false,
})
  .on(setHasError, (cardError, hasError) => ({
    ...cardError,
    hasError,
  }))
  .on(setErrorIsVisible, (cardError, errorIsVisible) => ({
    ...cardError,
    errorIsVisible,
  }))
  .reset(resetCardForm);

sample({
  clock: saveCard,
  source: { $cardForm, $cardError },
  target: saveCardFx,
});
