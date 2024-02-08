import { useRecoilState } from 'recoil';
import {
  confirmationModalState,
  listContextModalState,
} from '@/store/modalStore';
import { TModal, TModalName } from '@/types/index';

export function useModal() {
  const [confirmationModal, setConfirmationModal] = useRecoilState(
    confirmationModalState,
  );
  const [listContextModal, setlistContextModal] = useRecoilState(
    listContextModalState,
  );

  function showModal(modal: TModal) {
    switch (modal.name) {
      case 'confirmation':
        setConfirmationModal({ ...modal });
        break;
      case 'listContext': {
        setlistContextModal({ ...modal });
        break;
      }
    }
  }

  function hideModal(name: TModalName) {
    switch (name) {
      case 'confirmation':
        setConfirmationModal({
          name: '',
          params: {
            notification: '',
            textButton: '',
            callback: null,
          },
        });
        break;
      case 'listContext':
        setlistContextModal({
          name: '',
          params: {},
        });
    }
  }

  const currentModal = confirmationModal.name || listContextModal.name;

  return {
    currentModal,
    confirmationModalParams: confirmationModal.params,
    listContextModallParams: listContextModal.params,
    showModal,
    hideModal,
  };
}
