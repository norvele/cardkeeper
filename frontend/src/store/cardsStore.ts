import { createEffect, createEvent, createStore, sample } from 'effector';
import { cardApiService } from '@/container';
import { ICard } from '@/types/index';

interface ICardsStore {
  data: ICard[];
  isLoading: boolean;
  error: string;
}

export const fetchCardsEvent = createEvent();
export const resetCardsEvent = createEvent();

export const fetchCardsFx = createEffect(() => cardApiService.getCards());

sample({
  clock: fetchCardsEvent,
  target: fetchCardsFx,
});

export const $cards = createStore<ICardsStore>({
  data: [],
  isLoading: true,
  error: '',
})
  .on(fetchCardsFx.doneData, (cards, data) => ({
    ...cards,
    data: data,
  }))
  .on(fetchCardsFx.failData, (cards, fetchError) => ({
    ...cards,
    error: fetchError.message,
  }))
  .on(fetchCardsFx.finally, (cards) => ({
    ...cards,
    isLoading: false,
  }))
  .reset(resetCardsEvent);
