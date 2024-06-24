import { ICard, IApiService } from '@/types/index';

const BASE_URL = 'https://api.example.com/api';

const allCards = [
  {
    id: '1',
    frontText: 'Мы остановились, чтобы он мог передохнуть',
    backText: 'backtext card 1',
    canBeInFocused: false,
  },
  {
    id: '2',
    frontText: `Я сегодня не работаю (выходной). 
      И еще очень много текста потомучто такая вот карточка.
      И еще очень много текста потомучто такая вот карточка`,
    backText: 'backtext card 2',
    canBeInFocused: true,
  },
  {
    id: '3',
    frontText: 'Сомнение',
    backText: 'backtext card 3',
    canBeInFocused: false,
  },
  {
    id: '4',
    frontText: 'Мне понадобилось 5 минут, чтобы открыть дверь',
    backText: 'backtext card',
    canBeInFocused: false,
  },
  {
    id: '5',
    frontText: 'Это справа от вас',
    backText: 'backtext card',
    canBeInFocused: true,
  },
  {
    id: '6',
    frontText:
      'Все последние (недавние) исследования показывают, что мы получаем пользу во многих аспектах, несмотря на некоторые из них коечто чтобы например',
    backText: 'backtext card',
    canBeInFocused: false,
  },
  {
    id: '7',
    frontText: 'frontText очень 7',
    backText: 'backtext card',
    canBeInFocused: false,
  },
  {
    id: '8',
    frontText: 'frontText очень 8',
    backText: 'backtext card',
    canBeInFocused: true,
  },
  {
    id: '9',
    frontText: 'frontText очень 9',
    backText: 'backtext card',
    canBeInFocused: false,
  },
  {
    id: '10',
    frontText: 'frontText очень 10',
    backText: 'backtext card',
    canBeInFocused: false,
  },
  {
    id: '11',
    frontText: 'frontText card 11',
    backText: 'backtext card',
    canBeInFocused: false,
  },
  {
    id: '12',
    frontText: 'очень card 12',
    backText: 'backtext card',
    canBeInFocused: false,
  },
  {
    id: '13',
    frontText: 'frontText card 13',
    backText: 'backtext card',
    canBeInFocused: false,
  },
  {
    id: '14',
    frontText: 'frontText очень 14',
    backText: 'backtext card',
    canBeInFocused: false,
  },
  {
    id: '15',
    frontText: 'frontText очень 15',
    backText: 'backtext card',
    canBeInFocused: false,
  },
  {
    id: '16',
    frontText: 'frontText card 16 ',
    backText: 'backtext card',
    canBeInFocused: false,
  },
  {
    id: '17',
    frontText: 'очень card 17',
    backText: 'backtext card',
    canBeInFocused: false,
  },
  {
    id: '18',
    frontText: 'frontText очень 18',
    backText: 'backtext card',
    canBeInFocused: false,
  },
  {
    id: '19',
    frontText: 'frontText card 19',
    backText: 'backtext card',
    canBeInFocused: false,
  },
  {
    id: '20',
    frontText: 'frontText card 20',
    backText: 'backtext card',
    canBeInFocused: false,
  },
  {
    id: '21',
    frontText: 'frontText очень 21',
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
    frontText: 'очень card',
    backText: 'backtext card',
    canBeInFocused: false,
  },
  {
    id: '24',
    frontText: 'frontText очень 24',
    backText: 'backtext card',
    canBeInFocused: false,
  },
  {
    id: '25',
    frontText: 'очень card 25',
    backText: 'backtext card',
    canBeInFocused: false,
  },
  {
    id: '26',
    frontText: 'frontText card 26',
    backText: 'backtext card',
    canBeInFocused: false,
  },
  {
    id: '27',
    frontText: 'очень card 27',
    backText: 'backtext card',
    canBeInFocused: false,
  },
  {
    id: '28',
    frontText: 'frontText card 28',
    backText: 'backtext card',
    canBeInFocused: false,
  },
  {
    id: '29',
    frontText: 'frontText card 29',
    backText: 'backtext card',
    canBeInFocused: false,
  },
  {
    id: '30',
    frontText: 'очень 30',
    backText: 'backtext card',
    canBeInFocused: false,
  },
  {
    id: '31',
    frontText: 'frontText card 31',
    backText: 'backtext card',
    canBeInFocused: false,
  },
  {
    id: '32',
    frontText: 'очень 32',
    backText: 'backtext card',
    canBeInFocused: false,
  },
  {
    id: '33',
    frontText: 'ОООЧень card 33',
    backText: 'backtext card',
    canBeInFocused: false,
  },
  {
    id: '34',
    frontText: 'frontText оч 34',
    backText: 'backtext card',
    canBeInFocused: false,
  },
  {
    id: '35',
    frontText: 'fronоченьext card 35',
    backText: 'backtext card',
    canBeInFocused: false,
  },
  {
    id: '36',
    frontText: 'fronоченьxt card 36',
    backText: 'backtext card',
    canBeInFocused: false,
  },
];

export default class CardApiService {
  protected apiService: IApiService;

  constructor(apiService: IApiService) {
    this.apiService = apiService;
  }

  public async getCards(deckId: string, limit: number, page: number) {
    // const response = await this.apiService.get(`${BASE_URL}/cards`);
    // return await response.json();

    await new Promise((resolve) => setTimeout(resolve, 1000));
    const firstIndex = limit * (page - 1);
    const lastIndex = limit * page - 1;

    return {
      data: allCards.slice(firstIndex, lastIndex + 1),
      headers: {
        'x-total-count': 36,
      },
    };
  }

  public async getCard(id: string) {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return allCards.find((card) => card.id === id);
  }

  public async getCardByDeckId(id: string) {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return {
      id: '20',
      frontText: 'frontText card 20',
      backText: 'backtext card 20',
      canBeInFocused: true,
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

  public async getFilteredCards(
    deckId: string,
    limit: number,
    page: number,
    searchString: string,
  ) {
    await new Promise((resolve) => setTimeout(resolve, 200));

    const filteredCards = allCards.filter((card) =>
      card.frontText.toLowerCase().includes(searchString.toLowerCase()),
    );
    const firstIndex = limit * (page - 1);
    const lastIndex = limit * page - 1;

    const result = filteredCards.slice(firstIndex, lastIndex + 1);

    return {
      data: result,
      headers: {
        'x-total-count': filteredCards.length,
      },
    };
  }

  public async getSomeCards(
    deckId: string,
    limit: number,
    page: number,
    countOfCard: number,
  ) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const cards = allCards.slice(0, countOfCard);

    const firstIndex = limit * (page - 1);
    const lastIndex = limit * page - 1;

    const result = cards.slice(firstIndex, lastIndex + 1);

    return {
      data: result,
      headers: {
        'x-total-count': cards.length,
      },
    };
  }
}
