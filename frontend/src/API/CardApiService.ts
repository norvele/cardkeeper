import { ICard, IApiService } from '@/types/index';

const BASE_URL = 'https://api.example.com/api';

const allCards = [
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
  {
    id: '4',
    frontText: 'frontText card',
    backText: 'backtext card',
    canBeInFocused: false,
  },
  {
    id: '5',
    frontText: 'frontText card',
    backText: 'backtext card',
    canBeInFocused: true,
  },
  {
    id: '6',
    frontText: 'frontText card',
    backText: 'backtext card',
    canBeInFocused: false,
  },
  {
    id: '7',
    frontText: 'frontText card',
    backText: 'backtext card',
    canBeInFocused: false,
  },
  {
    id: '8',
    frontText: 'frontText card',
    backText: 'backtext card',
    canBeInFocused: true,
  },
  {
    id: '9',
    frontText: 'frontText card',
    backText: 'backtext card',
    canBeInFocused: false,
  },
  {
    id: '11',
    frontText: 'frontText card',
    backText: 'backtext card',
    canBeInFocused: false,
  },
  {
    id: '12',
    frontText: 'frontText card',
    backText: 'backtext card',
    canBeInFocused: false,
  },
  {
    id: '13',
    frontText: 'frontText card',
    backText: 'backtext card',
    canBeInFocused: false,
  },
  {
    id: '14',
    frontText: 'frontText card',
    backText: 'backtext card',
    canBeInFocused: false,
  },
  {
    id: '15',
    frontText: 'frontText card',
    backText: 'backtext card',
    canBeInFocused: false,
  },
  {
    id: '16',
    frontText: 'frontText card',
    backText: 'backtext card',
    canBeInFocused: false,
  },
  {
    id: '17',
    frontText: 'frontText card',
    backText: 'backtext card',
    canBeInFocused: false,
  },
  {
    id: '18',
    frontText: 'frontText card',
    backText: 'backtext card',
    canBeInFocused: false,
  },
  {
    id: '19',
    frontText: 'frontText card',
    backText: 'backtext card',
    canBeInFocused: false,
  },
  {
    id: '20',
    frontText: 'frontText card',
    backText: 'backtext card',
    canBeInFocused: false,
  },
  {
    id: '21',
    frontText: 'frontText card',
    backText: 'backtext card',
    canBeInFocused: false,
  },
  {
    id: '22',
    frontText: 'frontText card',
    backText: 'backtext card',
    canBeInFocused: false,
  },
  {
    id: '23',
    frontText: 'frontText card',
    backText: 'backtext card',
    canBeInFocused: false,
  },
];

export default class CardApiService {
  protected apiService: IApiService;

  constructor(apiService: IApiService) {
    this.apiService = apiService;
  }

  public async getCards() {
    // const response = await this.apiService.get(`${BASE_URL}/cards`);
    // return await response.json();

    await new Promise((resolve) => setTimeout(resolve, 200));
    return allCards;
  }

  public async getCard(id: string) {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return {
      id: '2',
      frontText: 'frontText card 20',
      backText: 'backtext card 20',
      canBeInFocused: true,
    };
  }

  public async getCardByDeckId(id: string) {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return {
      card: {
        id: '20',
        frontText: 'frontText card 20',
        backText: 'backtext card 20',
        canBeInFocused: true,
      },
      deck: {},
    };
  }

  public async postCard(card: ICard) {
    // await this.apiService.post(`${BASE_URL}/cards`, {
    //   headers: {
    //     'Content-Type': 'application/json;charset=utf-8',
    //   },
    //   body: JSON.stringify(card),
    // });

    await new Promise((resolve) => setTimeout(resolve, 200));
    return true;
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

  public async knowCard(id: string) {}

  public async forgotCard(id: string) {}
}
