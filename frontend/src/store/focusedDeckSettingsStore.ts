import { createEffect, createEvent, createStore, sample } from 'effector';
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

export const fetchCards = createEvent<{
  deckId: string;
  limitCards: number;
  currentPage: number;
  value?: string;
}>();
export const resetCardList = createEvent();
export const resetInput = createEvent();
export const setNextPage = createEvent();
export const changeTextInput = createEvent<string>();
export const setInputValueIsValid = createEvent<boolean>();
export const saveDeck = createEvent<ISaveDeckParams>();

export const fetchCardsFx = createEffect(
  async ({ deckId, limitCards, currentPage, value }: IFetchCardsParams) => {
    if (!value) {
      console.log('if 1');
      const result = await cardApiService.getCards(
        deckId,
        limitCards,
        currentPage,
      );
      changeTextInput(String(result.headers['x-total-count']));
      return result;
    }

    if (!isNaN(Number(value))) {
      console.log('if 2');
      const countOfCard = Number(value);
      return await cardApiService.getFocusedCards(
        deckId,
        limitCards,
        currentPage,
        countOfCard,
      );
    }
  },
);

sample({
  clock: fetchCards,
  target: fetchCardsFx,
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
  .on(setNextPage, (options) => {
    const nextPage = options.currentPage + 1;
    return { ...options, currentPage: nextPage };
  })
  .reset(resetCardList);

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
  .reset(resetCardList);

export const $textInputValue = createStore<string>('')
  .on(changeTextInput, (_, value) => value)
  .reset(resetInput);

export const $inputValueIsValid = createStore<boolean>(true)
  .on(setInputValueIsValid, (_, isValid) => isValid)
  .reset(resetInput);