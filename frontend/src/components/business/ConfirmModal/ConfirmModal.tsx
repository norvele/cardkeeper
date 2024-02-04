import Button from '@/components/UI/buttons/button/Button';
import Modal from '@/components/UI/modal/Modal';
import ButtonGroup from '@/components/business/ButtonGroup/ButtonGroup';
import styles from '@/components/business/ConfirmModal/confirmModal.module.scss';
import { useModal } from '@/hooks/useModal';

const ConfirmModal = () => {
  const { hideModal, modalParams, modalName } = useModal();

  return (
    <Modal hideModal={() => hideModal(modalName)}>
      <div className={styles.text}>{modalParams.notification}</div>
      <ButtonGroup position="horizontal">
        <Button
          size="regular"
          variant="transparent"
          onClick={() => hideModal(modalName)}
        >
          Cancel
        </Button>
        <Button
          size="regular"
          variant="transparent"
          fontColor="red"
          onClick={modalParams.callback}
        >
          {modalParams.textButton}
        </Button>
      </ButtonGroup>
    </Modal>
  );
};

export default ConfirmModal;
