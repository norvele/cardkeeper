import { createEffect, createEvent, createStore, sample } from 'effector';
import { cardApiService } from '@/container';
import { ICard } from '@/types/index';

interface ICardsStore {
  data: ICard[];
  isLoading: boolean;
  error: string;
  isFetched: boolean;
}

export const fetchCardsEvent = createEvent();
export const resetCardsEvent = createEvent();

export const fetchCardsFx = createEffect<any, any>(() =>
  cardApiService.getCards(),
);

sample({
  clock: fetchCardsEvent,
  target: fetchCardsFx,
});

export const $cards = createStore<ICardsStore>({
  data: [],
  isLoading: true,
  error: '',
  isFetched: false,
})
  .on(fetchCardsFx.doneData, (cards, data) => ({
    ...cards,
    data: data,
  }))
  .reset(resetCardsEvent);
