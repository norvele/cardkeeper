import ApiService from '@/API/ApiService';
import CardApiService from '@/API/CardApiService';
import { CardFormService } from '@/services/CardFormService';
import { CardsService } from '@/services/CardsService';
import { ModalService } from '@/services/ModalService';

const apiService = new ApiService();

export const cardApiService = new CardApiService(apiService);
export const modalService = new ModalService();
export const cardsService = new CardsService();
export const cardFormService = new CardFormService();
