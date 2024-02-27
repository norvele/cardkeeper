import { createEvent, createStore } from 'effector';
import { TEmptyModal, TModal, TModalName } from '@/types';

export const showModal = createEvent<TModal>();
export const hideModal = createEvent<TModalName>();

export const $modal = createStore<TModal | TEmptyModal>({
  name: '',
  params: {},
})
  .on(showModal, (_, newModal) => newModal)
  .reset(hideModal);
