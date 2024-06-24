import { createEffect, createEvent, createStore, sample } from 'effector';
import { deckApiService } from '@/container';
import { createCardListStore } from '@/store/cardListDeckSettingsStore';
import { ICard } from '@/types';

interface ISaveDeckParams {
  deckId: string;
  cardList: ICard[];
}

export const resetInput = createEvent();
export const changeTextInput = createEvent<string>();
export const setInputValueIsValid = createEvent<boolean>();
export const saveDeck = createEvent<ISaveDeckParams>();

export const saveDeckFx = createEffect(
  async ({ deckId, cardList }: ISaveDeckParams) => {
    return await deckApiService.patchDeck(deckId, cardList);
  },
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

export const $inputValueIsValid = createStore<boolean>(true)
  .on(setInputValueIsValid, (_, isValid) => {
    return isValid;
  })
  .reset(resetInput);

sample({
  clock: saveDeck,
  target: saveDeckFx,
});

export const {
  $cardList,
  $paginationOptions,
  resetCardList,
  fetchCardsWithReset,
  fetchCardsFx,
  setNextPage,
} = createCardListStore();
