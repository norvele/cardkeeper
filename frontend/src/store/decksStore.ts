import { createEffect, createEvent, createStore, sample } from 'effector';
import { deckApiService } from '@/container';
import { IDecksData } from '@/types/deck';

interface IDecksStore {
  data: IDecksData | null;
  error: string;
}

export const fetchDecks = createEvent();

export const fetchDecksFx = createEffect(async () => {
  return await deckApiService.getDecks();
});

export const $decks = createStore<IDecksStore>({
  data: null,
  error: '',
})
  .on(fetchDecksFx.doneData, (decks, data) => ({
    ...decks,
    data,
  }))
  .on(fetchDecksFx.failData, (decks, error) => ({
    ...decks,
    error: error.message,
  }));

sample({
  clock: fetchDecks,
  target: fetchDecksFx,
});
