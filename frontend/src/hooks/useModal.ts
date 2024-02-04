import { useRecoilState } from 'recoil';
import { modalState } from '@/store/modalStore';
import { IModalParams, TModalName } from '@/types/Modal';

export function useModal() {
  const [modal, setModal] = useRecoilState(modalState);

  function showModal(name: TModalName, params: IModalParams) {
    setModal({ name, params });
  }

  function hideModal(name: TModalName) {
    setModal({
      name: '',
      params: {
        notification: '',
        textButton: '',
        callback: null,
      },
    });
  }

  return {
    modalName: modal.name,
    modalParams: modal.params,
    showModal,
    hideModal,
  };
}
