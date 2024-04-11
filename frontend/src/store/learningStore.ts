import { createEffect, createEvent, createStore, sample } from 'effector';
import { cardApiService, deckApiService } from '@/container';
import { TCardSide } from '@/types/cardForm';
import { IDeck } from '@/types/deck';
import { ICard } from '@/types/index';

export const fetchLearningCard = createEvent<string>();

export const fetchLearningCardFx = createEffect(async (id: string) => {
  return await cardApiService.getCardByDeckId(id);
});

export const fetchOpenedDeck = createEvent<string>();

export const fetchOpenedDeckFx = createEffect(async (id: string) => {
  return await deckApiService.getDeck(id);
});

export const toggleLearningCardSide = createEvent();
export const setLearningCardIsFlipped = createEvent<boolean>();
export const resetLearningCard = createEvent();

export const $openedDeck = createStore<IDeck | null>(null).on(
  fetchOpenedDeckFx.doneData,
  (_, data) => data,
);

sample({
  clock: fetchOpenedDeck,
  target: fetchOpenedDeckFx,
});

export const $learningCard = createStore<ICard | null>(null)
  .on(fetchLearningCardFx.doneData, (_, data) => data)
  .reset(resetLearningCard);

sample({
  clock: fetchLearningCard,
  target: fetchLearningCardFx,
});

export const $learningCardSide = createStore<TCardSide>('front')
  .on(toggleLearningCardSide, (learningCardSide) => {
    if (learningCardSide === 'front') {
      return 'back';
    } else {
      return 'front';
    }
  })
  .reset(resetLearningCard);

export const $learningCardIsFlipped = createStore<boolean>(false)
  .on(setLearningCardIsFlipped, (_, isFlipped) => isFlipped)
  .reset(resetLearningCard);
