import { FC, createElement } from 'react';
import ConfirmModal from '@/components/business/ConfirmModal/ConfirmModal';
import ListContextModal from '@/components/business/ListContextModal/ListContextModal';
import { modalService } from '@/container';
import { TModalName } from '@/types';

const ModalManager = () => {
  const modal = modalService.getModal();

  const modalComponentsMap = {
    confirmation: ConfirmModal,
    listContext: ListContextModal,
  } satisfies Record<TModalName, FC<any>>;

  if (modal.name) {
    return createElement<{ params: any; onClose: () => void }>(
      modalComponentsMap[modal.name],
      {
        params: modal.params,
        onClose: () => modalService.hideModal(modal.name),
      },
    );
  }
};

export default ModalManager;
