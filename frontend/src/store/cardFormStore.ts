import { atom } from 'recoil';
import { ICard } from '@/types/Card';

export const newCardState = atom({
  key: 'NewCard',
  default: {
    id: '',
    frontText: '',
    backText: '',
    canBeInFocused: false,
  } as ICard,
});

export const cardSideState = atom({
  key: 'CardSide',
  default: 'front' as 'front' | 'back',
});

export const cardErrorState = atom({
  key: 'CardError',
  default: false as boolean,
});
