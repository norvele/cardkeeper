import ApiService from '@/API/ApiService';
import CardApiService from '@/API/CardApiService';
import DeckApiService from '@/API/DeckApiService';

const apiService = new ApiService();

export const cardApiService = new CardApiService(apiService);
export const deckApiService = new DeckApiService(apiService);
