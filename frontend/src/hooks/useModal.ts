import { useRecoilState } from 'recoil';
import { modalState } from '@/store/modalStore';
import { TModal, TModalName } from '@/types/index';

export function useModal() {
  const [modal, setModal] = useRecoilState(modalState);

  function showModal(modal: TModal) {
    setModal(modal);
  }

  function hideModal(name: TModalName) {
    if (modal.name === name) {
      setModal({
        name: '',
        params: {},
      });
    }
  }

  return {
    modal,
    showModal,
    hideModal,
  };
}
