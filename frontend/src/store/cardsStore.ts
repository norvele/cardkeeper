import { selector } from 'recoil';
import { ICard } from '@/types/Card';

export const cardsState = selector({
  key: 'Cards',
  get: async () => {
    await new Promise((resolve) => setTimeout(resolve, 5000));
    const response: ICard[] = [
      {
        id: '1',
        frontText: 'frontText',
        backText: 'backText',
        canBeInFocused: true,
      },
      {
        id: '2',
        frontText: 'frontText2',
        backText: 'backText2',
        canBeInFocused: false,
      },
      {
        id: '3',
        frontText: 'frontText3',
        backText: 'backText3',
        canBeInFocused: true,
      },
    ];
    return response;
  },
});
