import { IApiService, ICard } from '@/types';
import { IDeck, IDecksData } from '@/types/deck';

const BASE_URL = 'https://api.example.com/api';

const decks: IDeck[] = [
  {
    name: 'All cards',
    numberOfCard: 72,
    color: 'blue',
    id: '1',
  },
  {
    name: 'Focused',
    numberOfCard: 20,
    color: 'orange',
    id: '2',
  },
  {
    name: 'Recently added',
    numberOfCard: 12,
    color: 'pink',
    id: '3',
  },
];

export default class DeckApiService {
  protected apiService: IApiService;

  constructor(apiService: IApiService) {
    this.apiService = apiService;
  }

  public async getDecks(): Promise<IDecksData> {
    // const response = await this.apiService.get(`${BASE_URL}/decks`);
    // return await response.json();

    await new Promise((resolve) => setTimeout(resolve, 200));
    return {
      items: decks,
      additional: {
        numberOfCardsToOpenMoreDecks: 72,
      },
      pagination: {},
    };
  }

  public async getDeck(id: string): Promise<IDeck> {
    await new Promise((resolve) => setTimeout(resolve, 200));

    const deck = decks.find((deck) => {
      return deck.id === id;
    }) as IDeck;
    return deck;
  }

  // export interface IOptions {
  //   headers: {
  //     'Content-Type': string;
  //   };
  //   body: string;
  // }

  public async patchDeck(deckId: string, cardList: ICard[]) {
    const response = await this.apiService.patch(
      `${BASE_URL}/decks/${deckId}`,
      {
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(cardList),
      },
    );
    return response;
  }
}
