import { createEvent, createStore } from 'effector';
import { TEmptyModal, TModal, TModalName } from '@/types';

export const showModalEvent = createEvent<TModal>();
export const hideModalEvent = createEvent<TModalName>();

export const $modal = createStore<TModal | TEmptyModal>({
  name: '',
  params: {},
})
  .on(showModalEvent, (_, newModal) => newModal)
  .reset(hideModalEvent);
