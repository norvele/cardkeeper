import { createEffect, createEvent, createStore, sample } from 'effector';
import { deckApiService } from '@/container';
import { IDeck, IDecksData } from '@/types/deck';

interface IDecksStore {
  data: IDecksData | null;
  error: string;
}

interface IOpenedDeckStore {
  data: IDeck | null;
  error: string;
}

export const fetchDecks = createEvent();
export const fetchOpenedDeck = createEvent<string>();

export const fetchDecksFx = createEffect(async () => {
  return await deckApiService.getDecks();
});

export const fetchOpenedDeckFx = createEffect(async (id: string) => {
  return await deckApiService.getDeck(id);
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

export const $openedDeck = createStore<IOpenedDeckStore>({
  data: null,
  error: '',
})
  .on(fetchOpenedDeckFx.doneData, (openedDeck, data) => ({
    ...openedDeck,
    data,
  }))
  .on(fetchOpenedDeckFx.failData, (openedDeck, error) => ({
    ...openedDeck,
    error: error.message,
  }));

sample({
  clock: fetchDecks,
  target: fetchDecksFx,
});

sample({
  clock: fetchOpenedDeck,
  target: fetchOpenedDeckFx,
});
