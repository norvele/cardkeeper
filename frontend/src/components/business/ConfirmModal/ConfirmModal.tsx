import Button from '@/components/UI/buttons/button/Button';
import Modal from '@/components/UI/modal/Modal';
import ButtonGroup from '@/components/business/ButtonGroup/ButtonGroup';
import styles from '@/components/business/ConfirmModal/confirmModal.module.scss';
import { useModal } from '@/hooks/useModal';

const ConfirmModal = () => {
  const { hideModal, confirmationModalParams } = useModal();

  return (
    <Modal hideModal={() => hideModal('confirmation')}>
      <div className={styles.text}>{confirmationModalParams.notification}</div>
      <ButtonGroup position="horizontal">
        <Button
          size="regular"
          variant="transparent"
          onClick={() => hideModal('confirmation')}
        >
          Cancel
        </Button>
        <Button
          size="regular"
          variant="transparent"
          fontColor="red"
          onClick={confirmationModalParams.callback}
        >
          {confirmationModalParams.textButton}
        </Button>
      </ButtonGroup>
    </Modal>
  );
};

export default ConfirmModal;
