import { IApiService } from '@/types';
import { IDeck } from '@/types/deck';

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

  public async getDecks(): Promise<IDeck[]> {
    // const response = await this.apiService.get(`${BASE_URL}/decks`);
    // return await response.json();

    await new Promise((resolve) => setTimeout(resolve, 200));
    return decks;
  }

  public async getDeck(id: string): Promise<IDeck> {
    await new Promise((resolve) => setTimeout(resolve, 200));

    const deck = decks.find((deck) => {
      return deck.id === id;
    }) as IDeck;
    return deck;
  }
}
