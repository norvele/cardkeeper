import { FC } from 'react';
import Button from '@/components/UI/buttons/button/Button';
import ModalContent from '@/components/UI/modals/ModalContent/ModalContent';
import Modal from '@/components/UI/modals/modal/Modal';
import ButtonGroup from '@/components/business/ButtonGroup/ButtonGroup';
import styles from '@/components/business/ListContextModal/listContextModal.module.scss';
import MiniCardItem from '@/components/business/MiniCardItem/MiniCardItem';
import { IListContextModal } from '@/types';

interface IListContextModalProps {
  params: IListContextModal['params'];
  onClose: () => void;
}

const ListContextModal: FC<IListContextModalProps> = ({ params, onClose }) => {
  return (
    <Modal onClickBehind={onClose}>
      <div className={styles.container}>
        <div className={styles.card}>
          <MiniCardItem>{params.cardText}</MiniCardItem>
        </div>
        <ModalContent>
          <div className={styles.buttons}>
            <ButtonGroup position="vertical">
              {params.buttons.map((button) => (
                <Button
                  key={button.textButton}
                  size="regular"
                  variant="transparent"
                  onClick={() => {
                    onClose();
                    button.callback && button.callback();
                  }}
                  fontColor={button.textColor}
                >
                  {button.textButton}
                </Button>
              ))}
            </ButtonGroup>
          </div>
        </ModalContent>
      </div>
    </Modal>
  );
};

export default ListContextModal;
