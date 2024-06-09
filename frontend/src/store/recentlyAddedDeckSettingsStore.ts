import { createEffect, createEvent, createStore, fork, sample } from 'effector';
import { cardApiService, deckApiService } from '@/container';
import { ICard } from '@/types';
import { getCountPages } from '@/utils/pages';

interface IFetchCardsParams {
  deckId: string;
  limitCards: number;
  currentPage: number;
  value?: string;
}

interface ISaveDeckParams {
  deckId: string;
  cardList: ICard[];
}

export const fetchCardsWithResetEvent = createEvent<{
  deckId: string;
  limitCards: number;
  currentPage: number;
  value?: string;
}>();
export const resetCardListEvent = createEvent();
export const resetInputEvent = createEvent();
export const setNextPageEvent = createEvent();
export const changeTextInputEvent = createEvent<string>();
export const setInputValueIsValidEvent = createEvent<boolean>();
export const saveDeckEvent = createEvent<ISaveDeckParams>();

export const fetchCardsFx = createEffect(
  async ({ deckId, limitCards, currentPage, value }: IFetchCardsParams) => {
    if (!value) {
      const result = await cardApiService.getCards(
        deckId,
        limitCards,
        currentPage,
      );
      return result;
    }

    if (!isNaN(Number(value))) {
      const countOfCard = Number(value);
      return await cardApiService.getSomeCards(
        deckId,
        limitCards,
        currentPage,
        countOfCard,
      );
    }
  },
);

sample({
  clock: fetchCardsWithResetEvent,
  filter: ({ value }) => {
    if (isNaN(Number(value)) || !value) {
      return false;
    }

    return true;
  },
  target: [fetchCardsFx, resetCardListEvent],
});

export const saveDeckFx = createEffect(
  async ({ deckId, cardList }: ISaveDeckParams) => {
    return await deckApiService.patchDeck(deckId, cardList);
  },
);

export const $paginationOptions = createStore<{
  limitCards: number;
  currentPage: number;
  totalCardsCount: number | null;
  totalPageCount: number;
}>({
  limitCards: 13,
  currentPage: 1,
  totalCardsCount: null,
  totalPageCount: 0,
})
  .on(fetchCardsFx.doneData, (options, response) => {
    if (!response) return options;

    const totalPageCount = getCountPages(
      response.headers['x-total-count'],
      options.limitCards,
    );
    return {
      ...options,
      totalCardsCount: response.headers['x-total-count'],
      totalPageCount,
    };
  })
  .on(setNextPageEvent, (options) => {
    const nextPage = options.currentPage + 1;
    return { ...options, currentPage: nextPage };
  })
  .reset(resetCardListEvent);

export const $cardList = createStore<ICard[]>([])
  .on(fetchCardsFx.doneData, (cards, response) => {
    if (!response) return cards;

    if (cards.length === 0) return response.data;
    if (!response.headers['x-total-count']) return [];

    const lastDataElement = response.data[response.data.length - 1];
    const lastCardElement = cards[cards.length - 1];

    if (lastDataElement.id === lastCardElement.id) return cards;
    return [...cards, ...response.data];
  })
  .reset(resetCardListEvent);

export const $textInputValue = createStore<string>('')
  .on(fetchCardsFx.doneData, (_, response) => {
    return String(response?.headers['x-total-count']);
  })
  .on(changeTextInputEvent, (_, value) => {
    return value;
  })
  .reset(resetInputEvent);

$textInputValue.watch((value) => {
  if (isNaN(Number(value)) || !value) {
    setInputValueIsValidEvent(false);
    return;
  }

  setInputValueIsValidEvent(true);
});

export const $inputValueIsValid = createStore<boolean>(true)
  .on(setInputValueIsValidEvent, (_, isValid) => {
    return isValid;
  })
  .reset(resetInputEvent);

export const recentlyAddedDeckSettingsScope = fork({
  values: [
    [$paginationOptions, $paginationOptions.getState()],
    [$cardList, $cardList.getState()],
    [$textInputValue, ''],
    [$inputValueIsValid, $inputValueIsValid.getState()],
  ],
});

// export const allDeckSettingsScope = fork({
//   values: [
//     [$paginationOptions, $paginationOptions.getState()],
//     [$cardList, $cardList.getState()],
//     [$textInputValue, $textInputValue.getState()],
//     [$inputValueIsValid, $inputValueIsValid.getState()],
//   ],
// });

// export const focusedDeckSettingsScope = fork({
//   values: [
//     [$paginationOptions, $paginationOptions.getState()],
//     [$cardList, $cardList.getState()],
//     [$textInputValue, $textInputValue.getState()],
//     [$inputValueIsValid, $inputValueIsValid.getState()],
//   ],
// });
