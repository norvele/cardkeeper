import { createEffect, createEvent, createStore, sample } from 'effector';
import { cardApiService } from '@/container';
import { ICard } from '@/types/index';

export const updateInputEvent = createEvent<{
  side: 'front' | 'back';
  value: string;
}>();
export const resetCardFormEvent = createEvent();
export const toggleCanBeInFocusedCheckboxEvent = createEvent();
export const toggleSideSwitchEvent = createEvent();
export const saveCardEvent = createEvent();

export const setHasErrorEvent = createEvent<boolean>();
export const setErrorIsVisibleEvent = createEvent<boolean>();

export const setCardSideEvent = createEvent<ICardSide>();

export const setIsLoading = createEvent<boolean>();

export const saveCardFx = createEffect<
  { $cardForm: ICard; $cardError: ICardError },
  boolean
>(async ({ $cardForm, $cardError }) => {
  if ($cardError.hasError) {
    setErrorIsVisibleEvent(true);

    if (!$cardForm.frontText) {
      setCardSideEvent('front');
      return false;
    }

    if (!$cardForm.backText) {
      setCardSideEvent('back');
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

export const $savingCardFormStatus = createStore<{
  error: string;
  isDone: boolean;
  isLoading: boolean;
}>({
  error: '',
  isDone: false,
  isLoading: false,
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
  .reset(resetCardFormEvent);

export const $cardForm = createStore<ICard>({
  id: '',
  frontText: '',
  backText: '',
  canBeInFocused: false,
})
  .on(updateInputEvent, (cardForm, { side, value }) => ({
    ...cardForm,
    [`${side}Text`]: value,
  }))
  .on(toggleCanBeInFocusedCheckboxEvent, (cardForm) => ({
    ...cardForm,
    canBeInFocused: !cardForm.canBeInFocused,
  }))
  .on(saveCardEvent, (cardForm) => ({
    ...cardForm,
    id: `${Date.now()}`,
  }))
  .reset(resetCardFormEvent);

$cardForm.watch((cardForm) => {
  setErrorIsVisibleEvent(false);

  if (!cardForm.backText || !cardForm.frontText) {
    setHasErrorEvent(true);
  } else {
    setHasErrorEvent(false);
  }
});

export const $cardSide = createStore<'front' | 'back'>('front')
  .on(toggleSideSwitchEvent, (cardSide) => {
    if (cardSide === 'front') {
      return 'back';
    } else {
      return 'front';
    }
  })
  .on(setCardSideEvent, (_, cardSide) => cardSide)
  .reset(resetCardFormEvent);

export const $cardError = createStore<ICardError>({
  hasError: true,
  errorIsVisible: false,
})
  .on(setHasErrorEvent, (cardError, hasError) => ({
    ...cardError,
    hasError,
  }))
  .on(setErrorIsVisibleEvent, (cardError, errorIsVisible) => ({
    ...cardError,
    errorIsVisible,
  }))
  .reset(resetCardFormEvent);

sample({
  clock: saveCardEvent,
  source: { $cardForm, $cardError },
  target: saveCardFx,
});
