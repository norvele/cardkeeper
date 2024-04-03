import { createEffect, createEvent, createStore, sample } from 'effector';
import { cardApiService, deckApiService } from '@/container';
import { ICard, IFetchCardsActions } from '@/types';
import { IDeck } from '@/types/deck';
import { getCountPages } from '@/utils/pages';

export const setMode = createEvent<'normal' | 'selecting'>();
export const resetSelectedCards = createEvent();
export const selectCard = createEvent<string>();
export const unSelectCard = createEvent<string>();
export const fetchCards = createEvent<IFetchCardsActions>();
export const resetCardList = createEvent();
export const setNextPage = createEvent();

export const fetchEditingDeckFx = createEffect(async (id: string) => {
  return await deckApiService.getDeck(id);
});

export const fetchCardsFx = createEffect(
  async ({ deckId, limitCards, currentPage }: IFetchCardsActions) => {
    return await cardApiService.getCards(deckId, limitCards, currentPage);
  },
);

sample({
  clock: fetchCards,
  target: fetchCardsFx,
});

export const $editingDeck = createStore<IDeck | null>(null).on(
  fetchEditingDeckFx.doneData,
  (_, data) => data,
);

export const $mode = createStore<'normal' | 'selecting'>('normal').on(
  setMode,
  (_, mode) => mode,
);

export const $paginationOptions = createStore<{
  limitCards: number;
  currentPage: number;
  totalCardsCount: number | null;
  totalPageCount: number;
}>({
  limitCards: 12,
  currentPage: 1,
  totalCardsCount: null,
  totalPageCount: 0,
})
  .on(fetchCardsFx.doneData, (options, response) => {
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
  });

export const $cardList = createStore<ICard[] | null>(null)
  .on(fetchCardsFx.doneData, (cards, response) => {
    if (cards !== null) {
      const firstDataId = Number(response.data[0]?.id);
      if (cards[firstDataId - 1] === response.data[0]) return cards;
      return [...cards, ...response.data];
    }
    return response.data;
  })
  .reset(resetCardList);

export const $selectedCards = createStore<string[]>([])
  .on(selectCard, (selectedCards, id) => [...selectedCards, id])
  .on(unSelectCard, (selectedCards, id) =>
    selectedCards.filter((cardId: string) => cardId !== id),
  )
  .reset(resetSelectedCards);
