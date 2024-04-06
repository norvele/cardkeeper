export interface ICard {
  id: string;
  frontText: string;
  backText: string;
  canBeInFocused: boolean;
}

export interface ICardState {
  data: ICard[];
  error: string;
  isLoading: boolean;
}

export interface ILearningCardData {
  card: ICard;
  deck: IDeck;
}

export interface IFetchCardsArguments {
  deckId: string;
  limitCards: number;
  currentPage: number;
}

export interface ICardListStore {
  data: ICard[];
  headers: {
    'x-total-count': number;
  };
}
