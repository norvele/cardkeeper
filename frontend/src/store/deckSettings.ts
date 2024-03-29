import { createEffect, createEvent, createStore, sample } from 'effector';
import { deckApiService } from '@/container';
import { IDeck } from '@/types/deck';

export const setMode = createEvent<'normal' | 'selecting'>();

export const fetchEditingDeck = createEvent<string>();

export const fetchEditingDeckFx = createEffect(async (id: string) => {
  return await deckApiService.getDeck(id);
});

export const $editingDeck = createStore<IDeck | null>(null).on(
  fetchEditingDeckFx.doneData,
  (_, data) => data,
);

export const $mode = createStore<'normal' | 'selecting'>('normal').on(
  setMode,
  (_, mode) => mode,
);

sample({
  clock: fetchEditingDeck,
  target: fetchEditingDeckFx,
});
