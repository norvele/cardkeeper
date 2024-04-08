import {
  combine,
  createEffect,
  createEvent,
  createStore,
  sample,
} from 'effector';
import { cardApiService, deckApiService } from '@/container';
import { ICard, IFetchCardsArguments } from '@/types';
import { IDeck } from '@/types/deck';
import { getCountPages } from '@/utils/pages';

export const setMode = createEvent<'normal' | 'selecting'>();
export const resetSelectedCards = createEvent();
export const selectCard = createEvent<string>();
export const unSelectCard = createEvent<string>();
export const fetchCards = createEvent<IFetchCardsArguments>();
export const fetchFilteredCards = createEvent<{
  deckId: string;
  limitCards: number;
  currentPage: number;
  search: string;
}>();
export const resetCardList = createEvent();
export const setNextPage = createEvent();
export const setPage = createEvent<number>();
export const changeTextInput = createEvent<{
  deckId: string;
  limitCards: number;
  currentPage: number;
  search: string;
}>();

export const fetchEditingDeckFx = createEffect(async (id: string) => {
  return await deckApiService.getDeck(id);
});

export const fetchCardsFx = createEffect(
  async ({ deckId, limitCards, currentPage }: IFetchCardsArguments) => {
    return await cardApiService.getCards(deckId, limitCards, currentPage);
  },
);

sample({
  clock: fetchCards,
  target: fetchCardsFx,
});

export const fetchFilteredCardsFx = createEffect(
  async ({
    deckId,
    limitCards,
    currentPage,
    search,
  }: {
    deckId: string;
    limitCards: number;
    currentPage: number;
    search: string;
  }) => {
    if (search.length) {
      return await cardApiService.getFilteredCards(
        deckId,
        limitCards,
        currentPage,
        search,
      );
    }
  },
);

sample({
  clock: fetchFilteredCards,
  target: fetchFilteredCardsFx,
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
  limitCards: 13,
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
  .on(fetchFilteredCardsFx.doneData, (options, response) => {
    if (response) {
      const totalPageCount = getCountPages(
        response.headers['x-total-count'],
        options.limitCards,
      );
      return {
        ...options,
        totalCardsCount: response.headers['x-total-count'],
        totalPageCount,
      };
    }
    return options;
  })
  .on(setNextPage, (options) => {
    const nextPage = options.currentPage + 1;
    return { ...options, currentPage: nextPage };
  })
  .on(setPage, (options, page) => {
    return { ...options, currentPage: page };
  });

export const $cards = createStore<ICard[]>([])
  .on(fetchCardsFx.doneData, (cards, response) => {
    const lastDataElement = response.data[response.data.length - 1];
    const lastCardElement = cards[cards.length - 1];

    if (cards.length === 0) return response.data;
    if (lastDataElement.id === lastCardElement.id) return cards;
    return [...cards, ...response.data];
  })
  .reset(resetCardList);

export const $filteredCards = createStore<ICard[] | null>(null)
  .on(fetchFilteredCardsFx.doneData, (cards, response) => {
    if (response) {
      if (cards?.length === 0 || cards == null) return response.data;

      const lastDataElement = response.data[response.data.length - 1];
      const lastCardElement = cards[cards.length - 1];

      if (lastDataElement.id === lastCardElement.id) return cards;
      return [...cards, ...response.data];
    }
    return null;
  })
  .on(changeTextInput, () => {
    return [];
  });

export const $cardList = combine(
  $cards,
  $filteredCards,
  ($cards, $filteredCards) => {
    if ($filteredCards) {
      return $filteredCards;
    }
    return $cards;
  },
);

export const $selectedCards = createStore<string[]>([])
  .on(selectCard, (selectedCards, id) => [...selectedCards, id])
  .on(unSelectCard, (selectedCards, id) => {
    console.log(selectedCards.filter((cardId: string) => cardId !== id));
    return selectedCards.filter((cardId: string) => cardId !== id);
  })

  .reset(resetSelectedCards);

export const $textInputValue = createStore<string>('').on(
  changeTextInput,
  (_, { search }) => search,
);
