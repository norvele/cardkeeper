import { atom } from 'recoil';
import { IModal } from '@/types/Modal';

export const modalState = atom({
  key: 'Modal',
  default: {
    name: '',
    params: {
      notification: '',
      textButton: '',
      callback: null,
    },
  } as IModal,
});
