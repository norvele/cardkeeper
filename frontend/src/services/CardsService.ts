import { useUnit } from 'effector-react';
import { useEffect } from 'react';
import { $cards, fetchCardsEvent } from '@/store/cardsStore';

export class CardsService {
  public fetchCards() {
    const cards = useUnit($cards);
    useEffect(() => {
      fetchCardsEvent();
    }, []);
    return { cards };
  }
}
