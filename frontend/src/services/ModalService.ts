import { useUnit } from 'effector-react';
import { $modal, hideModalEvent, showModalEvent } from '@/store/modalStore';
import { TModal, TModalName } from '@/types';

export class ModalService {
  public showModal(modal: TModal) {
    showModalEvent(modal);
  }

  public hideModal(name: TModalName) {
    hideModalEvent(name);
  }

  public getModal() {
    const modal = useUnit($modal);
    return modal;
  }
}
