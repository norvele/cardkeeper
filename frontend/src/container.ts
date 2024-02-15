import ApiService from '@/API/ApiService';
import CardApiService from '@/API/CardApiService';
import { CardsService } from '@/services/cardsService';
import { ModalService } from '@/services/modalService';

const apiService = new ApiService();

export const cardApiService = new CardApiService(apiService);
export const modalService = new ModalService();
export const cardsService = new CardsService();
