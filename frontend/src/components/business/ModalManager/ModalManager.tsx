import { useUnit } from 'effector-react';
import { FC, createElement } from 'react';
import ConfirmModal from '@/components/business/ConfirmModal/ConfirmModal';
import ListContextModal from '@/components/business/ListContextModal/ListContextModal';
import { $modal, hideModal } from '@/store/modalStore';
import { TModalName } from '@/types';

const ModalManager = () => {
  const modal = useUnit($modal);

  const modalComponentsMap = {
    confirmation: ConfirmModal,
    listContext: ListContextModal,
  } satisfies Record<TModalName, FC<any>>;

  if (modal.name) {
    return createElement<{ params: any; onClose: () => void }>(
      modalComponentsMap[modal.name],
      {
        params: modal.params,
        onClose: () => hideModal(modal.name),
      },
    );
  }
};

export default ModalManager;
