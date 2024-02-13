import { atom } from 'recoil';
import { ICard } from '@/types/index';

export const cardsState = atom({
  key: 'Cards',
  default: {
    data: [] as ICard[],
    isLoading: true as boolean,
    error: '' as string,
    isFetched: false as boolean,
  },
});
