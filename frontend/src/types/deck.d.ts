export interface IDeck {
  name: string;
  numberOfCard: number;
  color: 'blue' | 'orange' | 'pink';
  id: string;
}

export interface IDecksData {
  items: IDeck[];
  additional: {
    numberOfCardsToOpenMoreDecks: number;
  };
  pagination: object;
}
