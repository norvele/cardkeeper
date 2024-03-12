import { createEffect, createEvent, createStore, sample } from 'effector';
import { cardApiService } from '@/container';
import { ICardError, TCardSide } from '@/types/cardForm';
import { ICard } from '@/types/index';

type TSaveCardAction = 'edit' | 'create';

export const updateInput = createEvent<{
  side: 'front' | 'back';
  value: string;
}>();
export const resetCardForm = createEvent();
export const resetCardSide = createEvent();
export const toggleCanBeInFocusedCheckbox = createEvent();
export const toggleSideSwitch = createEvent();
export const saveCard = createEvent<TSaveCardAction>();
export const editCard = createEvent<TCardSide>();

export const fetchEditingCard = createEvent<string>();

export const resetSavingCardFormStatus = createEvent();

export const setHasError = createEvent<boolean>();
export const setErrorIsVisible = createEvent<boolean>();

export const setCardSide = createEvent<TCardSide>();

export const setIsLoading = createEvent<boolean>();

export const saveCardFx = createEffect<
  { $cardForm: ICard; $cardError: ICardError; action: TSaveCardAction },
  boolean
>(async ({ $cardForm, $cardError, action }) => {
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
  }

  if (action === 'create') {
    await cardApiService.postCard($cardForm);
    return true;
  }

  if (action === 'edit') {
    await cardApiService.patchCard($cardForm, $cardForm.id);
    return true;
  }
  return false;
});

export const fetchEditingCardFx = createEffect(async (id: string) => {
  return await cardApiService.getCard(id);
});

export const $cardSide = createStore<TCardSide>('front')
  .on(toggleSideSwitch, (cardSide) => {
    if (cardSide === 'front') {
      return 'back';
    } else {
      return 'front';
    }
  })
  .on(setCardSide, (_, cardSide) => cardSide)
  .on(editCard, (_, side) => side)
  .reset(resetCardSide);

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
  .on(fetchEditingCardFx.doneData, (_, data) => data)
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
  fn: (source, clock) => ({ ...source, action: clock }),
  target: saveCardFx,
});

sample({
  clock: fetchEditingCard,
  target: fetchEditingCardFx,
});
