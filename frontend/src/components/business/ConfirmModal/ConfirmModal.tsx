import { FC } from 'react';
import Button from '@/components/UI/buttons/button/Button';
import Modal from '@/components/UI/modal/Modal';
import ButtonGroup from '@/components/business/ButtonGroup/ButtonGroup';
import styles from '@/components/business/ConfirmModal/confirmModal.module.scss';
import { IConfirmationModal } from '@/types';

interface IConfirmModalProps {
  params: IConfirmationModal['params'];
  onClose: () => void;
}

const ConfirmModal: FC<IConfirmModalProps> = ({ params, onClose }) => {
  return (
    <Modal hideModal={onClose}>
      <div className={styles.text}>{params.notification}</div>
      <ButtonGroup position="horizontal">
        <Button size="regular" variant="transparent" onClick={onClose}>
          Cancel
        </Button>
        <Button
          size="regular"
          variant="transparent"
          fontColor="red"
          onClick={params.callback}
        >
          {params.textButton}
        </Button>
      </ButtonGroup>
    </Modal>
  );
};

export default ConfirmModal;
