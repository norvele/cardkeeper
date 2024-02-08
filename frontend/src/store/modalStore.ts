import { atom } from 'recoil';
import { IConfirmationModal, IListContextModal } from '@/types/index';

export const confirmationModalState = atom({
  key: 'confirmationModal',
  default: {
    name: '',
    params: {
      notification: '',
      textButton: '',
      callback: null,
    },
  } as IConfirmationModal,
});

export const listContextModalState = atom({
  key: 'listContextModal',
  default: {
    name: '',
    params: {},
  } as IListContextModal,
});
