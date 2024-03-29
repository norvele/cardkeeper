import { FC, ReactNode } from 'react';
import styles from '@/components/UI/modals/modal/modal.module.scss';

interface IModalProps {
  onClickBehind: () => void;
  children: ReactNode;
}

const Modal: FC<IModalProps> = ({ onClickBehind, children }) => {
  return (
    <div className={styles.modal} onClick={onClickBehind}>
      {children}
    </div>
  );
};

export default Modal;
