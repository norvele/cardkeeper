import clsx from 'clsx';
import { FC, ReactNode } from 'react';
import styles from '@/components/UI/modal/modal.module.scss';

interface IModalProps {
  isVisible: boolean;
  hideModal: () => void;
  type: 'confirm' | 'context';
  children: ReactNode;
  text: string;
}

const Modal: FC<IModalProps> = ({
  text,
  isVisible,
  type,
  hideModal,
  children,
}) => {
  return (
    <div
      className={clsx(styles.modal, styles[type], {
        [styles.active]: isVisible,
      })}
      onClick={hideModal}
    >
      <div
        className={styles.modalContent}
        onClick={(event) => event.stopPropagation()}
      >
        <div className={styles.text}>{text}</div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
