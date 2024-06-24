import { createEffect, createEvent, createStore, sample } from 'effector';
import { cardApiService } from '@/container';
import { ICard } from '@/types';
import { getCountPages } from '@/utils/pages';

interface IFetchCardsParams {
  deckId: string;
  limitCards: number;
  currentPage: number;
  value: string;
}

export function createCardListStore() {
  const selectCard = createEvent<string>();
  const unSelectCard = createEvent<string>();
  const resetSelectedCards = createEvent();
  const fetchCardsWithReset = createEvent<IFetchCardsParams>();
  const resetCardList = createEvent();
  const setNextPage = createEvent();

  const fetchSearchedCardsFx = createEffect(
    async ({ deckId, limitCards, currentPage, value }: IFetchCardsParams) => {
      return await cardApiService.getFilteredCards(
        deckId,
        limitCards,
        currentPage,
        value,
      );
    },
  );

  const fetchCardsFx = createEffect(
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

  const $selectedCards = createStore<string[]>([])
    .on(selectCard, (selectedCards, id) => [...selectedCards, id])
    .on(unSelectCard, (selectedCards, id) => {
      return selectedCards.filter((cardId: string) => cardId !== id);
    })
    .reset(resetSelectedCards);

  const $paginationOptions = createStore<{
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
    .on(
      [fetchSearchedCardsFx.doneData, fetchCardsFx.doneData],
      (options, response) => {
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
      },
    )
    .on(setNextPage, (options) => {
      const nextPage = options.currentPage + 1;
      return { ...options, currentPage: nextPage };
    })
    .reset(resetCardList);

  const $cardList = createStore<ICard[]>([])
    .on(
      [fetchCardsFx.doneData, fetchSearchedCardsFx.doneData],
      (cards, response) => {
        if (!response) return cards;

        if (cards.length === 0) return response.data;
        if (!response.headers['x-total-count']) return [];

        const lastDataElement = response.data[response.data.length - 1];
        const lastCardElement = cards[cards.length - 1];

        if (lastDataElement.id === lastCardElement.id) return cards;
        return [...cards, ...response.data];
      },
    )
    .reset(resetCardList);

  sample({
    clock: fetchCardsWithReset,
    filter: ({ value }) => {
      if (isNaN(Number(value)) || !value) {
        return false;
      }

      return true;
    },
    target: [fetchCardsFx, resetCardList],
  });

  return {
    $paginationOptions,
    $cardList,
    $selectedCards,
    selectCard,
    unSelectCard,
    resetSelectedCards,
    fetchCardsFx,
    fetchSearchedCardsFx,
    fetchCardsWithReset: fetchCardsWithReset,
    resetCardList: resetCardList,
    setNextPage: setNextPage,
  };
}
