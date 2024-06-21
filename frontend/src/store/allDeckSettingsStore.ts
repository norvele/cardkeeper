import { createEvent, createStore } from 'effector';
import { createCardListStore } from '@/store/cardListDeckSettingsStore';

export const setMode = createEvent<'normal' | 'selecting'>();
export const changeTextInput = createEvent<string>();
export const setInputValueIsValid = createEvent<boolean>();
export const resetInput = createEvent();

export const $mode = createStore<'normal' | 'selecting'>('normal').on(
  setMode,
  (_, mode) => mode,
);

export const $textInputValue = createStore<string>('')
  .on(changeTextInput, (_, value) => value)
  .reset(resetInput);

$textInputValue.watch((value) => {
  if (isNaN(Number(value)) || !value) {
    setInputValueIsValid(false);
    return;
  }

  setInputValueIsValid(true);
});

export const {
  $cardList,
  $paginationOptions,
  $selectedCards,
  resetSelectedCards,
  selectCard,
  unSelectCard,
  fetchSearchedCardsFx,
  resetCardList,
  setNextPage,
} = createCardListStore();
