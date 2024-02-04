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
