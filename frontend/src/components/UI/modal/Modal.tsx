import { FC, ReactNode } from 'react';
import styles from '@/components/UI/modal/modal.module.scss';

interface IModalProps {
  onClickBehind: () => void;
  children: ReactNode;
}

const Modal: FC<IModalProps> = ({ onClickBehind, children }) => {
  return (
    <div className={styles.modal} onClick={onClickBehind}>
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
