import { FC, ReactNode } from 'react';
import styles from '@/components/UI/modals/ModalContent/modalContent.module.scss';

interface IModalContentProps {
  children: ReactNode;
}

const ModalContent: FC<IModalContentProps> = ({ children }) => {
  return (
    <div
      className={styles.modalContent}
      onClick={(event) => event.stopPropagation()}
    >
      {children}
    </div>
  );
};

export default ModalContent;
