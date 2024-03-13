import { createEffect, createEvent, createStore, sample } from 'effector';
import { cardApiService, deckApiService } from '@/container';
import { TCardSide } from '@/types/cardForm';
import { IDeck } from '@/types/deck';
import { ICard } from '@/types/index';

interface ILearningCardStore {
  data: ICard | null;
  error: string;
}

interface IOpenedDeckStore {
  data: IDeck | null;
  error: string;
}

export const resetCards = createEvent();

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
  clock: fetchOpenedDeck,
  target: fetchOpenedDeckFx,
});

export const $learningCard = createStore<ILearningCardStore>({
  data: null,
  error: '',
})
  .on(fetchLearningCardFx.doneData, (learningCard, data) => ({
    ...learningCard,
    data,
  }))
  .on(fetchLearningCardFx.failData, (learningCard, error) => ({
    ...learningCard,
    error: error.message,
  }))
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
