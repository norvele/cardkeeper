import { atom } from 'recoil';

export const modalState = atom({
  key: 'Modal',
  default: '' as 'confirm' | '',
});
