import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { cardApiService } from '@/container';
import { cardsState } from '@/store/cardsStore';
import { ICardState } from '@/types/index';

export default function useCards() {
  const [cards, setCards] = useRecoilState(cardsState);

  function getCards(): ICardState {
    useEffect(() => {
      if (!cards.isFetched)
        (async () => {
          try {
            setCards((prev) => ({ ...prev, isLoading: true }));
            const result = await cardApiService.getCards();
            setCards((prev) => ({ ...prev, data: result, isFetched: true }));
          } catch (error) {
            if (error instanceof Error) {
              setCards({ ...cards, error: error.message });
            }
          } finally {
            setCards((prev) => ({ ...prev, isLoading: false }));
          }
        })();
    }, []);
    return cards;
  }

  function deleteCard(id: string) {
    let successfully = false;
    useEffect(() => {
      (async () => {
        try {
          await cardApiService.deleteCard(id);
          const newCardsData = cards.data.filter((card) => card.id !== id);
          setCards((prev) => ({ ...prev, data: newCardsData }));
          successfully = true;
        } catch (error: unknown) {
          if (error instanceof Error) {
            setCards({ ...cards, error: error.message });
          }
        }
      })();
    }, []);
    return successfully;
  }

  return { getCards, deleteCard };
}
