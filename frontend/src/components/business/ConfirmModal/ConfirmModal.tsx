import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import Button from '@/components/UI/buttons/button/Button';
import Modal from '@/components/UI/modal/Modal';
import ButtonGroup from '@/components/business/ButtonGroup/ButtonGroup';
import styles from '@/components/business/ConfirmModal/confirmModal.module.scss';
import { modalState } from '@/store/modalStore';

const ConfirmModal = () => {
  const setModal = useSetRecoilState(modalState);
  const navigate = useNavigate();
  const text: string = 'Are you sure you want to delete this card?';

  function hideModal() {
    setModal({ type: '' });
  }

  function deleteHandler() {
    setModal({ type: '' });
    const response = true;
    if (response) {
      navigate('/home');
    }
  }

  return (
    <Modal hideModal={hideModal}>
      <div className={styles.text}>{text}</div>
      <ButtonGroup position="horizontal">
        <Button size="regular" variant="transparent" onClick={hideModal}>
          Cancel
        </Button>
        <Button
          size="regular"
          variant="transparent"
          fontColor="red"
          onClick={deleteHandler}
        >
          Delete
        </Button>
      </ButtonGroup>
    </Modal>
  );
};

export default ConfirmModal;
