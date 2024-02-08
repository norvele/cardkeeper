import ApiService from '@/API/ApiService';
import CardApiService from '@/API/CardApiService';

const apiService = new ApiService();

export const cardApiService = new CardApiService(apiService);
