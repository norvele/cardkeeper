import { ICard } from '@/types/Card';
const BASE_URL = 'https://api.example.com/api';

interface IOptions {
  headers: {
    'Content-Type': string;
  };
  body: string;
}

interface IApiService {
  get: (_url: string) => Promise<Response>;
  post: (_url: string, _options: IOptions) => Promise<Response>;
  delete: (_url: string) => Promise<Response>;
  patch: (_url: string, _options: IOptions) => Promise<Response>;
}

export default class CardApiService {
  protected ApiService: IApiService;

  constructor(ApiService: IApiService) {
    this.ApiService = ApiService;
  }

  public async getCards() {
    // const response = await this.ApiService.get(`${BASE_URL}/cards`);
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
    await this.ApiService.post(`${BASE_URL}/cards`, {
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(card),
    });
  }

  public async deleteCard(id: string) {
    await this.ApiService.delete(`${BASE_URL}/cards/${id}`);
  }

  public async patchCard(card: ICard, id: string) {
    await this.ApiService.patch(`${BASE_URL}/cards/${id}`, {
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(card),
    });
  }
}
