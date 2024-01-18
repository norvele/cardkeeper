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
  const rootClasses = [styles.modal, styles[type]];
  if (isVisible) {
    rootClasses.push(styles.active);
  }

  return (
    <div className={rootClasses.join(' ')} onClick={hideModal}>
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
