import { ICard, IApiService } from '@/types/index';

const BASE_URL = 'https://api.example.com/api';

export default class CardApiService {
  protected apiService: IApiService;

  constructor(apiService: IApiService) {
    this.apiService = apiService;
  }

  public async getCards() {
    // const response = await this.apiService.get(`${BASE_URL}/cards`);
    // return await response.json();

    await new Promise((resolve) => setTimeout(resolve, 5000));
    return [
      {
        id: '1',
        frontText: 'frontText card 1',
        backText: 'backtext card 1',
        canBeInFocused: false,
      },
      {
        id: '2',
        frontText: 'frontText card 2',
        backText: 'backtext card 2',
        canBeInFocused: true,
      },
      {
        id: '3',
        frontText: 'frontText card 3',
        backText: 'backtext card 3',
        canBeInFocused: false,
      },
    ];
  }

  public async postCard(card: ICard) {
    await this.apiService.post(`${BASE_URL}/cards`, {
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(card),
    });
  }

  public async deleteCard(id: string) {
    await this.apiService.delete(`${BASE_URL}/cards/${id}`);
  }

  public async patchCard(card: ICard, id: string) {
    await this.apiService.patch(`${BASE_URL}/cards/${id}`, {
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(card),
    });
  }
}
