import { FC } from 'react';
import Button from '@/components/UI/buttons/button/Button';
import ModalContent from '@/components/UI/modals/ModalContent/ModalContent';
import Modal from '@/components/UI/modals/modal/Modal';
import ButtonGroup from '@/components/business/ButtonGroup/ButtonGroup';
import styles from '@/components/business/ConfirmModal/confirmModal.module.scss';
import { IConfirmationModal } from '@/types';

interface IConfirmModalProps {
  params: IConfirmationModal['params'];
  onClose: () => void;
}

const ConfirmModal: FC<IConfirmModalProps> = ({ params, onClose }) => {
  return (
    <Modal onClickBehind={onClose}>
      <ModalContent>
        <div className={styles.text}>{params.notification}</div>
        <ButtonGroup position="horizontal">
          <Button size="regular" variant="transparent" onClick={onClose}>
            Cancel
          </Button>
          <Button
            size="regular"
            variant="transparent"
            fontColor="red"
            onClick={() => {
              onClose();
              params.callback && params.callback();
            }}
          >
            {params.textButton}
          </Button>
        </ButtonGroup>
      </ModalContent>
    </Modal>
  );
};

export default ConfirmModal;
