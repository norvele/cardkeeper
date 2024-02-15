import { useUnit } from 'effector-react';
import { useEffect } from 'react';
import { $cards, fetchCardsEvent, fetchCardsFx } from '@/store/cardsStore';

export class CardsService {
  public fetchCards() {
    const [cards, loading] = useUnit([$cards, fetchCardsFx.pending]);
    useEffect(() => {
      fetchCardsEvent();
    }, []);
    return { cards, loading };
  }
}
