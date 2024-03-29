import { useUnit } from 'effector-react';
import { FC, createElement } from 'react';
import CardListContextModal from '@/components/business/CardListContextModal/CardListContextModal';
import ConfirmModal from '@/components/business/ConfirmModal/ConfirmModal';
import { $modal, hideModal } from '@/store/modalStore';
import { TModalName } from '@/types';

const ModalManager = () => {
  const modal = useUnit($modal);

  const modalComponentsMap = {
    confirmation: ConfirmModal,
    cardListContext: CardListContextModal,
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
