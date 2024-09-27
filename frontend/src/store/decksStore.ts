import { createEffect, createEvent, createStore, sample } from 'effector';
import { deckApiService } from '@/container';
import { IDecksData } from '@/types/deck';

export const fetchDecks = createEvent();

export const fetchDecksFx = createEffect(async () => {
  return await deckApiService.getDecks();
});

export const fetchCustomDecksFx = createEffect(async () => {
  return await deckApiService.getCustomDecks();
});

export const $decks = createStore<IDecksData | null>(null).on(
  fetchDecksFx.doneData,
  (_, data) => data,
);

export const $customDecks = createStore<IDecksData | null>(null).on(
  fetchCustomDecksFx.doneData,
  (_, data) => data,
);

sample({
  clock: fetchDecks,
  target: fetchDecksFx,
});
