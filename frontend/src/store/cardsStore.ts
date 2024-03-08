import { createEffect, createEvent, createStore, sample } from 'effector';
import { cardApiService } from '@/container';
import { ICard } from '@/types/index';

interface ICardsStore {
  data: ICard[] | null;
  error: string;
}

interface ILearningCardStore {
  data: ICard | null;
  error: string;
}

export const fetchCards = createEvent();
export const resetCards = createEvent();

export const fetchCardsFx = createEffect(async () => {
  return await cardApiService.getCards();
});

export const fetchLearningCard = createEvent<string>();

export const fetchLearningCardFx = createEffect(async (id: string) => {
  return await cardApiService.getCardByDeckId(id);
});

export const toggleLearningCardSide = createEvent();
export const setLearningCardIsFliped = createEvent<boolean>();
export const resetLearningCard = createEvent();

export const $cards = createStore<ICardsStore>({ data: null, error: '' })
  .on(fetchCardsFx.doneData, (cards, data) => ({
    ...cards,
    data,
  }))
  .on(fetchCardsFx.failData, (cards, error) => ({
    ...cards,
    error: error.message,
  }))
  .reset(resetCards);

sample({
  clock: fetchCards,
  target: fetchCardsFx,
});

export const $learningCard = createStore<ILearningCardStore>({
  data: null,
  error: '',
})
  .on(fetchLearningCardFx.doneData, (learningCard, data) => ({
    ...learningCard,
    data,
  }))
  .on(fetchCardsFx.failData, (learningCard, error) => ({
    ...learningCard,
    error: error.message,
  }))
  .reset(resetLearningCard);

sample({
  clock: fetchLearningCard,
  target: fetchLearningCardFx,
});

export const $learningCardSide = createStore<ICardSide>('front')
  .on(toggleLearningCardSide, (learningCardSide) => {
    if (learningCardSide === 'front') {
      return 'back';
    } else {
      return 'front';
    }
  })
  .reset(resetLearningCard);

export const $learningCardIsFliped = createStore<boolean>(false)
  .on(setLearningCardIsFliped, (_, isFliped) => isFliped)
  .reset(resetLearningCard);
