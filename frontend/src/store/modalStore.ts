import { atom } from 'recoil';
import { TEmptyModal, TModal } from '@/types/index';
export const modalState = atom({
  key: 'modal',
  default: {
    name: '',
    params: {},
  } as TModal | TEmptyModal,
});
