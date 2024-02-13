import { FC, ReactNode } from 'react';
import styles from '@/components/UI/modal/modal.module.scss';

interface IModalProps {
  hideModal: () => void;
  children: ReactNode;
}

const Modal: FC<IModalProps> = ({ hideModal, children }) => {
  return (
    <div className={styles.modal} onClick={hideModal}>
      <div
        className={styles.modalContent}
        onClick={(event) => event.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
